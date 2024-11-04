// src/Login.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // ไฟล์ CSS สำหรับหน้า Login

function Login() {
    return (
        <div className="login-page">
            {/* Top bar with link to Home */}
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
            
            {/* Login form */}
            <div className="login-container">
                <h2>เข้าสู่ระบบ</h2>
                <form action="/login" method="POST">
                    <div className="form-group">
                        <label htmlFor="email">อีเมล</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="btn">เข้าสู่ระบบ</button>
                </form>
                <div className="register-link">
                    <p>ยังไม่มีบัญชีผู้ใช้? <Link to="/register">ลงทะเบียน</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
