# Stored Data

A `canvas` object may **optionally** contain the `stored_data` object, which is a JSON hash where you can add data you want to persist through multiple cycles.

For example, a teammate may interact with multiple configure cycles when adding an app. You can use `stored_data` to pass data through each of these cycles until you need it at the end.