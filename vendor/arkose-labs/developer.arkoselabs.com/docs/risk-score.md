# Risk Score

> 📘
>
> **Note:** If Risk Score isn't enabled for your keys, please reach out to your Customer Success Manager (CSM) for assistance.

For each session, Arkose Bot Manager determines *Risk Scores* based on multiple signals collected throughout the session and the associated triggered telltales. The Verify API returns two risk scores in an additional `session_risk` field:

* *Global Risk Score:* A risk score based on the global telltales that fired during the session. The Global Risk Score ranges anywhere from `0` to `100` with `100` being the highest risk level.
* *Custom Risk Score:* A risk score based on customer-specific telltales. The Custom Risk Score ranges from `0`to `100` with `100` being the highest risk level.

## Risk Categories

Every session is assigned to a risk category:

* `NO-THREAT`: No threat or risk detected.
  * No telltale was triggered.

* `ALLOWLIST`:
  * A telltale created from an Allowlist was triggered.
  * Overrides all other Risk Category values; if an Allowlist telltale is triggered, the session gets an `ALLOWLIST` risk category.  Note that it is not possible for both an Allowlist and a Denylist telltale to trigger in the same session.

* `DENYLIST`:
  * A telltale created from a Denylist was triggered.
  * Overrides all other Risk Category values; if a Denylist telltale is triggered, the session gets a `DENYLIST` risk category.  Note that it is not possible for both an Allowlist and a Denylist telltale to trigger in the same session.

* `BOT-STD`: Basic botnet / Automation
  * Assigned when only global telltales belonging to standard botnets were identified.

* `BOT-ADV`: Advanced botnet / Automation
  * Assigned when at least one global telltale in the session belonged to advanced botnets.
  * Overrides `BOT-STD` (i.e. if there are both standard and advanced botnet telltales in a session, the session gets a `BOT-ADV` risk category)

* `FRD-FRM`: Fraud farms (Captcha solvers)
  * Assigned when at least one global telltale in the session belonged to fraud farms.
  * Overrides `BOT-STD` and `BOT-ADV` (i.e. if any telltale belongs to a fraud farm, the session gets a\
    `FRD-FRM` risk category, regardless of any botnet telltales).

* `CUSTOM`: Custom (for any customer-specific telltales addressing unique customer-specified traffic patterns)
  * At least one customer-specific telltale was triggered.
  * All global risk category values override `CUSTOM`. For a session to have a `CUSTOM` risk category value, both a customer-specific telltale must have triggered and **no** global telltales can have triggered (i.e. if any global telltale was triggered, the session is assigned the appropriate global risk category as specified above)

For more details on individual global telltales and their contributions to various categories, please see the [Global Telltales page](https://support.arkoselabs.com/hc/en-us/articles/12071819598483-Global-Telltales) in the Arkose Labs Knowledge Base. To access the Knowledge Base, you must have a support login.

## Risk Bands

*Risk Bands* define the level of risk by what band a session's numerical risk score falls into.

The greater of the Global and Custom Risk Scores determines which band Arkose assigns to the session.

The risk bands are defined as follows, with each band inclusive of its start and end values.

| Band       | Score Range Start | Score Range End |
| :--------- | :---------------- | :-------------- |
| **High**   | 81                | 100             |
| **Medium** | 41                | 80              |
| **Low**    | 0                 | 40              |

## Using Risk Scores

Arkose Labs suggests these guidelines for interpreting and using Risk Score related information:

* The Global Risk Score detects common threats across Arkose Labs customers. It may provide more granular insight into the threat.

* The Custom Risk Score detects threats specific to a given customer.

* The two scores may overlap. Global and customer-specific telltales may detect the same attack based on different anomalies found in the session

* Both the risk score and risk category must be considered when choosing the most appropriate response strategy.

Two ways of using risk scores are:

* Influencing the challenge strategy. For more on how the integration process looks like, please contact your Arkose CSM (Customer Success Manager).

* Within a customer’s Internal Detection Models. If a customer wants to just use risk scores for informative purposes and not use it to tune challenges, then no integration changes are needed. Once turned on, you can consume Risk Score data via Verify API responses.

For more detailed suggestions as to what actions to take for different combinations of Risk Scores, Risk Bands, and Risk Categories, see [Risk Score Usage](https://support.arkoselabs.com/hc/en-us/articles/9488611984275-Risk-Score-Usage) (Support login required).

## Verify API Response Fields and Values

> 📘
>
> Reminder: The full Verify API Response, except for the below description of its `session_risk` field, is described on the [Server-Side Instructions page](https://developer.arkoselabs.com/docs/server-side-instructions-v4) .

When Risk Score has been turned on, your Verify API responses include an additional field, `session_risk`. Its value is a JSON object, with its own fields and subfields as described in the table below.

Note the following special cases, which affect the JSON object’s value. You need to take the possibility of these cases into account when writing code that processes `session_risk`'s value.

1. If no Arkose global or generic telltales triggered during the session, its Global Risk Score is `0`.

2. If no customer-specific telltales triggered during the session, its Custom Risk Score is `0`.

3. If both risk scores are `0`, the `risk_category` field is not returned. You should treat it as a `"NULL"` risk category. **Note**: This means there may be 0 or 1 `risk_category` fields in a `session_risk` value.

4. If both the Global and Custom Risk Scores are `0`, the `risk_band` value is `"Low"`.

5. `risk_category` is the only optional field (i.e., it is not returned if there is no category value due to no telltales triggering). All other fields and subfields are always returned, including `session_risk` as a whole. So if the Global Risk Score is `0`, `global`'s value is a score of `"0"` and a `telltales`' value of an empty array (`[]`). If the Custom Risk Score is `0`, `custom`'s value is a score of `"0"` and a `telltales`' value of an empty array (`[]`). See the second response example further below.

<Table align={["left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Subfield
      </th>

      <th>
        Subfield
      </th>

      <th>
        Subfield
      </th>

      <th>
        Description and Values
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `session_risk`
      </td>

      <td />

      <td />

      <td />

      <td>
        An object containing all risk score information and conclusions.

        Made up of the following subfields.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `risk_category`
      </td>

      <td />

      <td />

      <td>
        Name of the risk category determined by the session's risk score.

        One of `"BOT-STD"` (standard botnet), `"BOT-ADV"` (advanced botnet), `"FRD-FRM"` (fraud farm) or `"CUSTOM"` (custom category based on customer-defined telltales).

        If both the Global and Custom Risk Scores are `0`, `session_risk`'s value will not have a `risk_category` field.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `risk_band`
      </td>

      <td />

      <td />

      <td>
        Risk band category indicating risk severity as determined by risk scores.

        One of `"High"`, `"Medium"`, or `"Low"`
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `global`
      </td>

      <td />

      <td />

      <td>
        Object containing the Global Risk Score value and the global telltales used to calculate it.

        An array of objects consisting of `score` and `telltales` fields.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `custom`
      </td>

      <td />

      <td />

      <td>
        Object containing the Custom Risk Score value and the global telltales used to calculate it.

        An array of objects consisting of `score` and `telltales` fields.
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td>
        `score`
      </td>

      <td />

      <td>
        Risk Score value. If under `global`, the Global Risk Score. If under `custom`, the Custom Risk Score.

        A string of an integer between `0` and `100`, such as `"87"`. If under `custom`, it will be from `"0"` to`"100"`.
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td>
        `telltales`
      </td>

      <td />

      <td>
        Telltales that contributed to  calculating a Risk Score. If under `global`, the Global Risk Score. If under `custom`, the Custom Risk Score.

        An array of objects consisting of `name` and`weight` fields.
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td />

      <td>
        `name`
      </td>

      <td>
        Name of a  triggered telltale that contributed to calculating a Risk Score.

        A string starting with `g-` to signify global, such as\
        `"g-h-cfp-1000000000"` or a string that does not start with `g-` meaning it is a custom telltale like `"outdated-os-yandex"`
      </td>
    </tr>

    <tr>
      <td />

      <td />

      <td />

      <td>
        `weight`
      </td>

      <td>
        The weight given this triggered telltale when calculating a Risk Score. Note that a telltale’s weight is **not** necessarily the same as the eventual total score.

        A string of an integer between `"1"` and `"100"`. Not `"0"` since a triggered telltale must have some weight.
      </td>
    </tr>
  </tbody>
</Table>

## Sample Verify API Response With `session_risk`

```json
"session_risk"
{
  "risk_category": "BOT-STD",
  "risk_band": "High",
  "global"
    {
      "score": "15",
      "telltales":[
      {
        "name": "g-h-cfp-1000000000",
        "weight": "7"
      }
      {
        "name": "g-os-impersonation-win",
        "weight": "8"
      }]
    }
    "custom"
    {
      "score": "100",
      "telltales":[
      {
        "name": "outdated-browser-customer-2",
        "weight": "100"
      }
      {
        "name": "outdated-os-customer",
        "weight": "100"
      }]
    }
}
```

## Sample Verify API Response With `session_risk` With No Triggered Telltales

Note that this response has no `risk_category` field.

```json
"session_risk"
{
  "risk_band": "Low",
  "global"
    {
      "score": "0",
      "telltales":[]
    }
  "custom"
    {
      "score": "0",
      "telltales":[]      
    }
}
```