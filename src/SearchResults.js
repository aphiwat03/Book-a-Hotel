import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SearchResults.css';

function SearchResults() {
    const [hotels, setHotels] = useState([]);
    const [guests, setGuests] = useState(1);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [priceRange, setPriceRange] = useState(50000);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/hotels')
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched hotel data:", data); // ตรวจสอบข้อมูลที่ดึงมา
                setHotels(data); 
            })
            .catch((error) => {
                console.error("Error fetching hotels:", error);
            });
    }, []);
    

    const handleSearch = () => {
        console.log("Searching hotels with:", { guests, checkInDate, checkOutDate, priceRange });
    };

    const handlePriceChange = (e) => {
        setPriceRange(e.target.value);
    };

    const goToHotelForm = () => {
        navigate('/hotelform');
    };

    const goToHotelDetail = (hotelId) => {
        navigate(`/hoteldetail/${hotelId}`);
    };

    return (
        <div>
            <div className="top-bar">
                <Link to="/home" className="back-btn">⬅</Link>
                <Link to="/home" className="logo">Book a hotel</Link>
                <button className="hotel-form-btn" onClick={goToHotelForm}>สนใจเข้าร่วมกับเรา!</button>
            </div>

            <div className="container">
                <div className="results-section">
                    {hotels.map((hotel) => (
                        <div key={hotel.hotel_id} className="result-card" onClick={() => goToHotelDetail(hotel.hotel_id)}>
                            <img src={hotel.photo_url} alt={hotel.hotel_name} />
                            <div className="result-card-content">
                                <h4>{hotel.hotel_name}</h4>
                                <p>{hotel.location}</p>
                                <p className="price">Price: {hotel.price} ฿</p> {/* แสดงราคาแทนเรตติ้ง */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchResults;
