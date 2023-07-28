import React from 'react'
import {
	Link
} from 'react-router-dom';
import "./HomePage.css"

function HomePage() {
  return (
    <div className='homePage'>
        <img src='https://rspsupply.com/Skins/Skin_1/images/logo.png'/>
        <div className='homePage_inner'>
            <div className='homePage_nav'>
                <Link className='homePage_link' to="/pricemanagement">Price Management</Link>
                <Link className='homePage_link' to="/excelmanagement">Excel Management</Link>
                <Link className='homePage_link' to="/excelmanagement">Product Management</Link>
            </div>
            <div className='homePage_info'>
                <h1>RSP Product Management</h1>
                <li><strong>Price Management</strong>: Manage price, multipliers</li>
                <li><strong>Excel Management</strong>: Upload and download the most recent data on Excel sheets </li>
                <li><strong>Product Details Management</strong>: Manage Description, name, image paths</li>
            </div>
        </div>
    </div>
  )
}

export default HomePage