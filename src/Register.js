import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import './Home.css';

function Register() {
    return (
        <div className="register-page">
            <div className="top-bar">
                <Link to="/" className="logo">Book a Hotel</Link>
                <div className="auth-buttons">
                    <Link to="/register">
                        <button className="register-btn">ลงทะเบียน</button>
                    </Link>
                    <Link to="/login">
                        <button className="login-btn">เข้าสู่ระบบ</button>
                    </Link>
                </div>
            </div>

            {/* Registration Form section */}
            <div className="registration-container">
                <h2>ลงทะเบียน</h2>
                <form action="/register" method="POST">
                    <div className="form-group">
                        <label htmlFor="username">ชื่อผู้ใช้</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">อีเมล</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm_password">ยืนยันรหัสผ่าน</label>
                        <input type="password" id="confirm_password" name="confirm_password" required />
                    </div>
                    <button type="submit" className="btn">ลงทะเบียน</button>
                </form>
                <div className="login-link">
                    <p>มีบัญชีผู้ใช้อยู่แล้ว? <Link to="/login">เข้าสู่ระบบ</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
