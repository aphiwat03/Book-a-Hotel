import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './PaymentPage.css';

const PaymentPage = () => {
  const { hotel_id } = useParams(); // Get hotel_id from route parameters
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('payLater');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    f_name: '',
    l_name: '',
    email: localStorage.getItem('email') || '',
    country_code: '',
    mobile: '',
    hotel_id: hotel_id,  // Set hotel_id from route parameter
  });

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      ...formData,
      payment_method: paymentMethod
    };

    try {
      const response = await axios.post('http://localhost:5000/payment', paymentData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        setFormSubmitted(true);
        console.log("Payment saved successfully:", response.data);
      }
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูลการชำระเงิน");
    }
  };

  const handleCancel = () => {
    navigate('/search');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="payment-page">
      <h3>Payment</h3>

      {formSubmitted ? (
        <div className="payment-success">
          <h2>การชำระเงินสำเร็จ!</h2>
          <p>ขอบคุณสำหรับการชำระเงินของคุณ</p>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <h3>กรุณาเลือกวันที่ชำระเงิน</h3>
          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="payLater"
                checked={paymentMethod === 'payLater'}
                onChange={() => handlePaymentSelection('payLater')}
              />
              จ่ายทีหลัง (จ่ายที่หน้าแคชเชียร์)
            </label>
          </div>

          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="payNow"
                checked={paymentMethod === 'payNow'}
                onChange={() => handlePaymentSelection('payNow')}
              />
              จ่ายทันที (ออนไลน์)
            </label>
          </div>

          {paymentMethod === 'payNow' && (
            <div className="credit-card-info">
              <h4>ข้อมูลบัตรเครดิต</h4>
              <input type="text" placeholder="หมายเลขบัตรเครดิต" required />
              <input type="text" placeholder="ชื่อบนบัตร" required />
              <input type="text" placeholder="วันหมดอายุ (MM/YY)" required />
              <input type="text" placeholder="CVV" required />
            </div>
          )}

          <h4>Contact details</h4>
          <div className="contact-info">
            <input
              type="text"
              name="f_name"
              placeholder="First name"
              value={formData.f_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="l_name"
              placeholder="Last name"
              value={formData.l_name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country_code"
              placeholder="Country code"
              value={formData.country_code}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            {paymentMethod === 'payLater' ? 'ดำเนินการต่อ' : 'ชำระเงิน'}
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
            ยกเลิก
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentPage;
