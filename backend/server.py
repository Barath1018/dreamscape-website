from flask import Flask, request, jsonify
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
import requests as http_requests  # avoid conflict with Flask requests
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # allow frontend calls

# Get API key from .env
API_KEY = os.getenv("API_KEY")
MODEL_NAME = "gemini-1.5-pro-001"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={API_KEY}"

# ------------------ DREAM ANALYSIS ENDPOINT ------------------ #
@app.route('/api/generate', methods=['POST'])
def generate():
    user_prompt = request.json.get('prompt')

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

    response = http_requests.post(GEMINI_URL, json=data, headers=headers)

    if response.status_code == 200:
        try:
            response_json = response.json()
            if "candidates" in response_json and response_json["candidates"]:
                output_text = response_json["candidates"][0]["content"]["parts"][0]["text"]
                return jsonify({"insight": output_text})
            else:
                return jsonify({"error": "No candidates found."}), 500
        except Exception as e:
            return jsonify({"error": "Unexpected format.", "details": str(e)}), 500
    else:
        return jsonify({"error": "API error", "details": response.text}), response.status_code

# ------------------ GOOGLE LOGIN ENDPOINT ------------------ #
@app.route('/api/google-auth', methods=['POST'])
def google_auth():
    try:
        token = request.json['token']
        idinfo = id_token.verify_oauth2_token(token, grequests.Request(), API_KEY)

        user_info = {
            "name": idinfo.get("name"),
            "email": idinfo.get("email"),
            "picture": idinfo.get("picture")
        }
        return jsonify({"message": "Login successful", "user": user_info})
    except ValueError as e:
        return jsonify({"error": "Token invalid", "details": str(e)}), 400

# ------------------ SIGNUP (MOCK) ------------------ #
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    print(f"[SIGNUP] Email: {email}, Password: {password}")  # mock storage
    return jsonify({"message": "Signup successful"})

# ------------------ MAIN ------------------ #
if __name__ == '__main__':
    app.run(debug=True)
