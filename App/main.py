from fastapi import FastAPI
import pandas as pd
from joblib import load
from database import get_data_from_db, save_output_to_db

app = FastAPI()
PredictDate = load("DatePrediction.joblib")
FailurePrediction = load("FailurePrediction.joblib")
TimeSeries = load("TimeSeriesForecasting.joblib")
@app.get("/predict")
def predictDate():
     # 1. Load data from DB
    df = get_data_from_db()

    return "Fetching data from the database..."
