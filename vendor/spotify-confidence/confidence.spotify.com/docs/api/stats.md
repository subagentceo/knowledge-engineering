> ## Documentation Index
> Fetch the complete documentation index at: https://confidence.spotify.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Stats Concepts

> Understand the key concepts in Confidence Stats.

This section covers the key concepts in Confidence Stats. The primitives defined by the stats service allow you to both plan and analyze experiments.

An analysis consists of an `AnalysisPlan` which is a planning phase description of how you plan to analyze the data, and `AnalysisData` which is the data that you've collected so far.

## Analysis Plan

An `AnalysisPlan` is a description of how to compare a set of groups (for example, treatments) to each other, a set of hypotheses about these groups, and a decision rule that encodes how you plan to make a decision on the combined set of results from all hypotheses. The API uses `AnalysisPlan` in the planning phase to calculate power, and in the analysis phase to decide how to analyze the data.

## Comparisons and Groups

A `Group` is a unique identifier and an integer weight. The weight is proportional to the group allocation. In an analysis, the `ComparisonSpec` defines how to compare the groups to each other. It has three options: 1) compare all groups to the group designated as baseline, 2) compare all pairs of groups to each other, or 3) compare all listed group pairs. The most common setup is to compare all groups to the control group.

## Hypothesis and Method

A `Hypothesis` represents a testable belief about a metric. For example, the change *A* leads to an increase by *X%* in metric *M*. In more technical terms, a hypothesis is a belief about a specific parameter in a statistical model. You test your hypothesis by constructing a model of the data, estimating its parameters and evaluating whether the estimated parameters are consistent with the hypothesis. The analysis method defines these steps. Depending on how your data arises and your experiment design, different analysis methods are appropriate. For example, if you collect new data every day, a sequential analysis is appropriate, whereas a non-sequential method would result in an increased number of false positives. You should carefully select which method to apply. All methods come with a set of assumptions. If some of these assumptions are not satisfied, you shouldn't trust the results.

Two common categories of hypotheses are superiority and non-inferiority hypotheses. A superiority hypothesis states that a metric changes in a given direction by some practically meaningful amount set by the experimenter, called the minimum detectable effect (MDE). A non-inferiority hypothesis states that a metric doesn't change more, in a given direction, than some acceptable margin, called the non-inferiority margin (NIM).

You define a superiority hypothesis for a relative increase of `3%` as:

```json theme={null}
{
  "superiority": {
    "preferred_direction": "INCREASE",
    "minimum_detectable_effect": 0.03
  }
}
```

You define a non-inferiority hypothesis for a situation where you could accept a relative decrease of `1%` but not more as:

```json theme={null}
{
  "non_inferiority": {
    "preferred_direction": "INCREASE",
    "non_inferiority_margin": 0.01
  }
}
```

## Decision Rule

A decision rule is a logical expression of the significance of a set of hypotheses that determines when you view an analysis as a success. A typical example would be that at least one success metric is significant, while all guardrails are significantly non-inferior. You encode that rule as:

```json theme={null}
{
  "operator": "AND",
  "items": [
    {
      "rule": {
        "operator": "AND",
        "items": ["guardrail1", "guardrail2"]
      }
    },
    {
      "rule": {
        "operator": "OR",
        "items": ["success1", "success2"]
      }
    }
  ]
}
```

That translates to the decision rule `(guardrail1 AND guardrail2) AND (success1 OR success2)`.

The decision rule requires you to be explicit about the decision that you aim to take. The rule is the basis for adjusting both the false positive rate and statistical power per hypothesis so that you get the desired overall false positive rate and statistical power.

## Analysis Data

The data passed to the analysis differs depending on the method used for analysis. The data also has a certain type that may require a change in the method used for analysis, the two most common data types are binary and continuous. See more in [Run an Analysis](/docs/api/how-to-guides/stats/run-analysis).
