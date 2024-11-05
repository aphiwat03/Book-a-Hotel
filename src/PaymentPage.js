import React, { useState } from 'react';
import './PaymentPage.css';
const PaymentPage = ({ onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState('payLater');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="payment-page">
      {/* แสดง TopBar */}
      <h3 title="Payment" />

      {formSubmitted ? (
        <div className="payment-success">
          <h2>การชำระเงินสำเร็จ!</h2>
          <p>ขอบคุณสำหรับการชำระเงินของคุณ</p>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <h3>กรุณาเลือกวันที่ชำระเงิน</h3>

          {/* ตัวเลือกการชำระเงิน */}
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

          {/* ฟอร์มบัตรเครดิต */}
          {paymentMethod === 'payNow' && (
            <div className="credit-card-info">
              <h4>ข้อมูลบัตรเครดิต</h4>
              <input type="text" placeholder="หมายเลขบัตรเครดิต" required />
              <input type="text" placeholder="ชื่อบนบัตร" required />
              <input type="text" placeholder="วันหมดอายุ (MM/YY)" required />
              <input type="text" placeholder="CVV" required />
            </div>
          )}

          {/* ฟอร์มข้อมูลการติดต่อ */}
          <h4>Contact details</h4>
          <div className="contact-info">
            <input type="text" placeholder="First name" required />
            <input type="text" placeholder="Last name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Country/region of residence" required />
            <input type="text" placeholder="Country code" required />
            <input type="tel" placeholder="Mobile number" required />
          </div>

          {/* ปุ่มชำระเงินและปุ่มยกเลิก */}
          <button type="submit" className="submit-button">
            {paymentMethod === 'payLater' ? 'ดำเนินการต่อ' : 'ชำระเงิน'}
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            ยกเลิก
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentPage;