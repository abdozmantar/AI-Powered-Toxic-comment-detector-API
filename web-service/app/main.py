from fastapi import FastAPI,Query
from typing import Annotated
from fastapi.responses import Response
from pydantic import BaseModel
import tensorflow as tf
import numpy as np
import json
import time

class Body(BaseModel):
    comment: Annotated[str , Query(max_length=1024,description="Insert a comment")] = None 

app = FastAPI()

# Load the SavedModel
model = tf.saved_model.load("app/models/v3")

@app.get("/")
async def root():
    return {"message": "Welcome to the HateHound API!"}

@app.post("/predict")
async def predict(comment: Body):
    print("comment: ", comment.comment)
    
    processed_comment = preprocess_comment(comment.comment)
    print("processed_comment: ", processed_comment)
    start_time = time.perf_counter()
    prediction_probs = make_prediction(processed_comment)
    end_time = time.perf_counter() 
    total_time = end_time-start_time
   
    prediction_list = prediction_probs.tolist() 
    data = {
        "comment": comment.comment,
        "duration": total_time,
        "results":{
            "toxic": prediction_list[0] > 0.3,
            "severe_toxic": prediction_list[1] > 0.3,
            "obscene": prediction_list[2] > 0.3,
            "threat": prediction_list[3] > 0.3,
            "insult": prediction_list[4] > 0.3,
            "identity_hate": prediction_list[5] > 0.3,
        },
        "prediction_probs": {
           "toxic": prediction_list[0],
           "severe_toxic": prediction_list[1],
           "obscene": prediction_list[2],
           "threat": prediction_list[3],
           "insult": prediction_list[4],
           "identity_hate": prediction_list[5],
            }
    }
    json_data = json.dumps(data)  # Convert dictionary to JSON string
    return Response(content=json_data, media_type="application/json")

# Function to preprocess the comment
def preprocess_comment(comment):
    char_input_example = split_chars(comment)
    comment_processed = np.array([comment])
    comment_char_processed = np.array([[char_input_example]])

    return [comment_processed, comment_char_processed]

# Function to make prediction using the loaded model
def make_prediction(input_data):
    # Perform inference using the loaded model
    prediction = model(input_data)
    return prediction.numpy()[0]  # Assuming a single output value

def split_chars(text):
    return " ".join(list(text))
