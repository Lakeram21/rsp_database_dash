import React from 'react'
import {
	Link
} from 'react-router-dom';
import "./PriceManagement.css"

function PriceManagement() {
  return (
    <div>
        <div className='priceMan_nav'>
            <Link to="/">Home</Link>
            <h1>Price Management</h1>
        </div>
        <div className='priceMan_category'>
            <h2>Manufacturer</h2>
            <h2>Product Category</h2>
            <h2>Prices</h2>
        </div>
        <div>
            
        </div>
       
    </div>
  )
}

export default PriceManagement