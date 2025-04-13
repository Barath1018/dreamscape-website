from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os 
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # or use: CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = "gemini-1.5-pro-001"
url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={API_KEY}"

@app.route('/api/generate', methods=['POST'])
def generate():
    user_prompt = request.json.get('prompt')

    # Refine the prompt to enforce short and organized formatting
    prompt = (
        f"You are a dream interpretation expert AI. Analyze this dream:\n\n"
        f"{user_prompt}\n\n"
        "Respond concisely in this structure:\n"
        "Core Meaning: Brief summary of what the dream might mean.\n"
        "Symbol Breakdown: List major symbols with their meanings.\n"
        "Advice: Give 1-2 lines of practical advice based on the dream.\n"
        "Do not use asterisks, markdown, or special characters. Use only plain text."
    )

    data = {
        "contents": [
            {"parts": [{"text": prompt}]}
        ]
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        try:
            response_json = response.json()
            if "candidates" in response_json and response_json["candidates"]:
                output_text = response_json["candidates"][0]["content"]["parts"][0]["text"]
                return jsonify({"insight": output_text})
            else:
                return jsonify({"error": "No candidates found."}), 500
        except:
            return jsonify({"error": "Unexpected format."}), 500
    else:
        return jsonify({"error": "API error", "details": response.text}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)