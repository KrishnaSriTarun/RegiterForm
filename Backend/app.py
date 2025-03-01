from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
      host=os.getenv("DB_HOST"),
      user=os.getenv("DB_USER"),
      password=os.getenv("DB_PASSWORD"),
      database=os.getenv("DB_NAME")
)
cursor = db.cursor()

@app.route('/register', methods=['POST'])
def register():
      data = request.json
      query = "INSERT INTO users (name, email, phone, city) VALUES (%s, %s, %s, %s)"
      cursor.execute(query, (data["name"], data["email"], data["phone"], data["city"]))
      db.commit()
      return jsonify({"message": "User registered successfully!"})

if __name__ == '__main__':
      app.run(debug=True)
