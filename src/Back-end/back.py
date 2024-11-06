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
details_collection = db["data_hotel"]
# Setup for file uploads
UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)


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
        return jsonify({"message": "มีemailซ้ำกัน"}), 400

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
def get_hotels():
    hotels = list(hotels_collection.find({}, {'_id': 0}))  # ดึงข้อมูลทุกโรงแรม และไม่แสดง '_id'
    return jsonify(hotels)

@app.route('/add-hotel', methods=['POST'])
def add_hotel():
    try:
        hotel_name = request.json.get('hotel_name')
        location = request.json.get('location')
        description = request.json.get('description')
        rating = request.json.get('rating')
        price = request.json.get('price')
        photo_urls = request.json.get('photo_urls', [])  # รับฟิลด์ photo_urls เป็น array
        amenities = request.json.get('amenities', [])  # รับฟิลด์ amenities เป็น array

        # หาค่า hotel_id ล่าสุดจากฐานข้อมูล
        latest_hotel = hotels_collection.find_one(sort=[("hotel_id", -1)])
        new_hotel_id = latest_hotel["hotel_id"] + 1 if latest_hotel else 1

        # Insert new hotel data
        new_hotel = {
            "hotel_id": new_hotel_id,
            "hotel_name": hotel_name,
            "location": location,
            "description": description,
            "rating": rating,
            "price": price,
            "photo_url": photo_urls,  # ใช้ photo_urls (array) สำหรับหลาย URL
            "amenities": amenities
        }
        hotels_collection.insert_one(new_hotel)
        return jsonify({"message": "เพิ่มโรงแรมสำเร็จ"}), 201
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
    
@app.route('/hotel-detail/<int:hotel_id>', methods=['GET'])
def get_hotel_detail(hotel_id):
    hotel = hotels_collection.find_one({"hotel_id": hotel_id}, {"_id": 0})  # กรอง `_id` ออก
    if hotel:
        return jsonify(hotel), 200
    else:
        return jsonify({"error": "Hotel not found"}), 404

@app.route('/payment', methods=['POST'])
def save_payment():
    try:
        data = request.json
        hotel_id = data.get('hotel_id')  # ID of the selected hotel
        email = data.get('email')
        payment_method = data.get('payment_method')
        amount = data.get('amount')  # Payment amount
        f_name = data.get('f_name')  # First name
        l_name = data.get('l_name')  # Last name
        mobile = data.get('mobile')  # Mobile number
        country_code = data.get('country_code')  # Country code
        
        # Payment data to store in MongoDB
        payment_data = {
            "hotel_id": hotel_id,
            "email": email,
            "f_name": f_name,
            "l_name": l_name,
            "mobile": mobile,
            "country_code": country_code
        }
        
        # Insert payment data into the 'payment' collection
        db.payment.insert_one(payment_data)
        return jsonify({"message": "Payment saved successfully"}), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)
