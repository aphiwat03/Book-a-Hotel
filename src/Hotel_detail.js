import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Hotel_detail.css';

const HotelDetails = () => {
    const { hotel_id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const goToPaymentPage = () => {
        navigate(`/payment/${hotel_id}`);
      };
    useEffect(() => {
        fetch(`http://localhost:5000/hotel-detail/${hotel_id}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error("Hotel not found");
                    navigate('/search');
                } else {
                    setHotel(data);
                }
            })
            .catch(error => console.error("Error fetching hotel data:", error));
    }, [hotel_id, navigate]);

    const goToHotelForm = () => {
        navigate('/hotelform');
    };

    const goToPayment = () => {
        navigate('/payment'); // นำไปยังหน้า /payment เมื่อคลิกปุ่มชำระเงิน
    };

    if (!hotel) return <p>Loading...</p>;

    return (
        <div>
            <div className="top-bar">
                <Link to="/search" className="back-btn">⬅</Link>
                <Link to="/home" className="logo">Book a hotel</Link>
                <button className="hotel-form-btn" onClick={goToHotelForm}>สนใจเข้าร่วมกับเรา!</button>
            </div>

            <div className="hotel-details">
                <div className="hotel-gallery">
                    {hotel.photo_url && hotel.photo_url.length > 0 ? (
                        hotel.photo_url.map((image, index) => (
                            <img key={index} src={image} alt={`Hotel view ${index + 1}`} className="hotel-image" />
                        ))
                    ) : (
                        <p>No images available</p>
                    )}
                </div>

                <div className="hotel-info">
                    <h2>{hotel.hotel_name}</h2>
                    <p className="location">{hotel.location}</p>

                    <div className="tabs">
                        <button>รายละเอียดที่พัก</button>
                        <button>ห้องพัก</button>
                        <button>สิ่งอำนวยความสะดวก</button>
                    </div>

                    <div className="description">
                        <p>{hotel.description}</p>
                    </div>

                    <h3>สิ่งอำนวยความสะดวก</h3>
                    <ul>
                        {hotel.amenities && hotel.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>

                    <button className="book-button" onClick={goToPaymentPage}>ชำระเงิน</button>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
