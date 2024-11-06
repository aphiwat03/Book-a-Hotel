import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import SearchResults from './SearchResults';
import HotelForm from './HotelForm';
import HotelDetails from './Hotel_detail';
import PaymentPage from './PaymentPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} /> {/* เส้นทางหลักไปยังหน้า login */}
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/hotelform" element={<HotelForm />} />
                <Route path="/hotel-detail/:hotel_id" element={<HotelDetails />} /> {/* เก็บแค่เส้นทางนี้ */}
                <Route path="/payment/:hotel_id" element={<PaymentPage />} />
            </Routes>
        </Router>
    );
}

export default App;
