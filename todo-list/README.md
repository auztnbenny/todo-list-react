# To-Do List Application

A simple full-stack to-do list application using Flask for the backend and ReactJS for the frontend.

## Installation

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/<your-username>/<your-repo-name>.git
    cd <your-repo-name>
    ```

2. Navigate to the backend directory:
    ```bash
    cd backend
    ```

3. Create and activate a virtual environment:
    - **On Windows:**
      ```bash
      python -m venv venv
      venv\Scripts\activate
      ```
    - **On macOS/Linux:**
      ```bash
      python3 -m venv venv
      source venv/bin/activate
      ```

4. Install the required packages:
    ```bash
    pip install flask flask-cors
    ```

5. Run the Flask app:
    ```bash
    python app.py
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the React app:
    ```bash
    npm start
    ```

## Usage

1. Ensure the Flask backend is running on `http://127.0.0.1:5000`.
2. Ensure the React frontend is running on `http://localhost:3000`.
3. Open your web browser and navigate to `http://localhost:3000` to use the application.
4. Use the interface to add, view, edit, and delete tasks.

## API Documentation

### Get All Tasks

- **URL**: `/tasks`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "task": "Sample task description"
    }
  ]
