import React, { useState, useEffect } from 'react';
import './HotelForm.css';
import { Link, useNavigate } from 'react-router-dom';

function HotelForm() {
    const [hotelData, setHotelData] = useState({
        hotel_id: '',
        hotel_name: '',
        location: '',
        description: '',
        rating: '',
        price: '',
        photo_urls: ['', '', '', '', ''], // เก็บ 5 รูปใน array
        amenities: []
    });

    const navigate = useNavigate();

    const [amenity, setAmenity] = useState(''); // รักษาค่าของสิ่งอำนวยความสะดวกที่เพิ่มใหม่

    // Fetch the latest hotel ID from the backend when the component loads
    useEffect(() => {
        fetch('http://localhost:5000/latest-hotel-id')
            .then((response) => response.json())
            .then((data) => {
                const newHotelId = data.latest_hotel_id + 1;
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

    const handlePhotoUrlChange = (index, value) => {
        const newPhotoUrls = [...hotelData.photo_urls];
        newPhotoUrls[index] = value;
        setHotelData({ ...hotelData, photo_urls: newPhotoUrls });
    };

    const handleAmenityChange = (e) => {
        setAmenity(e.target.value);
    };

    const addAmenity = () => {
        if (amenity) {
            setHotelData((prevData) => ({
                ...prevData,
                amenities: [...prevData.amenities, amenity]
            }));
            setAmenity(''); // รีเซ็ตช่องป้อนข้อมูล
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // เตรียมข้อมูลให้มีชื่อฟิลด์ที่ตรงกับ backend
        const payload = {
            ...hotelData,
            photo_url: hotelData.photo_urls // เปลี่ยนชื่อฟิลด์จาก photo_urls เป็น photo_url
        };
    
        fetch('http://localhost:5000/add-hotel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
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
            navigate('/search'); // นำทางไปยังหน้า /search หลังจากบันทึกสำเร็จ
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
                        <label htmlFor="price">ราคา</label>
                        <input type="number" name="price" id="price" value={hotelData.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amenities">สิ่งอำนวยความสะดวก</label>
                        <input type="text" name="amenity" id="amenity" value={amenity} onChange={handleAmenityChange} placeholder="เพิ่มสิ่งอำนวยความสะดวก" />
                        <button type="button" onClick={addAmenity}>เพิ่ม</button>
                        <ul>
                            {hotelData.amenities.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="form-group">
                        <label>URL รูปภาพ (สูงสุด 5 รูป)</label>
                        {hotelData.photo_urls.map((url, index) => (
                            <input
                                key={index}
                                type="text"
                                value={url}
                                onChange={(e) => handlePhotoUrlChange(index, e.target.value)}
                                placeholder={`URL รูปภาพ ${index + 1}`}
                                required
                            />
                        ))}
                    </div>
                    <button type="submit" className="submit-btn">บันทึกข้อมูลโรงแรม</button>
                </form>
            </div>
        </div>
    );
}

export default HotelForm;
