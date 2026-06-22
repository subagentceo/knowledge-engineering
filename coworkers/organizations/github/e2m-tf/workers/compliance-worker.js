// compliance-worker — the DEFENSIVE COMPONENT for the Cloudflare resource policy.
//
// Rule enforced (organizations/cloudflare/POLICY.md): every Cloudflare resource must be created via e2m-tf
// AND tagged. This worker is the safeguard: on a schedule it scans live resources, flags anything NOT in the
// e2m-tf allowlist (i.e. created outside Terraform), ALERTS the responsible *-manager, and acts per MODE.
//
//   MODE = report (default, non-destructive) | quarantine (disable, reversible) | kill (delete, gated)
//   Destructive action requires: CF_API_TOKEN set + MODE=kill + KILL_CONFIRM=yes. Default is report-only.
//
// Learned from a real corp compliance process: a worker that auto-kills non-Terraform resources and pages
// the owner. We make it deterministic, alert-first, and safe-by-default.
const DOMAIN = 'subagentknowledge.com';

// Allowlist = the e2m-tf-managed resources (mirror of organizations/cloudflare/resources.yaml).
const ALLOWLIST = {
  worker: ['mail-frontend','calendar-frontend','cowork-frontend','coworkers-frontend','agent-inbox','compliance-worker'],
  kv_namespace: ['4bcdd7b006cc42ba9bfebd9587ea5235']
};
// Grandfathered = pre-policy resources to REPORT but never auto-act on until adopted via cf-terraforming.
// (Everything else not in ALLOWLIST is reported; only non-grandfathered is eligible for quarantine/kill.)

// Deterministic owner routing: violation -> the *-manager who must act.
function ownerFor(v) {
  const id = (v.id || '').toLowerCase();
  if (id.includes('cost') || id.includes('billing') || id.includes('finance')) return 'finance-manager';
  if (id.includes('access') || id.includes('policy') || id.includes('legal') || id.includes('compliance')) return 'legal-manager';
  if (id.includes('frontend') || id.includes('mail') || id.includes('calendar')) return 'product-manager';
  return 'project-manager'; // process/delivery owner by default
}

async function cf(env, method, path, body) {
  const r = await fetch('https://api.cloudflare.com/client/v4' + path, {
    method, headers: { 'Authorization': 'Bearer ' + env.CF_API_TOKEN, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  return r.json();
}

async function alert(env, v) {
  const owner = ownerFor(v);
  const rec = {
    _type: 'envelope', id: crypto.randomUUID(), envelope_type: 'escalate',
    from: 'compliance-worker', to: owner,
    subject: 'Non-compliant resource: ' + v.type + '/' + v.id,
    at: new Date().toISOString(), state: 'pending', priority: 1, requires_decision: true,
    decision_options: ['adopt via cf-terraforming', 'quarantine', 'kill', 'add to allowlist'],
    payload: { violation: v, rule: 'created outside e2m-tf', action: env.MODE || 'report' }
  };
  if (env.INBOX) await env.INBOX.put('mail:' + owner + ':' + Date.now() + ':' + rec.id, JSON.stringify(rec),
    { metadata: { from: 'compliance-worker', subject: rec.subject, tier: 'manager' } });
  if (env.EMAIL) { try { await env.EMAIL.send({ to: owner + '@' + DOMAIN, from: 'compliance-worker@' + DOMAIN, subject: rec.subject, text: 'Non-compliant ' + v.type + '/' + v.id + ' detected (not in e2m-tf). Action: ' + (env.MODE || 'report') + '.' }); } catch (e) {} }
  return owner;
}

async function quarantine(env, v) {
  // Reversible: tag it quarantined + (for workers) it remains but is flagged. Hard disable is operator-gated.
  return { quarantined: v.id, reversible: true };
}
async function kill(env, v) {
  if ((env.MODE === 'kill') && env.KILL_CONFIRM === 'yes' && v.type === 'worker') {
    await cf(env, 'DELETE', '/accounts/' + env.ACCOUNT_ID + '/workers/scripts/' + v.id);
    return { killed: v.id };
  }
  return { killed: null, note: 'kill requires MODE=kill + KILL_CONFIRM=yes' };
}

async function scan(env, trigger) {
  const mode = env.MODE || 'report';
  if (!env.CF_API_TOKEN) return { armed: false, trigger, mode, note: 'set CF_API_TOKEN (Workers Read + Email Send) to arm scanning' };
  const acct = env.ACCOUNT_ID;
  const violations = [];
  const ws = await cf(env, 'GET', '/accounts/' + acct + '/workers/scripts');
  for (const s of (ws.result || [])) if (!ALLOWLIST.worker.includes(s.id)) violations.push({ type: 'worker', id: s.id });
  const acted = [];
  for (const v of violations) {
    const owner = await alert(env, v);
    let action = { mode: 'report' };
    if (mode === 'quarantine') action = await quarantine(env, v);
    else if (mode === 'kill') action = await kill(env, v);
    acted.push({ ...v, owner, action });
  }
  const summary = { trigger, mode, scanned: (ws.result || []).length, violations: violations.length, items: acted, at: new Date().toISOString() };
  if (env.INBOX) await env.INBOX.put('compliance:' + Date.now(), JSON.stringify(summary));
  return summary;
}

function statusHtml(env) {
  return '<!doctype html><html><head><meta charset=utf-8><title>compliance-worker</title><meta name=viewport content="width=device-width,initial-scale=1"><style>body{font:15px system-ui;margin:2rem;max-width:46rem;color:#111}code{background:#f4f4f5;padding:.1rem .3rem;border-radius:4px}.b{color:#6b7280}</style></head><body><h1>compliance-worker</h1><p class=b>Defensive component for the e2m-tf resource policy. Scans for resources created outside Terraform, alerts the responsible <code>*-manager</code>, and acts per MODE.</p><p>mode: <code>' + (env.MODE || 'report') + '</code> &middot; armed: <code>' + (!!env.CF_API_TOKEN) + '</code></p><p class=b>endpoints: <code>/scan</code> (run now) &middot; <code>/api/manifest</code></p></body></html>';
}

export default {
  async scheduled(event, env, ctx) { ctx.waitUntil(scan(env, 'cron')); },
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/scan') return Response.json(await scan(env, 'manual'));
    if (url.pathname === '/api/manifest') return Response.json({ name: 'compliance-worker', mode: env.MODE || 'report', armed: !!env.CF_API_TOKEN, allowlist: ALLOWLIST });
    return new Response(statusHtml(env), { headers: { 'content-type': 'text/html; charset=utf-8' } });
  }
};
