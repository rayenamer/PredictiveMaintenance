from fastapi import FastAPI
import pandas as pd
from joblib import load
from database import get_data_from_db
from catboost import Pool
from sklearn.preprocessing import OrdinalEncoder

app = FastAPI()
PredictDate = load("DatePrediction.joblib")
FailurePrediction = load("FailureClassification.joblib")
TimeSeries = load("TimeSeriesForecasting.joblib")

@app.get("/PredictTimeSeries")
def predictTimeSeries():
    datelist = pd.date_range(start="2022-03-04", end="2024-04-01")
    data_forecast = pd.DataFrame(datelist, columns=['Date'])
    forecast = TimeSeries.predict(360)
    forecast = forecast.reset_index()
    forecast['Date'] = datelist
    return {"predictions": forecast.to_dict(orient="records")}

@app.get("/predict")
def predictDate():
    df = get_data_from_db()
    # Rename columns to match training
    df = df.rename(columns={
        'ordre_travail': 'Ordre de travail',
        'description': 'Description',
        'equipment': 'Equipment',
        'nom_equipement': 'Nom Equipement',
        'noeud_parent': 'Noeud Parent',
        'nom_parent': 'Nom_parent',
        'type_ot': 'Type OT',
        'date_fin': 'Date Fin',
        'date_enreg': 'date_enreg',
        # add more if needed
    })
    # Convert date columns to ordinal
    for col in ['Date Fin', 'date_enreg']:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors='coerce').apply(lambda x: x.toordinal() if pd.notnull(x) else None)
    # Ensure all categorical features are string
    cat_features = ['Ordre de travail', 'Description', 'Equipment', 'Nom Equipement', 'Noeud Parent', 'Nom_parent', 'Type OT']
    for col in cat_features:
        if col in df.columns:
            df[col] = df[col].astype(str)
    # Select and order columns as in training
    feature_cols = ['Ordre de travail', 'Description', 'Equipment', 'Nom Equipement', 'Noeud Parent', 'Nom_parent', 'Date Fin', 'Type OT', 'day_diff', 'date_enreg']
    X = df[feature_cols]
    # Prepare features for classification (failure cause)
    X_class = X.copy()
    cat_cols = X_class.select_dtypes(include=['object']).columns
    encoder = OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)
    if len(cat_cols) > 0:
        X_class[cat_cols] = encoder.fit_transform(X_class[cat_cols])
    class_preds = FailurePrediction.predict(X_class)
    return {
        "CausePredictions": class_preds.tolist() if hasattr(class_preds, 'tolist') else list(class_preds)
    }

@app.get("/predict_cause")
def predictCause():
    df = get_data_from_db()
    # Rename columns to match training
    df = df.rename(columns={
        'ordre_travail': 'Ordre de travail',
        'description': 'Description',
        'equipment': 'Equipment',
        'nom_equipement': 'Nom Equipement',
        'noeud_parent': 'Noeud Parent',
        'nom_parent': 'Nom_parent',
        'type_ot': 'Type OT',
        'date_fin': 'Date Fin',
        'date_enreg': 'date_enreg',
        # add more if needed
    })
    # Convert date columns to ordinal
    for col in ['Date Fin', 'date_enreg']:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors='coerce').apply(lambda x: x.toordinal() if pd.notnull(x) else None)
    # Ensure all categorical features are string
    cat_features = ['Ordre de travail', 'Description', 'Equipment', 'Nom Equipement', 'Noeud Parent', 'Nom_parent', 'Type OT']
    for col in cat_features:
        if col in df.columns:
            df[col] = df[col].astype(str)
    # Select and order columns as in training
    feature_cols = ['Ordre de travail', 'Description', 'Equipment', 'Nom Equipement', 'Noeud Parent', 'Nom_parent', 'Date Fin', 'Type OT', 'day_diff', 'date_enreg']
    X = df[feature_cols]
    # Prepare features for classification (failure cause)
    X_class = X.copy()
    cat_cols = X_class.select_dtypes(include=['object']).columns
    encoder = OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)
    if len(cat_cols) > 0:
        X_class[cat_cols] = encoder.fit_transform(X_class[cat_cols])
    class_preds = FailurePrediction.predict(X_class)
    return {
        "CausePredictions": class_preds.tolist() if hasattr(class_preds, 'tolist') else list(class_preds)
    }

@app.get("/loadingdata")
def loadingData():
    df = get_data_from_db()
    return df.to_dict(orient="records")

@app.get("/SeePrepData")
def PrepareData():
    df = get_data_from_db()
    # Drop columns using the correct names (case-sensitive)
    data = df.drop(
        columns=[
            'year1', 'year2', 'year3', 'day_diff', 'classification_equipement',
            'date_enregistrement', 'date_fin', 'date_enreg', 'Classification_Equipement'
        ],
        errors="ignore"
    )
    # Convert and add ordinal date columns if present
    if 'date_enregistrement' in df.columns:
        data['date_enregistrement'] = pd.to_datetime(df['date_enregistrement']).apply(lambda x: x.toordinal())
    if 'date_fin' in df.columns:
        data['date_fin'] = pd.to_datetime(df['date_fin']).apply(lambda x: x.toordinal())
    if 'date_enreg' in df.columns:
        data['date_enreg'] = pd.to_datetime(df['date_enreg']).apply(lambda x: x.toordinal())
    return data.to_dict(orient="records")


@app.get("/predict_cause")
def predictCause():
    df = get_data_from_db()
    # Rename columns to match training
    df = df.rename(columns={
        'ordre_travail': 'Ordre de travail',
        'description': 'Description',
        'equipment': 'Equipment',
        'nom_equipement': 'Nom Equipement',
        'noeud_parent': 'Noeud Parent',
        'nom_parent': 'Nom_parent',
        'type_ot': 'Type OT',
        'date_fin': 'Date Fin',
        'date_enreg': 'date_enreg',
        # add more if needed
    })
    # Convert date columns to ordinal
    for col in ['Date Fin', 'date_enreg']:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors='coerce').apply(lambda x: x.toordinal() if pd.notnull(x) else None)
    # Ensure all categorical features are string
    cat_features = ['Ordre de travail', 'Description', 'Equipment', 'Nom Equipement', 'Noeud Parent', 'Nom_parent', 'Type OT']
    for col in cat_features:
        if col in df.columns:
            df[col] = df[col].astype(str)
    # Select and order columns as in training
    feature_cols = ['Ordre de travail', 'Description', 'Equipment', 'Nom Equipement', 'Noeud Parent', 'Nom_parent', 'Date Fin', 'Type OT', 'day_diff', 'date_enreg']
    X = df[feature_cols]
    # Prepare features for classification (failure cause)
    X_class = X.copy()
    cat_cols = X_class.select_dtypes(include=['object']).columns
    encoder = OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)
    if len(cat_cols) > 0:
        X_class[cat_cols] = encoder.fit_transform(X_class[cat_cols])
    class_preds = FailurePrediction.predict(X_class)
    return {
        "CausePredictions": class_preds.tolist() if hasattr(class_preds, 'tolist') else list(class_preds)
    }