from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import google.generativeai as genai
from flask_cors import CORS

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Function to get response from Gemini
def get_gemini_response(input_text):
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(input_text)
    return response.text

@app.route("/analyze", methods=["POST"])
def analyze_operation():
    # Ensure the request is a POST
    if request.method == "POST":
        try:
            # Parse JSON request body
            data = request.json
            if not data or "instruction" not in data:
                return jsonify({"error": "Missing 'instruction' in request body"}), 400

            # Retrieve the instruction from the request
            user_instruction = data["instruction"]

            # Base prompt with user input
            input_text = f"""
Analyze the following instructions and determine the operation type based on CRUD operations (Create, Read, Update, Delete). Respond with specific keywords as outlined below. Focus on distinguishing between operations involving databases, collections, or individual entries, and ensure your response is concise and precise.

1. **Create Operations**:
   - If the instruction is about creating a **database**, respond with "createDatabase".
   - If the instruction is about creating a **collection**, respond with "createCollection".

2. **Insert Operations**:
   - If the instruction is about inserting data into a **specific database and collection**, respond with "insertOperation", followed by the database name and collection name.

3. **Read Operations**:
   - If the instruction is about reading or retrieving data, respond with "readOperation".

4. **Update Operations**:
   - If the instruction is about updating an **entire database**, respond with "updateDatabase".
   - If the instruction is about updating a **collection within a database**, respond with "updateCollection", followed by the database and collection names.
   - If the instruction is about updating a **specific entry or record**, respond with "updateEntry", followed by the database, collection, and entry identifier (if provided). For example, if the update involves changing a field in a specific record, mention the updated field, database name, collection name, and entry identifier.

5. **Delete or Remove Operations**:
   - If the instruction is about removing an **entire database**, respond with "removeDatabase", followed by the database name.
   - If the instruction is about removing a **collection within a database**, respond with "removeCollection", followed by the database and collection names.
   - If the instruction is about removing a **specific entry or record**, respond with "removeEntry", followed by the database, collection, and entry identifier (if provided).

### Instruction to Analyze:
{user_instruction}
"""

            # Get response from Gemini LLM
            response = get_gemini_response(input_text)

            # Return response as JSON
            return jsonify({"response": response.strip()}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid request method"}), 405

if __name__ == "__main__":
    app.run(debug=True)
