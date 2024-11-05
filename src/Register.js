import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import './Home.css';

function Register() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirm_password) {
            setError('รหัสผ่านไม่ตรงกัน');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: formData.full_name,
                    email: formData.email,
                    password: formData.password,
                    confirm_password: formData.confirm_password
                })
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);  // แสดงข้อความสำเร็จ
                navigate('/login');  // นำไปสู่หน้าล็อกอิน
            } else {
                setError(result.message);  // แสดงข้อผิดพลาดถ้ามี
            }
        } catch (error) {
            setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
        }
    };

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

            <div className="registration-container">
                <h2>ลงทะเบียน</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="full_name">ชื่อผู้ใช้</label>
                        <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">อีเมล</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm_password">ยืนยันรหัสผ่าน</label>
                        <input type="password" id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
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
