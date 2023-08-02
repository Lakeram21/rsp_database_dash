import React from 'react'
import "./ImageManagement.css"

function ImageManagement() {
  return (
    <div className='productViewContainer'>
        <h2>Image Management</h2>
        <div className='productView_category'>
        <div className='tableRow'>
          <div className='tableHeader'>Product Name</div>
          <div className='tableHeader'>Manufacturer</div>
          <div className='tableHeader'>Sku</div>
          <div className='tableHeader'>Image Filename Override</div>
        </div>
        {/* Add other rows with content here */}
      </div>
    </div>
  )
}

export default ImageManagement