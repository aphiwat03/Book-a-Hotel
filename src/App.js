import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // เพิ่ม Navigate ที่นี่
import Home from './Home';
import Register from './Register';
import Login from './Login';
import SearchResults from './SearchResults';
import HotelForm from './HotelForm';
import HotelDetails from './Hotel_detail';

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
                <Route path="/hoteldetail" element={<HotelDetails />} />
                <Route path="/hoteldetail/:hotelId" element={<HotelDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
