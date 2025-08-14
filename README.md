# AI Project Planner

AI Project Planner is a web application that helps you plan and evaluate software project ideas using AI. Enter your project idea and desired timeframe, and get a tech stack recommendation, uniqueness rating, weekly execution plan, and a strategic project overview.

## Features

- **Tech Stack Recommendation:** Get a tailored stack for your project.
- **Uniqueness Meter:** See how unique and executable your idea is.
- **Weekly Execution Plan:** Receive a week-by-week breakdown.
- **Project Overview:** Get a concise roadmap and strategy.

## Project Structure

```
backend/
  app.py
  requirements.txt
  .env
frontend/
  package.json
  postcss.config.js
  tailwind.config.js
  public/
    index.html
  src/
    App.js
    index.js
    index.css
    Logo.js
    logo.svg
    star.png
    components/
      InputForm.js
      ResultsDisplay.js
```


### Prerequisites

- Node.js (v16+ recommended)
- Python 3.8+
- [Google Gemini API key](https://ai.google.dev/)

### Setup

#### 1. Backend

1. Go to the `backend` directory:

   ```sh
   cd backend
   ```

2. Install dependencies:

   ```sh
   pip install -r requirements.txt
   ```

3. Set your Gemini API key in `.env`:

   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the backend server:

   ```sh
   python app.py
   ```

   The backend will run on `http://localhost:5000`.

#### 2. Frontend

1. Go to the `frontend` directory:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:

   ```sh
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

## Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Enter your project idea and select the number of weeks.
3. Submit to receive your AI-generated project plan.

## Technologies Used

- **Frontend:** React, Tailwind CSS, React Toastify
- **Backend:** Flask, Flask-CORS, Requests
- **AI:** Google Gemini API
