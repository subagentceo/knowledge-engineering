---
name: sp-capital-iq-excel-pro
description: Use this skill any time a financial analysis spreadsheet is needed that pulls live or historical data from S&P Capital IQ. This means any task where the user wants to create financial models using Capital IQ data, build company profiles with financial metrics, construct peer analysis or comparable company tables, pull historical financial statements, analyze market data and trading multiples, or generate financial reports using Capital IQ datasets. Trigger when the user mentions Capital IQ, S&P data, company financials, peer analysis, or needs institutional-quality financial data in Excel. Also trigger for creating DCF models, LBO models, merger models, or any valuation analysis that benefits from live financial data feeds. The deliverable must be an Excel file with S&P Capital IQ formulas. Do NOT trigger when the user just needs basic Excel operations without financial data integration, or when they specifically request other data sources.
---

# CRITICAL RULES

## 1. NO HALLUCINATION OF DATA ITEMS
**ONLY use data items documented in this skill file or in `docs/SPG_OfficeReferenceGuide_v2_RANGEV.xlsx`**
- NEVER guess or invent data item names
- If uncertain, check the metric reference tables below or the Excel reference guide
- Calculate missing ratios manually from documented items

## 2. ZERO FORMULA ERRORS
Every Excel model MUST have ZERO formula errors (#REF!, #DIV/0!, #VALUE!, #N/A, #NAME?, #INVALID COMPANY ID)
- Use `IFERROR()` to handle missing data gracefully
- Use absolute references ($) for company identifier cells
- Always use exchange-qualified identifiers (e.g., `"NASDAQ:NVDA"`, `"NYSE:MCD"`) for reliability -- bare tickers can cause `#INVALID COMPANY ID` errors

## 3. NEVER USE `@` IN FORMULAS
When writing formulas via Python/openpyxl, write `=SPG(...)` NOT `=@SPG(...)`.
- The `@` implicit intersection operator is added automatically by Excel at display time
- Including `@` in the stored formula causes it to be treated as a text string instead of executing
- This applies to all functions: `SPG`, `SPGRangeV`, `SPGScreen`, `SPGTable`

**Correct:** `cell.value = '=SPG("NASDAQ:NVDA","IQ_TOTAL_REV","FY2024")'`
**Wrong:** `cell.value = '=@SPG("NASDAQ:NVDA","IQ_TOTAL_REV","FY2024")'`

## 4. NO EMOJIS
Maintain professional tone in all outputs

## 5. PRESERVE EXISTING TEMPLATES
When modifying existing files, EXACTLY match existing format and conventions

---

# FORMULA REFERENCE GUIDE

**Complete Documentation:** `docs/SPG_OfficeReferenceGuide_v2_RANGEV.xlsx`

This Excel file contains:
- **FrequentFormulas sheet**: Complete catalog of valid formulas by category
- **RangeV sheet**: SPGRANGEV syntax examples

**Always verify formulas and data items against this reference guide.**

---

# CORE CONCEPTS

## Identifier (Company Lookup)

The first parameter in every SPG formula identifies which company or entity to look up.

| Format | Example | Description |
|---|---|---|
| Exchange:Ticker | `"NYSE:SPGI"` | Exchange-qualified ticker (PREFERRED) |
| Ticker | `"SPGI"` | Bare ticker (less reliable -- can cause #INVALID COMPANY ID) |
| Market Intelligence ID | `"4023623"` | Numeric MI identifier |
| S&P Capital IQ ID | `"IQ21719"` | CIQ-prefixed identifier |
| Rate symbol | `"%TCMSY10"` | Treasury/rate identifier |
| Currency pair | `"$EURUSD"` | FX pair identifier |

**ALWAYS prefer Exchange:Ticker format** (e.g., `"NASDAQ:NVDA"`, `"NYSE:MCD"`) to avoid ambiguity.

## Metric (Data Item)

The second parameter is the mnemonic code for the specific data point to retrieve (e.g., `"IQ_TOTAL_REV"` for Total Revenue). See the full metric reference tables below.

## Cell Referencing

All parameters in every SPG function support cell references in addition to direct inputs:

```excel
=SPG(A1, "IQ_TOTAL_REV", A2)
```

Where `A1` = `NASDAQ:AMZN`, `A2` = `LTM`

## Model Setup Pattern

Every spreadsheet MUST place the company identifier in a dedicated, clearly labeled cell and reference it with absolute references throughout:

```
Cell B2: "Company Identifier"    (label)
Cell C2: "NASDAQ:NVDA"          (value -- exchange-qualified)

All formulas reference $C$2:
=SPG($C$2, "IQ_TOTAL_REV", "FY2024")
=SPG($C$2, "SP_MARKETCAP")
=IFERROR(SPG($C$2, "SP_HEADCOUNT_LATEST"), "-")
```

- The identifier cell must contain a plain text value (e.g., `NASDAQ:NVDA`), NOT a formula
- Always use absolute references (`$C$2`) so formulas don't break when rows/columns shift
- Wrap non-critical data items in `IFERROR()` to degrade gracefully

---

# SPG FUNCTIONS

## `=SPG()` -- Single Value

Retrieves one specific data point for one specific time period.

**Syntax:** `=SPG("Identifier", "Metric", "Period", "Options:")`

Some metrics accept an additional As-Of Date parameter.

**Basic:**
```excel
=SPG("AMZN", "IQ_TOTAL_REV", "LTM")
=SPG("NYSE:MCD", "SP_PRICE_CLOSE", TODAY())
=SPG("NYSE:MCD", "IQ_TEV")                                        -- TEV, no period needed
=SPG("NYSE:MCD", "IQ_TEV_EBITDA")                                 -- TEV/EBITDA, no period needed
```

**With Options:**
```excel
=SPG("NYSE:IBM", "IQ_TOTAL_REV", "FY2018", "Options: Curr=EUR, Mag=Millions")
```

**Consensus Estimates:**
```excel
=SPG("NYSE:MCD", "Total Revenue", "FY2025", "Options:DataType=SD")
```

**TEV Note:** TEV data items (`IQ_TEV`, `SNL_TEV`, `IQ_TEV_EBITDA`, `IQ_TEV_TOTAL_REV`, etc.) do NOT require period parameters -- they return the current total enterprise values.

## `=SPGRangeV()` -- Range of Values (Time Series)

Pulls a time series of data (e.g., the last 5 years of revenue). The formula spills across multiple cells.

**Syntax:** `=SPGRangeV("Identifier", "Metric", "Beginning Period", "As-Of Date", "Options:")`

```excel
=SPGRangeV("NYSE:MCD", "IQ_TOTAL_REV", "FY-4")
=SPGRangeV("NYSE:IBM", "IQ_TOTAL_REV", "FQ-5", "04/01/2020", "Options: Curr=EUR, Mag=Millions, Dates=Before")
```

| Parameter | Description | Example |
|---|---|---|
| Identifier | Company ticker or S&P identifier | `"NYSE:IBM"` |
| Metric | Data mnemonic | `"IQ_TOTAL_REV"` |
| Beginning Period | Starting period for the time series | `"FQ-5"` |
| As-Of Date | Optional: historical as-of date | `"04/01/2020"` |
| Options | Optional: Currency, Magnitude, Dates position | `"Options: Curr=EUR, Mag=Millions, Dates=Before"` |

### Detailed Ownership Range

`SPGRangeV` can also pull a list of a company's top shareholders. Instead of a Beginning Period, provide a Start Rank and End Rank:

```excel
=SPGRangeV("NYSE:BAC", "SP_INSTITUTIONAL_VALUE", "1", "10", "10/5/2020", "SUMMARY", "Options: Rank=1/1/2020, Curr=GBP, Mag=Millions")
```

## `=SPGScreen()` -- Saved Screens

Embeds a saved screen or company list from the S&P Capital IQ Pro Data Wizard directly into Excel.

**Syntax:** `=SPGScreen("Query Name", "Direction", Field ID Range, "Options:")`

## `=SPGTable()` -- Multi-Company Grids

Typically auto-generated when exporting a screen from the Data Wizard into Excel. Refreshes a large table of data across multiple entities, periods, and fields at once.

```excel
=SPGTable($B$26:$B$35, $C$23:$D$23, $C$24:$D$24, "Options:Curr=EUR, Mag=Thousands, ConvMethod=Recommended")
```

---

# AVAILABLE PERIOD TYPES

## Historical / Current Periods (for `IQ_*` and `SNL_*` fundamentals)

| Period Type | Actual | Relative |
|---|---|---|
| Calendar Year | `CY2018` | `CY0`, `CY-1`, ... |
| Fiscal Year | `FY2018` | `FY0`, `FY-1`, ... |
| Calendar Quarter | `CQ42018` | `CQ0`, `CQ-1`, ... |
| Fiscal Quarter | `FQ42018` | `FQ0`, `FQ-1`, ... |
| Last-Twelve-Months | `LTM42018` | `LTM`, `LTM-1`, ... |
| Year-To-Date | `YTD42018` | `YTD` |
| Half/Semi-Annual | `FH12018` | `FH0` |

## Forward Periods (ONLY for consensus estimate mnemonics: `SP_*_EST`)

| Period Type | Relative |
|---|---|
| Next-Twelve-Months | `NTM` |
| Forward Fiscal Year | `FY+1`, `FY+2`, ... |
| Forward Fiscal Quarter | `FQ+1`, `FQ+2`, ... |

**CRITICAL: Forward periods (`FY+1`, `NTM`, etc.) cause `#INVALID FUNCTION PARAMETER` when used with `IQ_*` or `SNL_*` fundamental data items.** These periods ONLY work with consensus estimate mnemonics (`SP_REV_EST`, `SP_EBITDA_EST`, `SP_EPS_EST`, `SP_NI_EST`, `SP_EBIT_EST`, `SP_CFPS_EST`).

**Building a model with historical + forecast columns:**
```
Historical (FY-4 to FY0):  =SPG($C$2, "IQ_TOTAL_REV", "FY-4")
Forecast (FY+1, FY+2):     =SPG($C$2, "SP_REV_EST", "FY+1")
```
You MUST switch from `IQ_*` mnemonics to `SP_*_EST` mnemonics for forward periods.

---

# OPTIONS STRING REFERENCE

The Options string is an optional final parameter in any SPG formula. Arguments are comma-separated inside quotes, always beginning with `"Options:"`.

```excel
"Options: Curr=EUR, Mag=Millions, ConvMethod=Recommended"
```

## Currency (`Curr=` or `Currency=`)

Converts monetary data into a target currency using a 3-character ISO code.

```excel
=SPG("AMZN", "IQ_TOTAL_REV", "FY2023", "Options: Curr=EUR")
```

## Magnitude (`Mag=` or `Magnitude=`)

Scales monetary values to reduce trailing zeros.

| Value | Alias |
|---|---|
| `Standard` | *(default -- uses source's native magnitude)* |
| `Actuals` | `0` |
| `Thousands` | `3` |
| `Millions` | `6` |
| `Billions` | `9` |
| `Trillions` | `12` |

```excel
=SPG("AMZN", "IQ_TOTAL_REV", "FY2023", "Options: Mag=Millions")
```

## Conversion Method (`ConvMethod=`)

Controls which exchange rate is used when converting currencies.

| Value | Description |
|---|---|
| `Recommended` | Uses the exchange rate from the date the data was reported |
| `MRSpot` | Uses the most recent spot rate available today |

```excel
=SPG("AMZN", "IQ_TOTAL_REV", "FY2023", "Options: Curr=GBP, ConvMethod=Recommended")
```

## Terminology (`Term=` or `Terminology=`)

Translates text data outputs into different languages.

| Value | Language |
|---|---|
| `zh-CN` | Chinese |
| `en-GB` | British English |
| `ja-JP` | Japanese |
| `es-HN` | Spanish |
| `pt-BR` | Portuguese |
| `de-DE` | German |

```excel
=SPG("AMZN", "SP_COUNTRY_NAME", , "Options: Terminology=ja-JP")
```

## Other Common Options

| Option | Description |
|---|---|
| `DataType=SD` or `DataType=CD` | Source data type (SD = S&P Data, CD = Consensus) |
| `Fill=EOM` | Fill end-of-month for time series |
| `Dates=Before` | Place date labels before values in SPGRangeV |

---

# METRIC REFERENCE

## Market Data

| Metric | Mnemonic |
|---|---|
| Day Close Price | `SP_PRICE_CLOSE` |
| Intraday Price | `SP_PRICE_INTRADAY` |
| Volume Weighted Average Price | `SP_VWAP` |
| Market Capitalization | `SP_MARKETCAP` |
| Total Enterprise Value (SNL) | `SNL_TEV` |
| Total Enterprise Value (CIQ) | `IQ_TEV` |
| Shares Outstanding | `SP_SHARES_OUT` |
| Volume | `SP_VOLUME` |
| Dividend Yield (%) | `SP_DIV_YIELD` |
| LTM Dividends Announced | `SP_DIV_LTM` |

**Sample:**
```excel
=SPG("AMZN", "SP_MARKETCAP")                -- Latest Market Capitalization
=SPG("AMZN", "SP_MARKETCAP", "04/15/2020")  -- Market Cap as of 4/15/2020
```

> Exclude the as-of date parameter for latest available.

---

## Corporate

| Metric | Mnemonic |
|---|---|
| Entity Name | `SP_COMPANY_NAME` |
| Ticker | `SP_TICKER` |
| Exchange | `SP_EXCHANGE` |
| Primary Industry (MI) | `MI_PRIMARY_INDUSTRY` |
| Primary Industry (CIQ/GICS) | `IQ_PRIMARY_INDUSTRY` |
| SIC Code | `SP_SIC_CODE` |
| State | `SP_STATE` |
| Country / Region Name | `SP_COUNTRY_NAME` |
| S&P Capital IQ ID | `SP_CIQ_ID` |
| Company Type | `SP_COMPANY_TYPE` |
| Company Status | `SP_COMPANY_STATUS` |
| Business Description | `SP_BUSINESS_DESCRIPTION` |
| Ownership Structure | `SP_OWN_STRUCTURE` |
| Month of Fiscal Year End | `SP_MONTH_FYE` |
| Web Address | `SP_WEBSITE` |

---

## Valuation / Multiples

### Trailing Multiples

| Metric | Mnemonic |
|---|---|
| TEV/Total Revenue | `IQ_TEV_TOTAL_REV` |
| TEV/EBITDA | `IQ_TEV_EBITDA` |
| TEV/EBIT | `IQ_TEV_EBIT` |
| TEV/Unlevered FCF | `IQ_TEV_UFCF` |
| Price/EPS | `IQ_PE` |
| Price/Book Value | `IQ_PBV_X` |
| Price/Tangible Book Value | `IQ_PTBV_X` |

**Sample:**
```excel
=SPG("AMZN", "IQ_PE", "LTM")                      -- Latest trailing PE
=SPG("AMZN", "SP_PE_FWD", "LTM", "4/15/2020")     -- Trailing PE as of 4/15/2020
```

### Forward Trading Multiples

| Metric | Mnemonic |
|---|---|
| TEV/Forward Total Revenue | `SP_TEV_TOTAL_REV_FWD` |
| TEV/Forward EBITDA | `SP_TEV_EBITDA_FWD` |
| TEV/Forward EBIT | `SP_TEV_EBIT_FWD` |
| Price/Forward EPS | `SP_PE_FWD` |

**Sample:**
```excel
=SPG("AMZN", "SP_PE_FWD", "NTM")                  -- Latest forward PE
=SPG("AMZN", "SP_PE_FWD", "NTM", "4/15/2020")     -- Forward PE as of 4/15/2020
```

> Supported periods for forward multiples: `NTM`, `FY+1`, `FQ+1`, `FY2021`, etc.

---

## Capital IQ Consensus Estimates

| Metric | Mnemonic |
|---|---|
| CIQ Avg Broker Recommendation (Text) | `SP_AVG_BROKER_REC_TEXT` |
| CIQ Avg Broker Recommendation (#) | `SP_AVG_BROKER_REC` |
| CIQ Mean Price Target | `SP_PRICE_TARGET` |
| Mean EPS Estimate | `SP_EPS_EST` |
| Mean Revenue Estimate | `SP_REV_EST` |
| Mean EBITDA Estimate | `SP_EBITDA_EST` |
| Mean EBIT Estimate | `SP_EBIT_EST` |
| Mean Net Income Estimate | `SP_NI_EST` |
| Mean Cash Flow per Share Estimate | `SP_CFPS_EST` |

**Non-Periodic:**
```excel
=SPG("AMZN", "SP_PRICE_TARGET")                  -- Latest Price Target
=SPG("AMZN", "SP_PRICE_TARGET", "04/15/2020")    -- Price Target as of 4/15/2020
```

**Periodic:**
```excel
=SPG("AMZN", "SP_EPS_EST", "FY+1")               -- EPS Estimate for next fiscal year
=SPG("AMZN", "SP_EPS_EST", "FY+1", "04/15/2020") -- Estimate as of 4/15/2020
```

> Supported periods for estimates: `NTM`, `FY+1`, `FQ+1`, `FY2021`, etc.

---

## Capital IQ Fundamentals

### Balance Sheet

| Metric | Mnemonic |
|---|---|
| Cash and Equivalents | `IQ_CASH_EQUIV` |
| Short Term Investments | `IQ_ST_INVEST` |
| Cash & Short Term Investments | `IQ_CASH_ST_INVEST` |
| Accounts Receivable | `IQ_AR` |
| Total Receivables | `IQ_TOTAL_RECEIV` |
| Inventory | `IQ_INVENTORY` |
| Total Current Assets | `IQ_TOTAL_CA` |
| Gross Property, Plant & Equipment | `IQ_GPPE` |
| Net Property, Plant & Equipment | `IQ_NPPE` |
| Long-term Investments | `IQ_LT_INVEST` |
| Total Goodwill and Intangibles | `IQ_TOTAL_GW_INTAN` |
| Total Assets | `IQ_TOTAL_ASSETS` |
| Accounts Payable | `IQ_AP` |
| Short-term Borrowings | `IQ_ST_DEBT` |
| Curr. Port. of LT Debt | `IQ_CURRENT_PORT_DEBT` |
| Current Portion of Leases | `IQ_CURRENT_PORT_LEASES` |
| Total Current Liabilities | `IQ_TOTAL_CL` |
| Long-Term Debt | `IQ_LT_DEBT` |
| Long-Term Leases | `IQ_CAPITAL_LEASES` |
| Total Liabilities | `IQ_TOTAL_LIAB` |
| Total Minority Interest | `IQ_MINORITY_INTEREST` |
| Total Preferred Equity | `IQ_TOTAL_PREF_EQUITY` |
| Common Stock | `IQ_COMMON_STOCK` |
| Retained Earnings | `IQ_RETAINED_EARNINGS` |
| Treasury Stock | `IQ_TREASURY` |
| Total Common Equity | `IQ_TOTAL_COMMON_EQUITY` |
| Total Equity | `IQ_TOTAL_EQUITY` |
| Total Liabilities And Equity | `IQ_TOTAL_LIAB_EQUITY` |
| Total Debt | `IQ_TOTAL_DEBT` |
| Net Debt | `IQ_NET_DEBT` |
| Total Capital | `IQ_TOTAL_CAP` |

#### Balance Sheet -- Supplemental

| Metric | Mnemonic |
|---|---|
| Filing Date | `IQ_FINL_FILING_DATE` |
| Period Date | `IQ_PERIOD_END` |
| Total Shares Out. on Filing Date | `IQ_SHARES_OUT_FILING_DATE` |
| Total Shares Out. on BS Date | `IQ_SHARES_OUT_PERIOD_END` |
| Book Value/Share | `IQ_BVPS` |
| Tangible Book Value | `IQ_TANG_EQUITY` |
| Tangible Book Value/Share | `IQ_TBVPS` |
| Net Goodwill | `IQ_GW_NET` |
| Net Intangibles | `IQ_INTAN_NET` |
| Total Leases | `IQ_TOTAL_LEASES` |
| Total Current Assets, As Reported | `IQ_TOTAL_CA_REPORTED` |
| Total Current Liabilities, As Reported | `IQ_TOTAL_CL_REPORTED` |
| Total Shareholders Equity, As Reported | `IQ_TOTAL_EQUITY_REPORTED` |
| Part-Time Employees | `IQ_PART_TIME` |
| Full Time Employees | `IQ_FULL_TIME` |

### Income Statement

| Metric | Mnemonic |
|---|---|
| Total Revenue | `IQ_TOTAL_REV` |
| Cost of Goods Sold / Cost of Revenue | `IQ_COGS` **(ALWAYS use this -- never use `IQ_COST_REV`)** |
| Gross Profit | `IQ_GP` |
| Selling General & Admin Exp. | `IQ_SGA_SUPPL` |
| R & D Exp. | `IQ_RD_EXP` |
| Depreciation & Amort. | `IQ_DA_SUPPL` |
| Amort. of Goodwill and Intangibles | `IQ_GW_INTAN_AMORT` |
| Operating Income | `IQ_OPER_INC` |
| Net Interest Exp. | `IQ_NET_INTEREST_EXP` |
| EBT Excl Unusual Items | `IQ_EBT_EXCL` |
| Other Unusual Items | `IQ_OTHER_UNUSUAL_SUPPL` |
| EBT Incl. Unusual Items | `IQ_EBT` |
| Income Tax Expense | `IQ_INC_TAX` |
| Earnings from Cont. Ops. | `IQ_EARNINGS_CONT_OPS` |
| Earnings of Discontinued Ops. | `IQ_EARNINGS_DISCONTINUED_OPS` |
| Extraord. Item & Account. Change | `IQ_EXTRA_ACC_ITEMS` |
| Net Income to Company | `IQ_NET_INC` |
| Pref. Dividends and Other Adj. | `IQ_PREF_DIV_OTHER` |
| Merger & Related Restruct. Charges | `IQ_MERGER_RESTRUCTURE` |
| NI to Common Incl Extra Items | `IQ_NI_AVAIL_INCL` |
| NI to Common Excl. Extra Items | `IQ_NI_AVAIL_EXCL` |
| Basic EPS | `IQ_BASIC_EPS_AFTER_EXTRA` |
| Basic EPS Excl. Extra Items | `IQ_BASIC_EPS_BEFORE_EXTRA` |
| Weighted Avg. Basic Shares Out. | `IQ_AVG_BASIC_SHARES_OUT` |
| Diluted EPS Incl. Extra Items | `IQ_DILUT_EPS_AFTER_EXTRA` |
| Diluted EPS Excl. Extra Items | `IQ_DILUT_EPS_BEFORE_EXTRA` |
| Weighted Avg. Diluted Shares Out. | `IQ_AVG_DILUT_SHARES_OUT` |
| Normalized Basic EPS | `IQ_BASIC_EPS_NORM` |
| Normalized Diluted EPS | `IQ_DILUT_EPS_NORM` |

#### Income Statement -- Supplemental

| Metric | Mnemonic |
|---|---|
| EBITDA | `IQ_EBITDA` |
| EBITDA Incl Eqty Inc from Affil Excl | `IQ_EBITDA_EQ_INC_EXCL_OPER_LEASE_ADJ` |
| EBITDA, As Reported | `IQ_EBITDA_REPORTED` |
| EBITA | `IQ_EBITA` |
| EBIT | `IQ_EBIT` |
| EBITDAR | `IQ_EBITDAR` |
| As Reported Total Revenue | `IQ_TOTAL_REV_AS_REPORTED` |
| Total Interest Income, As Reported | `IQ_INT_INC_TOTAL_REPORTED` |
| Total Interest Expense, As Reported | `IQ_INT_EXPEN_TOTAL_REPORTED` |
| Net Interest Income, As Reported | `IQ_NET_INT_INC_REPORTED` |
| Net Rental Expense, Total | `IQ_NET_RENTAL_EXP_FN` |
| Normalized Net Income | `IQ_NI_NORM` |
| Total Same Store Sales Growth | `IQ_SAME_STORE_TOTAL` |
| Earnings before Taxes, As Reported | `IQ_EBT_REPORTED` |
| Effective Tax Rate | `IQ_EFFECT_TAX_RATE` |
| Payout Ratio | `IQ_PAYOUT_RATIO` |
| Interest on Long-Term Debt | `IQ_INT_EXP_LTD` |
| Total Current Taxes | `IQ_CURR_TAXES` |
| Total Deferred Taxes | `IQ_DEFERRED_TAXES_TOTAL` |

### Cash Flow

| Metric | Mnemonic |
|---|---|
| Net Income - CF | `IQ_NI_CF` |
| Depreciation & Amort., Total | `IQ_DA_CF` |
| Asset Writedown & Restructuring Costs | `IQ_ASSET_WRITEDOWN_CF` |
| Stock-Based Compensation | `IQ_STOCK_BASED_CF` |
| Net Cash From Discontinued Ops. | `IQ_DO_CF` |
| Change in Acc. Receivable | `IQ_CHANGE_AR` |
| Change In Inventories | `IQ_CHANGE_INVENTORY` |
| Change in Acc. Payable | `IQ_CHANGE_AP` |
| Change in Unearned Rev. | `IQ_CHANGE_UNEARN_REV` |
| Change In Income Taxes | `IQ_CHANGE_INC_TAX` |
| Change in Def. Taxes | `IQ_CHANGE_DEF_TAX` |
| Cash from Ops. | `IQ_CASH_OPER` |
| Capital Expenditure | `IQ_CAPEX` |
| Sale of Property, Plant and Equipment | `IQ_SALE_PPE_CF` |
| Cash Acquisitions | `IQ_CASH_ACQUIRE_CF` |
| Divestitures | `IQ_DIVEST_CF` |
| Sale (Purchase) of Intangible assets | `IQ_SALE_INTAN_CF` |
| Invest. in Marketable & Equity Securt. | `IQ_INVEST_SECURITY_CF` |
| Cash from Investing | `IQ_CASH_INVEST` |
| Short Term Debt Issued | `IQ_ST_DEBT_ISSUED` |
| Long-Term Debt Issued | `IQ_LT_DEBT_ISSUED` |
| Total Debt Issued | `IQ_TOTAL_DEBT_ISSUED` |
| Short Term Debt Repaid | `IQ_ST_DEBT_REPAID` |
| Long-Term Debt Repaid | `IQ_LT_DEBT_REPAID` |
| Total Debt Repaid | `IQ_TOTAL_DEBT_REPAID` |
| Issuance of Common Stock | `IQ_COMMON_ISSUED` |
| Repurchase of Common Stock | `IQ_COMMON_REP` |
| Issuance of Pref. Stock | `IQ_PREF_ISSUED` |
| Repurchase of Preferred Stock | `IQ_PREF_REP` |
| Common Dividends Paid | `IQ_COMMON_DIV_CF` |
| Pref. Dividends Paid | `IQ_PREF_DIV_CF` |
| Common and/or Pref. Dividends Paid | `IQ_COMMON_PREF_DIV_CF` |
| Total Dividends Paid | `IQ_TOTAL_DIV_PAID_CF` |
| Cash from Financing | `IQ_CASH_FINAN` |
| Net Change in Cash | `IQ_CASH_NET_CHANGE` |

#### Cash Flow -- Supplemental

| Metric | Mnemonic |
|---|---|
| Cash Interest Paid | `IQ_CASH_INTEREST` |
| Cash Taxes Paid | `IQ_CASH_TAXES` |
| Net Debt Issued | `IQ_NET_DEBT_ISSUED` |
| Levered Free Cash Flow | `IQ_LEVERED_FCF` |
| Unlevered Free Cash Flow | `IQ_UNLEVERED_FCF` |
| Change in Net Working Capital | `IQ_CHANGE_NET_WORKING_CAPITAL` |

### As-of Dates for CIQ Fundamentals

Capital IQ Fundamentals support an "as-of" parameter for pulling historical financial data as of a specific date. This applies to both Actual and Relative period types:

```excel
=SPG("AMZN", "IQ_TOTAL_ASSETS", "FY2018", "6/30/2019")  -- Actual period with as-of date
=SPG("AMZN", "IQ_TOTAL_ASSETS", "FY0", "6/30/2019")     -- Relative period with as-of date
```

---

## SNL Financials

### Key Financials

| Metric | Mnemonic |
|---|---|
| Market Capitalization | `SP_MARKETCAP` |
| Total Enterprise Value (SNL) | `SNL_TEV` |
| Total Revenue | `SNL_TOTAL_REVENUE` |
| Interest Expense | `SNL_INT_EXP` |
| Net Income | `SNL_NET_INC` |
| Net Income Attributable to Parent | `SNL_NET_INC_PARENT` |
| Avg Diluted Shares | `SNL_AVG_DIL_SHARES` |
| Basic EPS after Extra | `SNL_BASIC_EPS_AFTER_EXTRA` |
| Diluted EPS after Extraordinary | `SNL_DILUT_EPS_AFTER_EXTRA` |
| EBITDA | `SNL_EBITDA` |
| EBIT | `SNL_EBIT` |
| Common Dividends Declared per Share | `SNL_COMMON_DIV_DECLARED` |
| Dividend Payout Ratio | `SNL_PAYOUT_RATIO` |
| Recurring Revenue Growth | `SNL_REC_REV_GROWTH` |
| EPS Growth, before Extraordinary | `SNL_EPS_GROWTH_BEFORE_EXTRA` |
| EPS Growth, after Extraordinary | `SNL_EPS_AFTER_EXTRA_GROWTH` |
| ROAA | `SNL_ROA` |
| ROAE | `SNL_ROE` |
| ROACE | `SNL_ROCE` |
| ROATCE | `SNL_ROATCE` |
| Gross Margin | `SNL_GROSS_MARGIN` |
| EBITDA Margin | `SNL_EBITDA_MARGIN` |
| EBIT Margin | `SNL_EBIT_MARGIN` |
| Net Income Margin | `SNL_NET_INC_MARGIN` |
| Recurring EBITDA Margin | `SNL_REC_EBITDA_MARGIN` |
| EBITDA/ Interest Expense | `SNL_EBITDA_TO_INT_EXP` |
| Cash and Cash Equivalents | `SNL_CASH_EQUIV` |
| Current Assets | `SNL_CURRENT_ASSETS` |
| Net PP&E | `SNL_NPPE` |
| Total Assets | `SNL_TOTAL_ASSETS` |
| Total Debt | `SNL_TOTAL_DEBT` |
| Total Equity | `SNL_TOTAL_EQUITY` |
| Total Capitalization | `SNL_TOTAL_CAP` |
| Common Shares Outstanding | `SNL_SHARES_OUT_PERIOD_END` |
| Book Value per Share | `SNL_BVPS` |
| Tangible Book Value per Share | `SNL_TBVPS` |
| Total Equity/ Total Assets | `SNL_EQUITY_TO_ASSETS` |
| Total Debt/ Total Equity | `SNL_DEBT_TO_EQUITY` |
| Total Debt/ Total Capitalization | `SNL_TOTAL_DEBT_TO_TOTAL_CAP` |
| Debt/ EBITDA | `SNL_DEBT_TO_EBITDA` |
| Cash Flow from Operating Activities | `SNL_CASH_OPER` |
| Cash Flow: Capital Expenditures | `SNL_CAPEX` |

#### SNL Key Financials -- Supplemental

| Metric | Mnemonic |
|---|---|
| Period Ended (mm/dd/yyyy) | `SNL_PERIOD_END` |
| Earnings Release Date (mm/dd/yyyy) | `SNL_EARNINGS_RELEASE_DATE` |
| Financials Reported Currency Code | `SNL_CURRENCY_FINANCIALS` |
| Fiscal Period | `SNL_FISCAL_PERIOD` |

### Banking

| Metric | Mnemonic |
|---|---|
| Net Customer Loans | `SNL_NET_CUSTOMER_LOANS` |
| Total Deposits | `SNL_TOTAL_DEPOSITS` |
| Tangible Equity | `SNL_TANG_EQUITY` |
| Net Income | `SNL_NET_INC` |
| ROACE | `SNL_ROCE` |
| ROATCE | `SNL_ROATCE` |
| Net Loans/ Assets | `SNL_NET_LOAN_TO_ASSETS` |
| Amortized Loans/ Deposits | `SNL_AMORT_LOANS_TO_DEPOSITS` |
| Securities/ Assets | `SNL_SECS_TO_ASSETS` |
| Loans/ Deposits | `SNL_LOAN_TO_DEP` |
| Net Interest Income/ Avg Assets | `SNL_NET_INT_INC_TO_AVG_ASSETS` |
| Net Interest Margin | `SNL_NIM` |
| Tier 1 Common Capital (CET1) Ratio | `SNL_TIER_1_COMMON_RATIO` |
| Tier 1 Ratio | `SNL_TIER_1_RATIO` |
| Total Capital Ratio | `SNL_TOTAL_CAPITAL_RATIO` |

### Insurance

| Metric | Mnemonic |
|---|---|
| Investments | `SNL_INVESTMENTS` |
| Total Policy Reserves | `SNL_FIN_TOTAL_POLICY_RESV` |
| Total Policy Income | `SNL_TOTAL_POLICY_INC` |
| Net Investment Income | `SNL_NET_INVEST_INC` |
| Total Policy Expense | `SNL_TOTAL_POLICY_EXP` |
| Underwriting & Other Expense | `SNL_UNDERWRITING_OTHER_EXPENSE` |
| Gross Premiums Written | `SNL_GPW` |
| Gross Premiums Earned | `SNL_GROSS_PREMS_EARNED` |
| Ceded Premiums Earned | `SNL_CEDED_PREMS_EARNED` |
| Net Premiums Earned | `SNL_NPE` |
| Loss Ratio | `SNL_LR` |
| Expense Ratio | `SNL_ER` |
| Combined Ratio | `SNL_CR` |
| Policy Expense/ Expense | `SNL_POLICY_EXP_TO_EXP` |
| Insurance Investment Yield | `SNL_INSURANCE_INVEST_YLD` |

### Energy (Coal, Gas Utilities, Midstream, Power)

| Metric | Mnemonic |
|---|---|
| Coal Sales Revenue | `SNL_COAL_SALES_REV` |
| Electric Revenue | `SNL_ELEC_REV` |
| Oil & Natural Gas Revenue | `SNL_OIL_NAT_GAS_REV` |
| Gas Distribution Revenue | `SNL_GAS_DIST_REV` |
| Oil & Gas Exploration & Production | `SNL_OIL_GAS_EXPLORATION_PRODUCTION` |
| Oil & Gas Products Sales | `SNL_OIL_GAS_PRODUCTS_SALES` |
| Oil & Gas Midstream Operating Rev. | `SNL_OIL_GAS_MIDSTREAM_OPER_REV` |
| Energy Operating Revenue | `SNL_ENERGY_OPER_REV` |
| Electric Revenue/ Operating Revenue | `SNL_ELEC_REV_TO_OPER_REV` |
| Gas Revenue/ Operating Revenue | `SNL_GAS_REV_TO_OPER_REV` |
| Op. & Maint./ Operating Expense | `SNL_OPS_AND_MAINT_TO_OPER_EXP` |
| Electric Generation/ Operating Expense | `SNL_ELEC_GEN_TO_OPER_EXP` |
| Gas Cost/ Operating Expense | `SNL_GAS_COST_TO_OPER_EXP` |
| Midstream Revenue/ Operating Revenue | `SNL_MIDSTREAM_REV_TO_OPER_REV` |
| Midstream Costs/ Operating Expense | `SNL_MIDSTREAM_COSTS_TO_OPER_REV` |

### Media & Communications

| Metric | Mnemonic |
|---|---|
| Radio Content and Broadcasting Revenue | `SNL_RADIO_CONTENT_BROADCASTING_REV` |
| TV/ Cable Network Revenue | `SNL_TV_TO_CABLE_NETWORK_REV` |
| Filmed Entertainment & TV Revenue | `SNL_FILMED_ENTERTAINMENT_TV_REV` |
| Internet Content and Distribution Revenue | `SNL_INTERNET_CONTENT_DIST_REV` |
| Content, Broadcasting and Distribution Revenue | `SNL_CONTENT_BROADCASTING_DIST_REV` |
| Magazine Revenue | `SNL_MAGAZINE_REV` |
| Newspaper Revenue | `SNL_NEWSPAPER_REV` |
| Book Publishing Revenue | `SNL_BOOK_PUBLISHING_REV` |
| Publishing Revenue | `SNL_PUBLISHING_REV` |
| Owned & Operated Radio Stations | `SNL_OWNED_OPERATED_RADIO_STATIONS` |
| Number of Radio Stations | `SNL_NUM_RADIO_STATIONS` |
| Net Radio Revenue | `SNL_NET_RADIO_REV` |
| Basic Subscribers | `SNL_BASIC_SUBSCRIBERS` |
| Digital Subscribers | `SNL_DIGITAL_SUBSCRIBERS` |
| High Speed Data Subscribers | `SNL_HIGH_SPEED_DATA_SUBSCRIBERS` |

### Financial Services

| Metric | Mnemonic |
|---|---|
| Assets Under Management | `SNL_AUM` |
| Mutual Funds under Management | `SNL_MUTUAL_FUNDS_UNDER_MGMT` |
| AUM Growth | `SNL_AUM_GROWTH` |
| Management Fees/ Avg AUM | `SNL_MGMT_FEES_TO_AVG_AUM` |
| Loans Originated | `SNL_LOAN_ORIGINATED` |
| Loans Sold | `SNL_LOAN_SOLD` |
| Total Net Loans | `SNL_NET_LOANS` |
| Investments | `SNL_INV_CO_INVEST` |
| Managed Assets | `SNL_MNGD_ASSETS` |
| Managed Receiv. for Self and Others | `SNL_MNGD_RECV_FOR_SELF_OTHERS` |
| Managed NCOs/ Avg Managed Rec | `SNL_MNGD_NCO_TO_AVG_MNGD_REC` |
| Investments/ Assets | `SNL_INVEST_TO_ASSETS` |
| Return on Avg. AUM | `SNL_RETURN_ON_AVG_AUM` |
| Return on Avg. Managed Receivables | `SNL_RETURN_ON_AVG_MNGD_REC` |
| Return on Avg. Managed Assets | `SNL_RETURN_ON_AVG_MNGD_ASSETS` |

### Real Estate

| Metric | Mnemonic |
|---|---|
| Gross Depreciable Property | `SNL_GROSS_DEPRECIABLE_PPTY` |
| Net Property Investment | `SNL_NET_PPTY_INVEST` |
| Finance Leases | `SNL_FIN_LEASES` |
| Mortgage Loans | `SNL_MRTG_LOAN` |
| Rental Revenue | `SNL_RENTAL_REV` |
| Rental Net Operating Income | `SNL_RENTAL_NET_OPER_INC` |
| NOI | `SNL_NOI` |
| FFO | `SNL_FFO_GAAP` |
| Adjusted FFO | `SNL_AFFO` |
| Gain on Sale of Real Estate | `SNL_GAIN_ON_SALE_OF_RE` |
| FFO Payout (%) | `SNL_FFO_PAYOUT` |
| FFO/ Total Revenue (%) | `SNL_FFO_TO_TOTAL_REV` |
| Same-store NOI: Change | `SNL_SS_NOI_CHANGE` |
| Same-store Revenue: Chg. from Prior | `SNL_SS_REV_CHANGE_FROM_PRIOR` |
| NAV per Share, as Reported | `SNL_NAV_PER_SHARE` |

---

## Other

| Metric | Mnemonic |
|---|---|
| Topic Tags | `SP_TOPICTAG` |
| Headcount | `SP_HEADCOUNT_LATEST` |

---

# KNOWN NON-EXISTENT ITEMS

**These items do NOT exist. NEVER use them:**

| What You Might Guess | Correct Alternative |
|---|---|
| `SP_52WK_HI` / `SP_52WK_LO` | Not documented -- use `SPGRANGEV` with `SP_PRICE_CLOSE` to derive |
| `SP_NUM_EST_BROKER_REC` | Not documented -- use `SP_AVG_BROKER_REC` or `SP_AVG_BROKER_REC_TEXT` |
| `SP_AVG_VOLUME` / `SP_VOLUME_30D` | Use `SP_VOLUME` with date range via `SPGRANGEV` |
| `IQ_COMPANY_TICKER` | Use `SP_TICKER` |
| `IQ_ASSET_TURNOVER` | Calculate: `IQ_TOTAL_REV / IQ_TOTAL_ASSETS` |
| `IQ_INVENTORY_TURNOVER` | Calculate: `IQ_COGS / IQ_INVENTORY` |
| `IQ_CURRENT_RATIO` | Calculate: `IQ_TOTAL_CA / IQ_TOTAL_CL` |
| `IQ_QUICK_RATIO` | Calculate: `(IQ_TOTAL_CA - IQ_INVENTORY) / IQ_TOTAL_CL` |
| `IQ_ROIC` / `IQ_WACC` | Calculate manually from documented items |
| `IQ_GROSS_MARGIN` | Use `SNL_GROSS_MARGIN` or calculate: `IQ_GP / IQ_TOTAL_REV` |
| `IQ_EBITDA_MARGIN` | Use `SNL_EBITDA_MARGIN` or calculate: `IQ_EBITDA / IQ_TOTAL_REV` |
| `IQ_FCF_MARGIN` | Calculate: `IQ_LEVERED_FCF / IQ_TOTAL_REV` |
| `IQ_NET_DEBT_TO_EBITDA` | Use `SNL_DEBT_TO_EBITDA` or calculate: `IQ_NET_DEBT / IQ_EBITDA` |
| `IQ_ENTERPRISE_VALUE` | Use `IQ_TEV` or `SNL_TEV` |
| `IQ_FREE_CASH_FLOW` | Use `IQ_LEVERED_FCF` or `IQ_UNLEVERED_FCF` |
| `IQ_OPERATING_MARGIN` | Use `SNL_EBIT_MARGIN` or calculate: `IQ_OPER_INC / IQ_TOTAL_REV` |
| `IQ_NET_MARGIN` | Use `SNL_NET_INC_MARGIN` or calculate: `IQ_NET_INC / IQ_TOTAL_REV` |
| `IQ_DEBT_TO_EQUITY` | Use `SNL_DEBT_TO_EQUITY` or calculate: `IQ_TOTAL_DEBT / IQ_TOTAL_EQUITY` |
| `IQ_EV_TO_SALES` | Use `IQ_TEV_TOTAL_REV` |
| `IQ_EV_TO_EBITDA` | Use `IQ_TEV_EBITDA` |
| `IQ_COST_REV` | Use `IQ_COGS` |

**When in doubt:** Check the metric reference tables above or the Excel reference guide. If not found, it does NOT exist.

---

# COMMON PITFALLS

## 1. Never use `IQ_COST_REV`
`IQ_COST_REV` is unreliable and returns `#INVALID FUNCTION PARAMETER` for many companies. **Always use `IQ_COGS`** for Cost of Goods Sold / Cost of Revenue.

## 2. Using forward periods with fundamental mnemonics
`IQ_*` and `SNL_*` data items only support historical/current periods (`FY0`, `FY-1`, `LTM`, etc.). Using `FY+1`, `NTM`, or any forward period with them returns `#INVALID FUNCTION PARAMETER`. For forward-looking data, switch to consensus estimate mnemonics:

| Historical (IQ_*) | Forward (SP_*_EST) |
|---|---|
| `IQ_TOTAL_REV` | `SP_REV_EST` |
| `IQ_EBITDA` | `SP_EBITDA_EST` |
| `IQ_EBIT` | `SP_EBIT_EST` |
| `IQ_NET_INC` | `SP_NI_EST` |
| `IQ_DILUT_EPS_BEFORE_EXTRA` | `SP_EPS_EST` |

**Only the above line items have consensus estimate mnemonics.** All other income statement line items (COGS, R&D, SGA, D&A, Interest Expense, Tax Expense, Effective Tax Rate, Basic EPS, Share Counts, etc.) have NO estimate equivalent. For estimate columns (FY+1E, FY+2E), **leave cells blank** for line items without a consensus mnemonic -- do NOT write `"-"` or any placeholder.

## 3. Using `=@SPG()` in openpyxl
Never include `@` in formula strings. Write `=SPG(...)` -- Excel adds `@` at display time.

## 4. Using bare tickers as identifiers
Always use exchange-qualified format (`"NASDAQ:NVDA"`) to avoid `#INVALID COMPANY ID`.

## 5. Writing `"-"` for unavailable data
Never write `"-"` or any placeholder into cells where data is known to be unavailable. Leave the cell blank. This applies to estimate columns where no consensus mnemonic exists, and to any line item where the data item is not applicable.
