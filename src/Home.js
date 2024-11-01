// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <header className="header">
                <div className="logo-container">
                    <div className="logo">Book a Hotel</div>
                </div>
                <div className="auth-buttons">
                    <Link to="/register">
                        <button className="register-btn">ลงทะเบียน</button>
                    </Link>
                    <Link to="/login">
                        <button className="login-btn">เข้าสู่ระบบ</button>
                    </Link>
                </div>
            </header>

            {/* เพิ่มส่วนแยกเนื้อหา */}
            <section className="intro-section">
                <h1>เลือกพักโรงแรมที่ต้องการได้เลย</h1>
            </section>

            <main className="main-content">
                <div className="search-box">
                    <form action="#" className="search-form">
                        <div className="form-group">
                            <label><i className="fas fa-map-marker-alt"></i></label>
                            <input type="text" placeholder="ชื่อเมือง สถานที่ รีสอร์ท" required />
                        </div>
                        <div className="form-group">
                            <label><i className="fas fa-calendar-alt"></i></label>
                            <input type="date" required />
                        </div>
                        <div className="form-group">
                            <label><i className="fas fa-moon"></i></label>
                            <input type="number" placeholder="ระยะเวลาที่เข้าพัก/วัน" required />
                        </div>
                        <div className="form-group">
                            <label><i className="fas fa-user"></i></label>
                            <input type="text" placeholder="ผู้เข้าพักและห้องพัก" required />
                        </div>
                        <button type="submit" className="search-btn"><i className="fas fa-search"></i> ค้นหา</button>
                    </form>
                    <a href="#" className="payment-link"><i className="fas fa-concierge-bell"></i> ชำระเงินที่โรงแรม</a>
                </div>
            </main>
        </div>
    );
}

export default Home;
