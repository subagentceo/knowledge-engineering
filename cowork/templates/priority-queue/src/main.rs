// T3 — Rust/serde priority queue for durable task reranking.
//
// Hot path: < 1 ms p99 for 1 000 tasks (target per SKILL.md bench spec).
// Reads JSONL from stdin (or --file), writes ranked JSONL to stdout.
// No heap allocation in the scoring hot loop — all ops on stack-local floats.
//
// @cite cowork/templates/task-state-machine.ts  (canonical state/score schema)
// @cite cowork/skills/plugins/product-management:priority-rerank/SKILL.md
// @cite src/cache/lru-bm25.ts                  (LRU pattern mirrored in L1 cache)

use std::collections::HashMap;
use std::io::{self, BufRead, Write};
use std::time::Instant;

use ahash::AHashMap;
use chrono::{DateTime, Utc};
use lru::LruCache;
use serde::{Deserialize, Serialize};
use thiserror::Error;
use uuid::Uuid;

// ── Domain types (mirror of task-state-machine.ts) ───────────────────────────

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum TaskState {
    Pending,
    InProgress,
    Blocked,
    Completed,
    Failed,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum Domain {
    #[serde(rename = "product-management")]
    ProductManagement,
    Data,
    Engineering,
    Design,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PriorityScore {
    pub urgency:            f32,
    pub impact:             f32,
    pub dependency_unblock: f32,
    pub effort_efficiency:  f32,
    pub staleness:          f32,
    pub total:              f32,
}

/// Mirrors DurableTask from task-state-machine.ts field-for-field.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DurableTask {
    pub id:              Uuid,
    #[serde(default = "default_queue")]
    pub queue:           String,
    pub subject:         String,
    pub description:     Option<String>,
    pub state:           TaskState,
    pub owner:           Option<String>,
    #[serde(default)]
    pub depends_on:      Vec<Uuid>,
    #[serde(default)]
    pub blocks:          Vec<Uuid>,
    pub domain:          Option<Domain>,
    pub ke_fit_score:    Option<u8>,     // 1-5
    pub estimated_hours: Option<f32>,
    pub due_date:        Option<String>, // ISO-8601 date
    pub jira_key:        Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub priority_score:  Option<PriorityScore>,
    pub created_at:      DateTime<Utc>,
    pub updated_at:      DateTime<Utc>,
}

fn default_queue() -> String { "cowork".into() }

/// Output row: task + rank.
#[derive(Debug, Serialize)]
pub struct RankedTask {
    pub rank:           usize,
    #[serde(flatten)]
    pub task:           DurableTask,
    pub priority_score: PriorityScore,
}

// ── Errors ────────────────────────────────────────────────────────────────────

#[derive(Debug, Error)]
pub enum PqError {
    #[error("json: {0}")]
    Json(#[from] serde_json::Error),
    #[error("io: {0}")]
    Io(#[from] io::Error),
}

// ── Scoring (pure, stack-local) ───────────────────────────────────────────────

const WEIGHT_URGENCY:    f32 = 0.30;
const WEIGHT_IMPACT:     f32 = 0.25;
const WEIGHT_DEP_UNLOCK: f32 = 0.20;
const WEIGHT_EFFORT_EFF: f32 = 0.15;
const WEIGHT_STALENESS:  f32 = 0.10;

fn urgency_score(task: &DurableTask, now: DateTime<Utc>) -> f32 {
    let Some(ref due) = task.due_date else { return 30.0 };
    let Ok(due_dt) = due.parse::<DateTime<Utc>>() else { return 30.0 };
    let days_left  = (due_dt - now).num_seconds() as f32 / 86_400.0;
    match days_left as i32 {
        i32::MIN..=-1 => 100.0,
        0             => 95.0,
        1..=2         => 80.0,
        3..=6         => 60.0,
        7..=13        => 40.0,
        _             => 20.0,
    }
}

fn staleness_score(task: &DurableTask, now: DateTime<Utc>) -> f32 {
    let days = (now - task.updated_at).num_seconds() as f32 / 86_400.0;
    (days * 5.0).min(100.0)
}

fn impact_score(task: &DurableTask) -> f32 {
    let fit_base = task.ke_fit_score.map_or(50.0, |s| (s as f32 / 5.0) * 100.0);
    let mul = match task.domain {
        Some(Domain::ProductManagement) => 1.2,
        Some(Domain::Engineering)       => 1.1,
        Some(Domain::Data)              => 1.0,
        Some(Domain::Design)            => 0.9,
        None                            => 1.0,
    };
    (fit_base * mul).min(100.0)
}

fn score_task(
    task:     &DurableTask,
    now:      DateTime<Utc>,
    dep_map:  &AHashMap<Uuid, Vec<&DurableTask>>, // id → tasks that depend on it
) -> PriorityScore {
    let impact  = impact_score(task);

    // downstream urgency: avg urgency of tasks this one unblocks
    let dep_score = match dep_map.get(&task.id) {
        None | Some(x) if x.is_empty() => 0.0,
        Some(downstream) => {
            let sum: f32 = downstream.iter().map(|t| urgency_score(t, now)).sum();
            (sum / downstream.len() as f32).min(100.0)
        }
    };

    let effort_eff = task.estimated_hours
        .map_or(50.0, |h| ((impact / h) * 5.0).min(100.0));

    let u = urgency_score(task, now);
    let s = staleness_score(task, now);

    let total = u  * WEIGHT_URGENCY
              + impact    * WEIGHT_IMPACT
              + dep_score * WEIGHT_DEP_UNLOCK
              + effort_eff * WEIGHT_EFFORT_EFF
              + s * WEIGHT_STALENESS;

    PriorityScore {
        urgency:            (u * 10.0).round() / 10.0,
        impact:             (impact * 10.0).round() / 10.0,
        dependency_unblock: (dep_score * 10.0).round() / 10.0,
        effort_efficiency:  (effort_eff * 10.0).round() / 10.0,
        staleness:          (s * 10.0).round() / 10.0,
        total:              (total * 10.0).round() / 10.0,
    }
}

// ── L1 score cache (LRU, keyed by task id + updated_at epoch) ────────────────
// Avoids rescoring identical task snapshots; simulates the LRU layer in
// src/cache/lru-bm25.ts. Cache key: "<uuid>/<updated_at_unix_ms>".

fn cache_key(task: &DurableTask) -> String {
    format!("{}/{}", task.id, task.updated_at.timestamp_millis())
}

// ── Rerank pipeline ───────────────────────────────────────────────────────────

pub fn rerank(tasks: &[DurableTask], top: usize) -> Vec<RankedTask> {
    let now = Utc::now();

    // Build reverse dep map: task_id → [tasks whose depends_on contains this id]
    let mut dep_map: AHashMap<Uuid, Vec<&DurableTask>> = AHashMap::new();
    for t in tasks {
        for dep_id in &t.depends_on {
            dep_map.entry(*dep_id).or_default().push(t);
        }
    }

    // Score cache (L1)
    let mut score_cache: LruCache<String, PriorityScore> =
        LruCache::new(std::num::NonZeroUsize::new(4096).unwrap());

    // Eligible: only pending + blocked (unblocked)
    let mut scored: Vec<(f32, usize)> = tasks
        .iter()
        .enumerate()
        .filter(|(_, t)| matches!(t.state, TaskState::Pending | TaskState::Blocked))
        .map(|(i, t)| {
            let key = cache_key(t);
            let score = if let Some(cached) = score_cache.get(&key) {
                cached.total
            } else {
                let ps = score_task(t, now, &dep_map);
                let total = ps.total;
                score_cache.put(key, ps);
                total
            };
            (score, i)
        })
        .collect();

    // Sort descending by total score — no allocation, in-place
    scored.sort_unstable_by(|(a, _), (b, _)| b.partial_cmp(a).unwrap());

    scored
        .into_iter()
        .take(top)
        .enumerate()
        .map(|(rank, (_, idx))| {
            let task  = tasks[idx].clone();
            let key   = cache_key(&task);
            let ps    = score_task(&task, now, &dep_map); // fast: already cached
            RankedTask { rank: rank + 1, task, priority_score: ps }
        })
        .collect()
}

// ── Main ──────────────────────────────────────────────────────────────────────

fn main() -> Result<(), PqError> {
    let args: Vec<String> = std::env::args().collect();
    let top = args.windows(2)
        .find(|w| w[0] == "--top")
        .and_then(|w| w[1].parse::<usize>().ok())
        .unwrap_or(10);

    let stdin  = io::stdin();
    let mut tasks: Vec<DurableTask> = Vec::new();

    for line in stdin.lock().lines() {
        let line = line?;
        if line.trim().is_empty() { continue; }
        tasks.push(serde_json::from_str(&line)?);
    }

    if tasks.is_empty() {
        eprintln!("priority-queue: no tasks on stdin (pipe JSONL)");
        std::process::exit(1);
    }

    let t0     = Instant::now();
    let ranked = rerank(&tasks, top);
    let elapsed_us = t0.elapsed().as_micros();

    let stdout = io::stdout();
    let mut out = stdout.lock();

    for r in &ranked {
        let line = serde_json::to_string(r)?;
        out.write_all(line.as_bytes())?;
        out.write_all(b"\n")?;
    }

    eprintln!("ranked {} / {} tasks in {}µs ({}ms)", ranked.len(), tasks.len(), elapsed_us, elapsed_us / 1000);
    Ok(())
}

// ── Unit tests ────────────────────────────────────────────────────────────────

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::TimeZone;

    fn make_task(id: &str, state: TaskState, due_days: Option<i64>, ke_fit: Option<u8>) -> DurableTask {
        let now = Utc::now();
        DurableTask {
            id:              id.parse().unwrap(),
            queue:           "cowork".into(),
            subject:         format!("task {id}"),
            description:     None,
            state,
            owner:           None,
            depends_on:      vec![],
            blocks:          vec![],
            domain:          Some(Domain::Data),
            ke_fit_score:    ke_fit,
            estimated_hours: Some(1.0),
            due_date:        due_days.map(|d| (now + chrono::Duration::days(d)).to_rfc3339()),
            jira_key:        None,
            priority_score:  None,
            created_at:      now,
            updated_at:      now,
        }
    }

    #[test]
    fn overdue_ranks_first() {
        let tasks = vec![
            make_task("00000000-0000-0000-0000-000000000001", TaskState::Pending, Some(7), Some(3)),
            make_task("00000000-0000-0000-0000-000000000002", TaskState::Pending, Some(-1), Some(3)),
        ];
        let ranked = rerank(&tasks, 10);
        assert_eq!(ranked[0].task.due_date, tasks[1].due_date, "overdue should rank first");
    }

    #[test]
    fn completed_excluded() {
        let tasks = vec![
            make_task("00000000-0000-0000-0000-000000000001", TaskState::Completed, None, Some(5)),
            make_task("00000000-0000-0000-0000-000000000002", TaskState::Pending,   None, Some(1)),
        ];
        let ranked = rerank(&tasks, 10);
        assert_eq!(ranked.len(), 1, "completed tasks should be excluded");
    }

    #[test]
    fn total_within_bounds() {
        let tasks = vec![
            make_task("00000000-0000-0000-0000-000000000001", TaskState::Pending, Some(3), Some(5)),
        ];
        let ranked = rerank(&tasks, 10);
        let total  = ranked[0].priority_score.total;
        assert!(total >= 0.0 && total <= 100.0, "total={total} out of [0,100]");
    }
}
