# 🛠️ Predictive Maintenance System

This repository contains a comprehensive suite of machine learning models designed for equipment failure analysis and predictive maintenance optimization.

## 📊 Model Overview

| Model | Type | Purpose | Best Performing Algorithm | Performance Metric |
|-------|------|---------|---------------------------|--------------------|
| 1️⃣ Failure Date Prediction | Supervised Regression | Predict when failure will occur | CatBoost Regressor | R²: 95% |
| 2️⃣ Failure Classification | Supervised Classification | Identify equipment likely to fail | Random Forest Classifier | Accuracy: 94% |
| 3️⃣ Failure Trend Forecasting | Time Series Forecasting | Predict system-level failure rates | LSTM | MAE: 6% |
| 4️⃣ Failure Cause Clustering | Unsupervised Learning | Group similar failure causes | K-means + LDA | Silhouette: 0.52 |
| 5️⃣ Failure Similarity Matching | NLP Embeddings | Find similar historical failures | BERT | Cosine Similarity: 0.80 |

## 🧠 Detailed Model Descriptions

### 1️⃣ Failure Date Prediction (`when_fail.py`)
**Purpose:** Predict exact failure dates for proactive maintenance scheduling  
**Features:**  
- Uses equipment age, usage metrics, environmental conditions  
- Regression approach with temporal forecasting  
**Implementation:**  
```python
from catboost import CatBoostRegressor
model = CatBoostRegressor(iterations=500, learning_rate=0.1, depth=6)
model.fit(X_train, y_train)
```

### 2️⃣ Failure Classification (`will_fail.py`)
**Purpose:** Binary classification of equipment failure risk  
**Features:**  
- Same input features as Model 1  
- Outputs probability of failure  
**Implementation:**  
```python
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=200, max_depth=10)
model.fit(X_train, y_train)
```

### 3️⃣ Failure Trend Forecasting (`trend_forecast.py`)
**Purpose:** Predict failure rates over time for resource planning  
**Features:**  
- Time-series analysis of aggregated failure counts  
- Handles seasonal patterns  
**Implementation:**  
```python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
model = Sequential()
model.add(LSTM(50, activation='relu', input_shape=(n_steps, n_features)))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mse')
```

### 4️⃣ Failure Cause Clustering (`cause_clusters.py`)
**Purpose:** Uncover root causes from maintenance logs  
**Features:**  
- NLP processing of free-text reports  
- Topic modeling for interpretable clusters  
**Implementation:**  
```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation
tfidf = TfidfVectorizer(max_df=0.95, min_df=2)
lda = LatentDirichletAllocation(n_components=5)
```

### 5️⃣ Failure Similarity Matching (`similar_failures.py`)
**Purpose:** Find similar historical failure cases  
**Features:**  
- Semantic similarity comparison  
- Pre-trained language model embeddings  
**Implementation:**  
```python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('bert-base-nli-mean-tokens')
embeddings = model.encode(failure_descriptions)
```

## 🚀 Getting Started

1. Install requirements:
```bash
pip install -r requirements.txt
```

2. Run individual models:
```bash
python models/when_fail.py --data equipment_data.csv
```

3. Or run the full pipeline:
```bash
python main.py --mode full_analysis
```

## 📈 Expected Outcomes

- 30-50% reduction in unplanned downtime
- 20-35% improvement in maintenance efficiency
- 15-25% decrease in maintenance costs
- Actionable insights from historical failure patterns

## 🤝 Contributing

Pull requests welcome! Please follow the contribution guidelines in CONTRIBUTING.md.

## 📜 License

MIT License - see LICENSE file for details
