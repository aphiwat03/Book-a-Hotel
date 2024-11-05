from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
import os
from werkzeug.utils import secure_filename

# Connect to MongoDB
uri = "mongodb+srv://beer:beer35208@cluster0.tpdygsy.mongodb.net/"
client = MongoClient(uri)
db = client['Hotel']
users_collection = db['data_user']
hotels_collection = db['data_hotel']
booking_collection = db['booking']

# Setup for file uploads
UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

# Endpoints

@app.route("/")
def greet():
    return "<p>Welcome to Hotel Management System</p>"

@app.route('/register', methods=['POST'])
def register_user():
    # Handle user registration
    data = request.json  
    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = {
        "full_name": full_name,
        "email": email,
        "password": hashed_password.decode('utf-8'),
        "confirm_password": confirm_password
    }
    users_collection.insert_one(new_user)
    return jsonify({"message": "Registration successful"}), 201

@app.route('/latest-hotel-id', methods=['GET'])
def get_latest_hotel_id():
    # Retrieve the latest hotel ID for autoincrement
    latest_hotel = hotels_collection.find_one(sort=[("hotel_id", -1)])
    latest_id = latest_hotel["hotel_id"] if latest_hotel else 0
    return jsonify({"latest_hotel_id": latest_id}), 200

@app.route('/hotels', methods=['GET'])
def get_all_hotels():
    # ดึงข้อมูลจาก MongoDB รวมถึง field 'price'
    hotels = list(hotels_collection.find({}, {
        "_id": 0,
        "hotel_id": 1,
        "hotel_name": 1,
        "location": 1,
        "description": 1,
        "rating": 1,
        "photo_url": 1,
        "price": 1  # เพิ่ม field 'price' ให้แน่ใจว่าเรียกข้อมูลได้
    }))
    return jsonify(hotels), 200


@app.route('/add-hotel', methods=['POST'])
def add_hotel():
    # Handle new hotel addition
    try:
        hotel_name = request.form.get('hotel_name')
        location = request.form.get('location')
        description = request.form.get('description')
        rating = request.form.get('rating')
        price = request.form.get('price')  # เพิ่มการรับค่า price จากฟอร์ม

        # Handle photo upload
        photo = request.files.get('photo')
        photo_url = None
        if photo:
            filename = secure_filename(photo.filename)
            photo_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            photo.save(photo_path)
            photo_url = photo_path

        # Insert new hotel data
        new_hotel = {
            "hotel_name": hotel_name,
            "location": location,
            "description": description,
            "rating": rating,
            "price": price,  # เพิ่มฟิลด์ price ในข้อมูลที่บันทึกลงฐานข้อมูล
            "photo_url": photo_url
        }
        hotels_collection.insert_one(new_hotel)
        return jsonify({"message": "เพิ่มโรมแรมสำเร็จ"}), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login_user():
    # Handle user login
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({"email": email}, {"_id": 0, "email": 1, "password": 1})

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 400

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)
