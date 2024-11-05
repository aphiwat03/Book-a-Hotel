import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Hotel_detail.css';

const HotelDetails = () => {
    const navigate = useNavigate();

    const goToHotelForm = () => {
        navigate('/hotelform'); // Define the goToHotelForm function to navigate to the hotel form page
    };

    const hotel = {
        name: "โรงแรมแอมเบอร์ พัทยา (Hotel Amber Pattaya)",
        location: "309/1-2 หมู่ 10 อำเภอบางละมุง, พัทยา, ไทย, 20150",
        rating: 7.9,
        images: [
            "https://www.charnveeresortkhaoyai.com/wp-content/uploads/2023/12/Rancho-Dec-1-%E0%B8%97%E0%B8%B0%E0%B9%80%E0%B8%A5%E0%B8%97%E0%B8%B5%E0%B9%88-%E0%B8%AA%E0%B8%A7%E0%B8%A2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B9%83%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2-02-1536x1024.jpg.webp",
            "https://cf2.bstatic.com/xdata/images/hotel/max1024x768/273541519.jpg?k=2d99e72b059ba45c3b1437ee744fb4b97cf575a0d311f148a572c0b1cf1fb6f4&o=&hp=1",
            "https://cf2.bstatic.com/xdata/images/hotel/max1024x768/273542335.jpg?k=7b2c97822d852c2b3403585865f58e6c70b2dacc41dcdef92c2f3891a3ae2ef5&o=&hp=1",
            "https://cf2.bstatic.com/xdata/images/hotel/max1024x768/273540570.jpg?k=013a78afae67616dd0a2f8a2e51623b3a0cab8e97b5b61c46bf6da6319f3c254&o=&hp=1",
        ],
        description: `โรงแรมแอมเบอร์ พัทยา มีสระว่ายน้ำกลางแจ้ง ซาวน่า และห้องอาหาร ห้องพักมีระบบควบคุมอุณหภูมิและระเบียงส่วนตัว มีบริการรูมเซอร์วิส ห้องซาวน่า และฟิตเนสที่ทันสมัย โรงแรมแอมเบอร์ พัทยาให้ความสะดวกสบายให้ผู้เข้าพักในทุกความต้องการ`,
        amenities: ["สระว่ายน้ำ", "ฟิตเนส", "รูมเซอร์วิส", "ห้องอาหาร", "Wi-Fi ฟรี"]
    };

    const reviews = [
        {
            user: "John Doe",
            date: "2024-10-01",
            rating: 4,
            comment: "ที่พักสะอาดและบริการดีมาก พนักงานเป็นกันเอง"
        },
        {
            user: "Jane Smith",
            date: "2024-10-05",
            rating: 5,
            comment: "สถานที่เงียบสงบและสะดวกสบาย อาหารเช้าอร่อยมาก"
        },
        {
            user: "Alice Johnson",
            date: "2024-10-10",
            rating: 3,
            comment: "ห้องพักสวย แต่มีปัญหาน้ำรั่วเล็กน้อยในห้องน้ำ"
        }
    ];

    return (
        <div>
            <div className="top-bar">
                <Link to="/search" className="back-btn">⬅</Link>
                <Link to="/home" className="logo">Book a hotel</Link>
                <button className="hotel-form-btn" onClick={goToHotelForm}>สนใจเข้าร่วมกับเรา!</button>
            </div>
            
            <div className="hotel-details">
                <div className="hotel-gallery">
                    {hotel.images.map((image, index) => (
                        <img key={index} src={image} alt={`Hotel view ${index + 1}`} className="hotel-image" />
                    ))}
                </div>

                <div className="hotel-info">
                    <h2>{hotel.name}</h2>
                    <p className="location">{hotel.location}</p>
                    <div className="rating">
                        <span>Rating:</span>
                        <strong>{hotel.rating}</strong>
                    </div>

                    <div className="tabs">
                        <button>รายละเอียดที่พัก</button>
                        <button>ห้องพัก</button>
                        <button>สิ่งอำนวยความสะดวก</button>
                        <button>รีวิว</button>
                    </div>

                    <div className="description">
                        <p>{hotel.description}</p>
                    </div>

                    <h3>สิ่งอำนวยความสะดวก</h3>
                    <ul>
                        {hotel.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>

                    <button className="book-button">ดูประเภทห้องพัก</button>
                </div>

                <div className="hotel-info reviews-section"> {/* ใช้สไตล์เดียวกัน */}
                    <h3>รีวิว</h3>
                    {reviews.map((review, index) => (
                        <div key={index} className="review">
                            <p><strong>{review.user}</strong> ({review.date})</p>
                            <p>Rating: {review.rating} ★</p>
                            <p>{review.comment}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
