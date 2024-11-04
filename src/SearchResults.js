// src/SearchResults.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

function SearchResults() {
    return (
        <div>
            {/* Top Bar */}
            <div className="top-bar">
                <Link to="/" className="back-btn">⬅</Link>
                <div className="logo">Book a hotel</div>
            </div>

            <div className="container">
                <div className="filter-section">
                    <h3>เรียงผลการค้นหา</h3>
                    <label><input type="radio" name="sort" defaultChecked /> ยอดนิยม</label>
                    <label><input type="radio" name="sort" /> แสดงราคาต่ำสุดก่อน</label>
                    <label><input type="radio" name="sort" /> คะแนนรีวิวสูงสุดก่อน</label>

                    <h3>ราคา</h3>
                    <input type="range" min="0" max="100000" defaultValue="50000" />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>0฿</span><span>100000฿</span>
                    </div>

                    <h3>ระดับดาว</h3>
                    <div className="star-rating">
                        <label><input type="checkbox" /> ★★★★★</label>
                        <label><input type="checkbox" /> ★★★★☆</label>
                        <label><input type="checkbox" /> ★★★☆☆</label>
                        <label><input type="checkbox" /> ★★☆☆☆</label>
                        <label><input type="checkbox" /> ★☆☆☆☆</label>
                    </div>
                </div>

                {/* Results Section - Right Side */}
                <div className="results-section">

                    {/* Result Cards */}
                    <div className="result-card">
                        <img src="https://www.charnveeresortkhaoyai.com/wp-content/uploads/2023/12/Rancho-Dec-1-%E0%B8%97%E0%B8%B0%E0%B9%80%E0%B8%A5%E0%B8%97%E0%B8%B5%E0%B9%88-%E0%B8%AA%E0%B8%A7%E0%B8%A2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B9%83%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2-02-1536x1024.jpg.webp" alt="Hotel Amber Pattaya" />
                        <div className="result-card-content">
                            <h4>[โรงแรมแอมเบอร์ พัทยา (Hotel Amber Pattaya)]</h4>
                            <p>61.84$</p>
                        </div>
                    </div>

                    <div className="result-card">
                        <img src="https://www.charnveeresortkhaoyai.com/wp-content/uploads/2023/12/Rancho-Dec-1-%E0%B8%97%E0%B8%B0%E0%B9%80%E0%B8%A5%E0%B8%97%E0%B8%B5%E0%B9%88-%E0%B8%AA%E0%B8%A7%E0%B8%A2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B9%83%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2-02-1536x1024.jpg.webp" alt="Orange Voyage" />
                        <div className="result-card-content">
                            <h4>Orange Voyage Ultimate Party Catamaran Pattaya 8 Islands Tour</h4>
                            <p className="price">71.89$</p>
                        </div>
                    </div>

                    <div className="result-card">
                        <img src="https://travel.mthai.com/app/uploads/2019/03/phuket-cover.jpg" alt="Koh Samet Day Trip" />
                        <div className="result-card-content">
                            <h4>From Pattaya: Koh Samet Day Trip by Speed Boat</h4>
                            <p className="price">43.22$</p>
                        </div>
                    </div>

                    <div className="result-card">
                        <img src="https://travel.mthai.com/app/uploads/2019/03/800px-Lipe_Dawn_Flip666.jpg" alt="Private Tour" />
                        <div className="result-card-content">
                            <h4>Pattaya One-Day Private Tour from Bangkok or Pattaya</h4>
                            <p className="price">47.92$</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResults;
