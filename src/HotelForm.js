import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HotelForm.css';

function HotelForm() {
    const [hotelData, setHotelData] = useState({
        hotel_id: '',
        hotel_name: '',
        location: '',
        description: '',
        rating: '',
        price: '',   // เพิ่มฟิลด์ราคา
        photo: null
    });

    // Fetch the latest hotel ID from the backend when the component loads
    useEffect(() => {
        fetch('http://localhost:5000/latest-hotel-id')
            .then((response) => response.json())
            .then((data) => {
                const newHotelId = data.latest_hotel_id + 1;  // Increment hotel_id
                setHotelData((prevData) => ({ ...prevData, hotel_id: newHotelId }));
            })
            .catch((error) => {
                console.error("Error fetching latest hotel ID:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotelData({ ...hotelData, [name]: value });
    };

    const handleFileChange = (e) => {
        setHotelData({ ...hotelData, photo: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('hotel_id', hotelData.hotel_id);
        formData.append('hotel_name', hotelData.hotel_name);
        formData.append('location', hotelData.location);
        formData.append('description', hotelData.description);
        formData.append('rating', hotelData.rating);
        formData.append('price', hotelData.price);  // เพิ่มฟิลด์ราคา
        formData.append('photo', hotelData.photo);  // Add the photo file

        fetch('http://localhost:5000/add-hotel', {
            method: 'POST',
            body: formData
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to save hotel data');
            }
            return response.json();
        })
        .then((data) => {
            console.log("Hotel data saved successfully:", data);
            alert("บันทึกข้อมูลโรงแรมสำเร็จ!");
        })
        .catch((error) => {
            console.error("Error saving hotel data:", error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูลโรงแรม");
        });
    };

    return (
        <div>
           <div className="top-bar">
                <Link to="/search" className="back-btn">⬅</Link>
                <Link to="/home" className="logo">Book a hotel</Link>
            </div>

            <div className="hotel-form-container">
                <h2>กรอกข้อมูลโรงแรม</h2>
                <form onSubmit={handleSubmit} className="hotel-form">
                    <div className="form-group">
                        <label htmlFor="hotel_name">ชื่อโรงแรม</label>
                        <input type="text" name="hotel_name" id="hotel_name" value={hotelData.hotel_name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">ที่ตั้ง</label>
                        <input type="text" name="location" id="location" value={hotelData.location} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">คำอธิบาย</label>
                        <textarea name="description" id="description" value={hotelData.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">ราคา</label> {/* ช่องสำหรับกรอกราคา */}
                        <input type="number" name="price" id="price" value={hotelData.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">รูปภาพ</label>
                        <input type="file" name="photo" id="photo" onChange={handleFileChange} accept="image/*" />
                    </div>
                    <button type="submit" className="submit-btn">บันทึกข้อมูลโรงแรม</button>
                </form>
            </div>
        </div>
    );
}

export default HotelForm;
