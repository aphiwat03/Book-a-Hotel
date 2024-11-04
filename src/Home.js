// src/Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate(); // ใช้ useNavigate สำหรับเปลี่ยนหน้า

    // ฟังก์ชันจัดการการส่งฟอร์ม
    const handleSearch = (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้า
        navigate('/search'); // เปลี่ยนไปหน้า /search
    };

    return (
        <div className="home">
            <div className="top-bar">
                <div className="logo">Book a Hotel</div>
                <div className="auth-buttons">
                    <Link to="/register">
                        <button className="register-btn">ลงทะเบียน</button>
                    </Link>
                    <Link to="/login">
                        <button className="login-btn">เข้าสู่ระบบ</button>
                    </Link>
                </div>
            </div>

            <main className="main-content">
                <section className="intro-section">
                    <h1>เลือกพักโรงแรมที่ต้องการได้เลย</h1>
                </section>
                
                <div className="search-box">
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="form-group">
                            <label>ค้นหา<i className="fas fa-map-marker-alt"></i></label>
                            <input type="text" placeholder="ชื่อเมือง สถานที่ รีสอร์ท" required />
                        </div>
                        <div className="form-group">
                            <label>วันที่<i className="fas fa-calendar-alt"></i></label>
                            <input type="date" required />
                        </div>
                        <div className="form-group">
                            <label>ระยะเวลา<i className="fas fa-moon"></i></label>
                            <input type="number" placeholder="ระยะเวลาที่เข้าพัก/วัน" required />
                        </div>
                        <div className="form-group">
                            <label>จำนวนผู้เข้าพัก<i className="fas fa-user"></i></label>
                            <input type="text" placeholder="ผู้เข้าพักและห้องพัก" required />
                        </div>
                        <button type="submit" className="search-btn"><i className="fas fa-search"></i> ค้นหา</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Home;
