import React from 'react'
import {
	Link
} from 'react-router-dom';
import "./HomePage.css"
import ProductCarousel from '../ProductManagement/Components/ProductCarousel';
function HomePage() {
  return (
    <div className='homePage'>
        <img src='https://rspsupply.com/Skins/Skin_1/images/logo.png'/>
        <ProductCarousel/>
        <div className='homePage_inner'>
            <div className='homePage_nav'>
                <Link className='homePage_link' to="/productmanagement">Product Management</Link>
                {/* <Link className='homePage_link' to="/pricemanagement">Price Management</Link> */}
                <Link className='homePage_link' to="/excelmanagement">Excel Management</Link>
                <Link className='homePage_link' to="/chatgptmanagement">Chat GPT Management</Link>
                <Link className='homePage_link' to="/inventory">Inventory</Link>
            </div>
            <div className='homePage_info'>
                <h1>RSP Product Management</h1>
                <li><strong>Product Management</strong>: Manage Description, name, image paths</li>
                {/* <li><strong>Price Management</strong>: Manage price, multipliers</li> */}
                <li><strong>Excel Management</strong>: Upload and download the most recent data on Excel sheets </li>
                <li><strong>Chat GPT Management</strong>: Get large sets of descriptions, names and information</li>
                <li><strong>Inventory</strong>: Search and find products on Vendor's inventory</li>
            </div>
        </div>
    </div>
  )
}

export default HomePage