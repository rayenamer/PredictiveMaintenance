# Predictive Maintenance System for Industrial Equipment

![System Architecture](https://ik.imagekit.io/sh09gdtxr/Architecture.png)

## Overview
This project is a predictive maintenance system designed to forecast potential equipment failures in industrial settings. The system combines machine learning models for failure classification and time-series forecasting with a modern web interface to provide actionable insights to maintenance teams.

## Project Structure

```
.
├── App/                               # Backend server and models
│   ├── __pycache__/
│   ├── CleanData.csv                  # Cleaned dataset
│   ├── *.joblib                       # Trained model files
│   ├── database.py                    # Database interaction module
│   └── main.py                        # Backend server
│
├── Client/                            # Frontend Angular application
│   ├── public/
│   ├── src/
│   │   ├── app/                       # Angular components
│   │   ├── environments/              # Environment configs
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── .editorconfig
│   ├── .gitignore
│   ├── angular.json
│   ├── package*.json                  # NPM dependencies
│   └── tsconfig*.json                 # TypeScript configs
│
├── Modeling/                          # Jupyter notebooks for model development
│   ├── *.ipynb                        # Analysis and modeling notebooks
│   ├── *.csv                          # Datasets
│   ├── PieChart02.png                 # Sample visualization
│   └── README.md                      # Modeling documentation
│
├── Architecture.png                   # System architecture diagram
└── README.md                          # This file
```

## Features

1. **Failure Classification**: Predicts the type of potential equipment failure
2. **Time-Series Forecasting**: Anticipates when failures might occur
3. **Maintenance Dashboard**: Visual interface for monitoring equipment health
4. **Data Processing Pipeline**: Cleans and prepares industrial sensor data

## Prerequisites

- Python 3.8+
- Node.js 14+
- Angular CLI
- Jupyter Notebook (for model development)

## Installation

### Backend Setup
1. Navigate to the `App` directory
2. Create a virtual environment: `python -m venv venv`
3. Activate the environment:
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`

### Frontend Setup
1. Navigate to the `Client` directory
2. Install dependencies: `npm install`
3. Configure environment variables in `src/environments/`

## Running the Application

1. Start the backend server:
   ```bash
   cd App
   python main.py
   ```

2. Start the frontend application:
   ```bash
   cd Client
   ng serve
   ```

3. Access the application at `http://localhost:4200`

## Model Development

The `Modeling` directory contains Jupyter notebooks documenting the entire data science workflow:
- Data understanding and preprocessing
- Exploratory data analysis
- Model training and evaluation
- Visualization of results

## System Architecture

The application follows a client-server architecture:
1. **Frontend**: Angular-based web interface
2. **Backend**: Python server with REST API
3. **Models**: Pre-trained machine learning models for predictions
4. **Data Pipeline**: Processes incoming sensor data

![Architecture Diagram](https://ik.imagekit.io/sh09gdtxr/Architecture.png)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

