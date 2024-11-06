import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleLogin = () => {
    const { email, password } = formData; // ดึง email และ password จาก formData

    // เมื่อเข้าสู่ระบบสำเร็จ
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    
    // นำทางไปยังหน้าถัดไป
    navigate('/search');
};
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(''); // Clear error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Show loading state
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', formData, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.status === 200) {
                alert(response.data.message);
                handleLogin(); // เรียกใช้ handleLogin เพื่อบันทึกข้อมูลใน localStorage
                navigate('/home');  // เปลี่ยนเส้นทางไปที่หน้า /home
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('รหัสผ่านหรืออีเมลผิดพลาด');
            }
        } finally {
            setIsLoading(false); 
        }
    };
    
    

    return (
        <div className="login-page">
            <div className="top-bar">
                <Link to="/" className="logo">Book a Hotel</Link>
            </div>

            <div className="login-container">
                <h2>เข้าสู่ระบบ</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="email">อีเมล</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn" disabled={isLoading}>
                        {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                    </button>
                </form>
                <div className="register-link">
                    <p>ยังไม่มีบัญชีผู้ใช้? <Link to="/register">ลงทะเบียน</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
