from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
import time

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)

# For security, you can set your API key as an environment variable
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

def call_gemini(prompt, max_retries=5):
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [
            {"parts": [{"text": prompt}]}
        ]
    }
    delay = 2  # start with 2 seconds
    for attempt in range(max_retries):
        response = requests.post(GEMINI_API_URL, json=data, headers=headers)
        if response.ok:
            try:
                return response.json()["candidates"][0]["content"]["parts"][0]["text"]
            except Exception:
                return "Unexpected response format from Gemini API."
        elif response.status_code == 503:
            if attempt < max_retries - 1:
                time.sleep(delay)
                delay *= 2  # exponential backoff
            else:
                return f"Error: Model overloaded after {max_retries} attempts."
        else:
            return f"Error: {response.text}"

@app.route('/plan', methods=['POST'])
def plan():
    data = request.json
    context = data.get('context')
    timeframe = data.get('timeframe')

    # 1. Tech Stack Recommendation
    tech_stack_prompt = f"Suggest the ideal tech stack for a project: {context}, timeframe: {timeframe}.limit the content to max 100 words"
    time.sleep(1)
    tech_stack = call_gemini(tech_stack_prompt)

    # 2. Project Evaluation
    eval_prompt = f"Evaluate this project: {context}, timeframe: {timeframe}. Provde a Rating 1-10 based on the idea, the real world use case, and executability.Give only a number. Don't generate texts. "
    time.sleep(1)
    evaluation = call_gemini(eval_prompt)

    # 3. Weekly Plan Generation
    weekly_plan_prompt =f"Break down this project into a week-by-week execution plan. For each week, use the heading 'Week n' and list that week's tasks as bullet points. Project: {context}, Timeframe: {timeframe} week(s).limit the content to max 100 words"

    time.sleep(1)
    weekly_plan = call_gemini(weekly_plan_prompt)

    # 4. Project Overview & Strategic Approach
    overview_prompt = f"Provide a complete roadmap in bullet points and strategic approach for: {context}, timeframe: {timeframe}.limit to 10 points.limit the content to maximum 100 words."
    time.sleep(1)
    overview = call_gemini(overview_prompt)

    return jsonify({
        "tech_stack": tech_stack,
        "evaluation": evaluation,
        "weekly_plan": weekly_plan,
        "overview": overview
    })

if __name__ == '__main__':
    app.run(debug=True) 