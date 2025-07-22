import pandas as pd
from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:0000@localhost:5432/PredictiveMaintenance"
engine = create_engine(DATABASE_URL)
def get_data_from_db():
    query = "SELECT * FROM public.work_orders;"  
    return pd.read_sql(query, engine)
