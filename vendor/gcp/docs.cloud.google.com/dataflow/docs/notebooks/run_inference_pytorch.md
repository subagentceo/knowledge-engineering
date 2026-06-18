# Apache Beam RunInference for PyTorch

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   Cloud Dataflow
*   Dataflow ML

Send feedback

# Apache Beam RunInference for PyTorch Stay organized with collections Save and categorize content based on your preferences.

![](https://raw.githubusercontent.com/google/or-tools/main/tools/colab_32px.png)Run in Google Colab

![](https://raw.githubusercontent.com/google/or-tools/main/tools/github_32px.png)View source on GitHub

This notebook demonstrates the use of the RunInference transform for PyTorch. Apache Beam includes implementations of the ModelHandler class for users of PyTorch. For more information about using RunInference, see Get started with AI/ML pipelines in the Apache Beam documentation.

This notebook illustrates common RunInference patterns, such as:

*   Using a database with RunInference.
*   Postprocessing results after using RunInference.
*   Inference with multiple models in the same pipeline.

The linear regression models used in these samples are trained on data that correspondes to the 5 and 10 times tables; that is, `y = 5x` and `y = 10x` respectively.

## Dependencies

The RunInference library is available in Apache Beam versions 2.40 and later.

To use Pytorch RunInference API, you need to install the PyTorch module. To install PyTorch, use `pip`:

```
pip install apache_beam[interactive,gcp,dataframe] --quiet
```

```
%pip install torch --quiet
```

```
import argparse
import csv
import json
import os
import torch
from typing import Tuple

import apache_beam as beam
import numpy
from apache_beam.io.gcp.bigquery import ReadFromBigQuery
from apache_beam.ml.inference.base import KeyedModelHandler
from apache_beam.ml.inference.base import PredictionResult
from apache_beam.ml.inference.base import RunInference
from apache_beam.dataframe.convert import to_pcollection
from apache_beam.ml.inference.pytorch_inference import PytorchModelHandlerTensor
from apache_beam.ml.inference.pytorch_inference import PytorchModelHandlerKeyedTensor
from apache_beam.options.pipeline_options import PipelineOptions

import warnings
warnings.filterwarnings('ignore')
```

```
from google.colab import auth
auth.authenticate_user()
```

```
# Constants
project = "<your GCP project>" # @param {type:'string'}
bucket = "<your GCP bucket>" # @param {type:'string'}

# To avoid warnings, set the project.
os.environ['GOOGLE_CLOUD_PROJECT'] = project

save_model_dir_multiply_five = 'five_times_table_torch.pt'
save_model_dir_multiply_ten = 'ten_times_table_torch.pt'
```

## Create data and PyTorch models for the RunInference transform

Create linear regression models, prepare train and test data, and train models.

### Create a linear regression model in PyTorch

Use the following code to create a linear regression model.

```
class LinearRegression(torch.nn.Module):
    def __init__(self, input_dim=1, output_dim=1):
        super().__init__()
        self.linear = torch.nn.Linear(input_dim, output_dim)  
    def forward(self, x):
        out = self.linear(x)
        return out
```

### Prepare train and test data for an example model

This example model is a 5 times table.

*   `x` contains values in the range from 0 to 99.
*   `y` is a list of 5 * `x`.
*   `value_to_predict` includes values outside of the training data.

```
x = numpy.arange(0, 100, dtype=numpy.float32).reshape(-1, 1)
y = (x * 5).reshape(-1, 1)
value_to_predict = numpy.array([20, 40, 60, 90], dtype=numpy.float32).reshape(-1, 1)
```

### Train the linear regression mode on 5 times data

Use the following code to train your linear regression model on the 5 times table.

```
five_times_model = LinearRegression()
optimizer = torch.optim.Adam(five_times_model.parameters())
loss_fn = torch.nn.L1Loss()

"""
Train the five_times_model
"""
epochs = 10000
tensor_x = torch.from_numpy(x)
tensor_y = torch.from_numpy(y)
for epoch in range(epochs):
    y_pred = five_times_model(tensor_x)
    loss = loss_fn(y_pred, tensor_y)
    five_times_model.zero_grad()
    loss.backward()
    optimizer.step()
```

Save the model using `torch.save()`, and then confirm that the saved model file exists.

```
torch.save(five_times_model.state_dict(), save_model_dir_multiply_five)
print(os.path.exists(save_model_dir_multiply_five)) # Verify that the model is saved.
```

True

### Prepare train and test data for a 10 times model

This example model is a 10 times table.

*   `x` contains values in the range from 0 to 99.
*   `y` is a list of 10 * `x`.

```
x = numpy.arange(0, 100, dtype=numpy.float32).reshape(-1, 1)
y = (x * 10).reshape(-1, 1)
```

### Train the linear regression model on 10 times data

Use the following to train your linear regression model on the 10 times table.

```
ten_times_model = LinearRegression()
optimizer = torch.optim.Adam(ten_times_model.parameters())
loss_fn = torch.nn.L1Loss()

epochs = 10000
tensor_x = torch.from_numpy(x)
tensor_y = torch.from_numpy(y)
for epoch in range(epochs):
    y_pred = ten_times_model(tensor_x)
    loss = loss_fn(y_pred, tensor_y)
    ten_times_model.zero_grad()
    loss.backward()
    optimizer.step()
```

Save the model using `torch.save()`.

```
torch.save(ten_times_model.state_dict(), save_model_dir_multiply_ten)
print(os.path.exists(save_model_dir_multiply_ten)) # verify if the model is saved
```

True

## Pattern 1: RunInference for predictions

This pattern demonstrates how to use RunInference for predictions.

### Use RunInference within the pipeline

1.  Create a PyTorch model handler object by passing required arguments such as `state_dict_path`, `model_class`, and `model_params` to the `PytorchModelHandlerTensor` class.
2.  Pass the `PytorchModelHandlerTensor` object to the RunInference transform to perform predictions on unkeyed data.

```
torch_five_times_model_handler = PytorchModelHandlerTensor(
    state_dict_path=save_model_dir_multiply_five,
    model_class=LinearRegression,
    model_params={'input_dim': 1,
                  'output_dim': 1}
                  )
pipeline = beam.Pipeline()

with pipeline as p:
      (
      p 
      | "ReadInputData" >> beam.Create(value_to_predict)
      | "ConvertNumpyToTensor" >> beam.Map(torch.Tensor)
      | "RunInferenceTorch" >> RunInference(torch_five_times_model_handler)
      | beam.Map(print)
      )
```

PredictionResult(example=tensor([20.]), inference=tensor([102.0095], grad_fn=<UnbindBackward0>))
PredictionResult(example=tensor([40.]), inference=tensor([201.2056], grad_fn=<UnbindBackward0>))
PredictionResult(example=tensor([60.]), inference=tensor([300.4017], grad_fn=<UnbindBackward0>))
PredictionResult(example=tensor([90.]), inference=tensor([449.1959], grad_fn=<UnbindBackward0>))

## Pattern 2: Postprocess RunInference results

This pattern demonstrates how to postprocess the RunInference results.

Add a `PredictionProcessor` to the pipeline after `RunInference`. `PredictionProcessor` processes the output of the `RunInference` transform.

```
class PredictionProcessor(beam.DoFn):
  """
  A processor to format the output of the RunInference transform.
  """
  def process(
      self,
      element: PredictionResult):
    input_value = element.example
    output_value = element.inference
    yield (f"input is {input_value.item()} output is {output_value.item()}")

pipeline = beam.Pipeline()

with pipeline as p:
    (
    p
    | "ReadInputData" >> beam.Create(value_to_predict)
    | "ConvertNumpyToTensor" >> beam.Map(torch.Tensor)
    | "RunInferenceTorch" >> RunInference(torch_five_times_model_handler)
    | "PostProcessPredictions" >> beam.ParDo(PredictionProcessor())
    | beam.Map(print)
    )
```

input is 20.0 output is 102.00947570800781
input is 40.0 output is 201.20559692382812
input is 60.0 output is 300.4017028808594
input is 90.0 output is 449.1958923339844

## Pattern 3: Attach a key

This pattern demonstrates how attach a key to allow your model to handle keyed data.

### Modify the model handler and post processor

Modify the pipeline to read from sources like CSV files and BigQuery.

In this step, you take the following actions:

*   To handle keyed data, wrap the `PytorchModelHandlerTensor` object around `KeyedModelHandler`.
*   Add a map transform that converts a table row into `Tuple[str, float]`.
*   Add a map transform that converts `Tuple[str, float]` to `Tuple[str, torch.Tensor]`.
*   Modify the post-inference processor to output results with the key.

```
class PredictionWithKeyProcessor(beam.DoFn):
    def __init__(self):
        beam.DoFn.__init__(self)

    def process(
          self,
          element: Tuple[str, PredictionResult]):
        key = element[0]
        input_value = element[1].example
        output_value = element[1].inference
        yield (f"key: {key}, input: {input_value.item()} output: {output_value.item()}" )
```

### Create a source with attached key

This section shows how to create either a BigQuery or a CSV source with an attached key.

#### Use BigQuery as the source

Follow these steps to use BigQuery as your source.

To install the Google Cloud BigQuery API, use `pip`:

```
%pip install --upgrade google-cloud-bigquery --quiet
```

Create a table in BigQuery using the following snippet, which has two columns. The first column holds the key and the second column holds the test value. To use BiqQuery, you need a Google Cloud account with the BigQuery API enabled.

```
gcloud config set project $project
```

Updated property [core/project].

```
from google.cloud import bigquery

client = bigquery.Client(project=project)

# Make sure the dataset_id is unique in your project.
dataset_id = '{project}.maths'.format(project=project)
dataset = bigquery.Dataset(dataset_id)

# Modify the location based on your project configuration.
dataset.location = 'US'
dataset = client.create_dataset(dataset, exists_ok=True)

# Table name in the BigQuery dataset.
table_name = 'maths_problems_1'

query = """
    CREATE OR REPLACE TABLE
      {project}.maths.{table} ( key STRING OPTIONS(description="A unique key for the maths problem"),
    value FLOAT64 OPTIONS(description="Our maths problem" ) );
    INSERT INTO maths.{table}
    VALUES
      ("first_question", 105.00),
      ("second_question", 108.00),
      ("third_question", 1000.00),
      ("fourth_question", 1013.00)
""".format(project=project, table=table_name)

create_job = client.query(query)
create_job.result()
```

<google.cloud.bigquery.table._EmptyRowIterator at 0x7f5694206650>

To read keyed data, use BigQuery as the pipeline source.

```
pipeline_options = PipelineOptions().from_dictionary({'temp_location':f'gs://{bucket}/tmp',
                                                      })
pipeline = beam.Pipeline(options=pipeline_options)

keyed_torch_five_times_model_handler = KeyedModelHandler(torch_five_times_model_handler)

table_name = 'maths_problems_1'
table_spec = f'{project}:maths.{table_name}'

with pipeline as p:
      (
      p
      | "ReadFromBQ" >> beam.io.ReadFromBigQuery(table=table_spec) 
      | "PreprocessData" >> beam.Map(lambda x: (x['key'], x['value']))
      | "ConvertNumpyToTensor" >> beam.Map(lambda x: (x[0], torch.Tensor([x[1]])))
      | "RunInferenceTorch" >> RunInference(keyed_torch_five_times_model_handler)
      | "PostProcessPredictions" >> beam.ParDo(PredictionWithKeyProcessor())
      | beam.Map(print)
      )
```

key: third_question, input: 1000.0 output: 4962.61962890625
key: second_question, input: 108.0 output: 538.472412109375
key: first_question, input: 105.0 output: 523.5929565429688
key: fourth_question, input: 1013.0 output: 5027.0966796875

#### Use a CSV file as the source

Follow these steps to use a CSV file as your source.

Create a CSV file with two columns: one named `key` that holds the keys, and a second named `value` that holds the test values.

```
# creates a CSV file with the values.
csv_values = [("first_question", 105.00),
      ("second_question", 108.00),
      ("third_question", 1000.00),
      ("fourth_question", 1013.00)]
input_csv_file = "./maths_problem.csv"

with open(input_csv_file, 'w') as f:
  writer = csv.writer(f)
  writer.writerow(['key', 'value'])
  for row in csv_values:
    writer.writerow(row)

assert os.path.exists(input_csv_file) == True
```

```
pipeline_options = PipelineOptions().from_dictionary({'temp_location':f'gs://{bucket}/tmp',
                                                      })
pipeline = beam.Pipeline(options=pipeline_options)

keyed_torch_five_times_model_handler = KeyedModelHandler(torch_five_times_model_handler)

with pipeline as p:
  df = p | beam.dataframe.io.read_csv(input_csv_file)
  pc = to_pcollection(df)
  (pc
    | "ConvertNumpyToTensor" >> beam.Map(lambda x: (x[0], torch.Tensor([x[1]])))
    | "RunInferenceTorch" >> RunInference(keyed_torch_five_times_model_handler)
    | "PostProcessPredictions" >> beam.ParDo(PredictionWithKeyProcessor())
    | beam.Map(print)
    )
```

key: first_question, input: 105.0 output: 523.5929565429688
key: second_question, input: 108.0 output: 538.472412109375
key: third_question, input: 1000.0 output: 4962.61962890625
key: fourth_question, input: 1013.0 output: 5027.0966796875

## Pattern 4: Inference with multiple models in the same pipeline

This pattern demonstrates how use inference with multiple models in the same pipeline.

### Multiple models in parallel

This section demonstrates how use inference with multiple models in parallel.

Create a torch model handler for the 10 times model using `PytorchModelHandlerTensor`.

```
torch_ten_times_model_handler = PytorchModelHandlerTensor(state_dict_path=save_model_dir_multiply_ten,
                                        model_class=LinearRegression,
                                        model_params={'input_dim': 1,
                                                      'output_dim': 1}
                                        )
keyed_torch_ten_times_model_handler = KeyedModelHandler(torch_ten_times_model_handler)
```

In this section, the same data is run through two different models: the one that we use to multiply by 5 and a new model that learns to multiply by 10.

```
pipeline_options = PipelineOptions().from_dictionary(
                                      {'temp_location':f'gs://{bucket}/tmp'})

pipeline = beam.Pipeline(options=pipeline_options)

read_from_bq = beam.io.ReadFromBigQuery(table=table_spec)

with pipeline as p:
  multiply_five = (
      p 
      |  read_from_bq
      | "CreateMultiplyFiveTuple" >> beam.Map(lambda x: ('{} {}'.format(x['key'], '* 5'), x['value']))
      | "ConvertNumpyToTensorFiveTuple" >> beam.Map(lambda x: (x[0], torch.Tensor([x[1]])))
      | "RunInferenceTorchFiveTuple" >> RunInference(keyed_torch_five_times_model_handler)
  )
  multiply_ten = (
      p 
      | read_from_bq 
      | "CreateMultiplyTenTuple" >> beam.Map(lambda x: ('{} {}'.format(x['key'], '* 10'), x['value']))
      | "ConvertNumpyToTensorTenTuple" >> beam.Map(lambda x: (x[0], torch.Tensor([x[1]])))
      | "RunInferenceTorchTenTuple" >> RunInference(keyed_torch_ten_times_model_handler)
  )

  inference_result = ((multiply_five, multiply_ten) | beam.Flatten() 
                                 | beam.ParDo(PredictionWithKeyProcessor()))
  inference_result | beam.Map(print)
```

key: third_question * 10, input: 1000.0 output: 9889.59765625
key: second_question * 10, input: 108.0 output: 1075.4891357421875
key: first_question * 10, input: 105.0 output: 1045.84521484375
key: fourth_question * 10, input: 1013.0 output: 10018.0546875
key: third_question * 5, input: 1000.0 output: 4962.61962890625
key: second_question * 5, input: 108.0 output: 538.472412109375
key: first_question * 5, input: 105.0 output: 523.5929565429688
key: fourth_question * 5, input: 1013.0 output: 5027.0966796875

### Multiple models in sequence

This section demonstrates how use inference with multiple models in sequence.

In a sequential pattern, data is sent to one or more models in sequence, with the output from each model chaining to the next model. The following list demonstrates the sequence used in this section.

1.  Read the data from BigQuery.
2.  Map the data.
3.  Use RunInference with the multiply by 5 model.
4.  Process the results.
5.  Use RunInference with the multiply by 10 model.
6.  Process the results.

```
def process_interim_inference(element):
    key, prediction_result = element
    input_value = prediction_result.example
    inference = prediction_result.inference
    formatted_input_value = 'original input is `{} {}`'.format(key, input_value)
    return formatted_input_value, inference


pipeline_options = PipelineOptions().from_dictionary(
                                      {'temp_location':f'gs://{bucket}/tmp'})
pipeline = beam.Pipeline(options=pipeline_options)

with pipeline as p:
  multiply_five = (
      p 
      | beam.io.ReadFromBigQuery(table=table_spec) 
      | "CreateMultiplyFiveTuple" >> beam.Map(lambda x: (x['key'], x['value']))
      | "ConvertNumpyToTensorFiveTuple" >> beam.Map(lambda x: (x[0], torch.Tensor([x[1]])))
      | "RunInferenceTorchFiveTuple" >> RunInference(keyed_torch_five_times_model_handler)
  )

  inference_result = (
    multiply_five 
      | "ExtractResult" >> beam.Map(process_interim_inference) 
      | "RunInferenceTorchTenTuple" >> RunInference(keyed_torch_ten_times_model_handler)
      | beam.ParDo(PredictionWithKeyProcessor())
    )
  inference_result | beam.Map(print)
```

key: original input is `third_question tensor([1000.])`, input: 4962.61962890625 output: 49045.37890625
key: original input is `second_question tensor([108.])`, input: 538.472412109375 output: 5329.11083984375
key: original input is `first_question tensor([105.])`, input: 523.5929565429688 output: 5182.08251953125
key: original input is `fourth_question tensor([1013.])`, input: 5027.0966796875 output: 49682.49609375

Send feedback