# Data science in Microsoft Fabric using Visual Studio Code

You can build and develop data science and data engineering solutions for Microsoft Fabric within VS Code. Microsoft Fabric extensions for VS Code provide an integrated development experience for working with Fabric artifacts, lakehouses, notebooks, and user data functions.

## What is Microsoft Fabric?

Microsoft Fabric is an enterprise-ready, end-to-end analytics platform. It unifies data movement, data processing, ingestion, transformation, real-time event routing, and report building. It supports these capabilities with integrated services like Data Engineering, Data Factory, Data Science, Real-Time Intelligence, Data Warehouse, and Databases. Sign up for free and explore Microsoft Fabric for 60 days — no credit card required.

![Diagram that shows what is Microsoft Fabric?](/assets/docs/datascience/microsoft-fabric/microsoft-fabric.png)

## Prerequisites

Before you get started with Microsoft Fabric extensions for VS Code, you need:

*   **Visual Studio Code**: Install latest VS Code version.
*   **Microsoft Fabric account**: You need access to a Microsoft Fabric workspace. You can sign up for a free trial to get started.
*   **Python**: Install Python 3.8 or later to work with Notebooks, User data functions in VS Code.

## Installation and setup

You can find and install the extensions from the Visual Studio Marketplace or directly in VS Code. Select the **Extensions** view (⇧⌘X (Windows, Linux Ctrl+Shift+X)) and search for **Microsoft Fabric**.

### Which extensions to use

Extension

Best For

Key Features

Recommended for you if…

Documentation

**Microsoft Fabric extension**

General workspace management, item management and working with item definitions

- Manage Fabric items (Lakehouses, Notebooks, Pipelines)  
- Microsoft account sign-in & tenant switching  
- Unified or grouped item views  
- Edit Fabric notebooks with IntelliSense  
- Command Palette integration (`Fabric:` commands)

You want a single extension to manage workspaces, notebooks, and items in Fabric directly from VS Code.

What is Fabric VS code extension

**Fabric User data functions**

Developers building custom transformations & workflows

- Author serverless functions in Fabric  
- Local debugging with breakpoints  
- Manage data source connections  
- Install/manage Python libraries  
- Deploy functions directly to Fabric workspace

You build automation or data transformation logic and need debugging + deployment from VS Code.

Develop User data function in VS code

**Fabric Data Engineering**

Data engineers working with large-scale data & Spark

- Explore Lakehouses (tables, raw files)  
- Develop/debug Spark notebooks  
- Build/test Spark job definitions  
- Sync notebooks between local VS Code & Fabric  
- Preview schemas & sample data

You work with Spark, Lakehouses, or large-scale data pipelines and want to explore, develop, and debug locally.

Develop Fabric notebooks in VS Code

## Getting started

Once you have the extensions installed and signed in, you can start working with Fabric workspaces and items. In the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)), type **Fabric** to list the commands that are specific to Microsoft Fabric.

![Diagram that shows all microsoft Fabric commands](/assets/docs/datascience/microsoft-fabric/fabric-command-palette.png)

## Fabric Workspace and items explorer

The Fabric extensions provide a seamless way to work with both remote and local Fabric items.

*   In the Fabric extension, the **Fabric Workspaces** section lists all items from your remote workspace, organized by type (Lakehouses, Notebooks, Pipelines, and more).
*   In the Fabric extension, the **Local folder** section shows a Fabric item(s) folder opened in VS Code. It reflects the structure of your fabric item definition for each type that is opened in VS Code. This enables you to develop locally and publish your changes to current or new workspace.

![Screenshot that shows how to view your workspaces and items?](/assets/docs/datascience/microsoft-fabric/view-workspaces-and-items.png)

## Use user data functions for data science

1.  In the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)), type **Fabric: Create Item**.
    
2.  Select your workspace and select **User data function**. Provide a name and select **Python** language.
    
3.  You are notified to set up the Python virtual environment and continue to set this up locally.
    
4.  Install the libraries using `pip install` or select the user data function item in the Fabric extension to add libraries. Update the `requirements.txt` file to specify the dependencies:
    
    ```
    fabric-user-data-functions ~= 1.0
    pandas == 2.3.1
    numpy == 2.3.2
    requests == 2.32.5
    scikit-learn=1.2.0
    joblib=1.2.0
    ```
    
5.  Open `functions_app.py`. Here's an example of developing a User Data Function for data science using scikit-learn:
    
    ```
    import datetime
    import fabric.functions as fn
    import logging
    
    # Import additional libraries
    import pandas as pd
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.preprocessing import StandardScaler
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import accuracy_score
    import joblib
    
    udf = fn.UserDataFunctions()
    @udf.function()
    def train_churn_model(data: list, targetColumn: str) -> dict:
        '''
        Description: Train a Random Forest model to predict customer churn using pandas and scikit-learn.
    
        Args:
        - data (list): List of dictionaries containing customer features and churn target
        Example: [{"Age": 25, "Income": 50000, "Churn": 0}, {"Age": 45, "Income": 75000, "Churn": 1}]
        - targetColumn (str): Name of the target column for churn prediction
        Example: "Churn"
    
        Returns: dict: Model training results including accuracy and feature information
        '''
        # Convert data to DataFrame
        df = pd.DataFrame(data)
    
        # Prepare features and target
        numeric_features = df.select_dtypes(include=['number']).columns.tolist()
        numeric_features.remove(targetColumn)
    
        X = df[numeric_features]
        y = df[targetColumn]
    
        # Split and scale data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
    
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train_scaled, y_train)
    
        # Evaluate and save
        accuracy = accuracy_score(y_test, model.predict(X_test_scaled))
        joblib.dump(model, 'churn_model.pkl')
        joblib.dump(scaler, 'scaler.pkl')
    
        return {
            'accuracy': float(accuracy),
            'features': numeric_features,
            'message': f'Model trained with {len(X_train)} samples and {accuracy:.2%} accuracy'
        }
    
    @udf.function()
    def predict_churn(customer_data: list) -> list:
        '''
        Description: Predict customer churn using trained Random Forest model.
    
        Args:
        - customer_data (list): List of dictionaries containing customer features for prediction
        Example: [{"Age": 30, "Income": 60000}, {"Age": 55, "Income": 80000}]
    
        Returns: list: Customer data with churn predictions and probability scores
        '''
        # Load saved model and scaler
        model = joblib.load('churn_model.pkl')
        scaler = joblib.load('scaler.pkl')
    
        # Convert to DataFrame and scale features
        df = pd.DataFrame(customer_data)
        X_scaled = scaler.transform(df)
    
        # Make predictions
        predictions = model.predict(X_scaled)
        probabilities = model.predict_proba(X_scaled)[:, 1]
    
        # Add predictions to original data
        results = customer_data.copy()
        for i, (pred, prob) in enumerate(zip(predictions, probabilities)):
            results[i]['churn_prediction'] = int(pred)
            results[i]['churn_probability'] = float(prob)
    
        return results
    ```
    
6.  Test your functions locally, by pressing F5.
    
7.  In the Fabric extension, in **Local folder** , select the function and publish to your workspace.
    
    ![Screenshot that shows how to publish your user data functions item](/assets/docs/datascience/microsoft-fabric/publish-user-data-function.png)
    

Learn more about invoking the function from:

*   Fabric Data pipelines
*   Fabric Notebooks
*   An external application

## Use Fabric notebooks for data science

A Fabric notebook is an interactive workbook in Microsoft Fabric for writing and running code, visualizations, and markdown side-by-side. Notebooks support multiple languages (Python, Spark, SQL, Scala, and more) and are ideal for data exploration, transformation, and model development in Fabric working with your existing data in OneLake.

### Example

The cell below reads a CSV with Spark, converts it to pandas, and trains a logistic regression model with scikit-learn. Replace column names and path with your dataset values.

```
def train_logistic_from_spark(spark, csv_path):
    # Read CSV with Spark, convert to pandas
    sdf = spark.read.option("header", "true").option("inferSchema", "true").csv(csv_path)
    df = sdf.toPandas().dropna()

    # Adjust these to match your dataset
    X = df[['feature1', 'feature2']]
    y = df['label']

    from sklearn.model_selection import train_test_split
    from sklearn.linear_model import LogisticRegression
    from sklearn.metrics import accuracy_score

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = LogisticRegression(max_iter=200)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    return {'accuracy': float(accuracy_score(y_test, preds))}

# Example usage in a Fabric notebook cell
# train_logistic_from_spark(spark, '/path/to/data.csv')
```

Refer to Microsoft Fabric Notebooks documentation to learn more.

## Git integration

Microsoft Fabric supports Git integration that enables version control and collaboration across data and analytics projects. You can connect a Fabric workspace to Git repositories, primarily Azure DevOps or GitHub, and only supported items are synced. This integration also supports CI/CD workflow to enable teams to manage releases efficiently and maintain high-quality analytics environments.

![GIF that shows how to use Git integration with User data functions](/assets/docs/datascience/microsoft-fabric/fabric-git-integration.gif)

## Next steps

Now that you have Microsoft Fabric extensions set up in VS Code, explore these resources to deepen your knowledge:

*   Learn about Microsoft Fabric for Data Science.
*   Set up your Fabric trial capacity
*   Microsoft Fabric fundamentals

To engage with the community and get support:

*   Microsoft Fabric community forums
*   Fabric samples and templates
*   Visual Studio Marketplace reviews and feedback

10/9/2025