// src/Login.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // ถ้าต้องการใช้ CSS แยก ให้สร้างไฟล์ Login.css

function Login() {
    return (
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
    );
}

export default Login;
