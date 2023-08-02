import React, {useState} from 'react';
import './ProductView.css'; // Import your CSS file if you have any custom styles

function ProductView() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('');

  const manufacturers = ['Manufacturer1', 'Manufacturer2', 'Manufacturer3']; // Replace with your actual manufacturer options
  const productCategories = ['Category1', 'Category2', 'Category3']; // Replace with your actual product category options

  return (
    <div>
      <div className='prodViewMan_container'>
          <div className='prodViewMan_category'>
          <input type='text' placeholder='Enter Product Sku'/>
        </div>
          <div className='prodViewMan_category_button'>
            <button>Search</button>
          </div>
      </div>
      <div>
        {/* Add the content for displaying the filtered results here */}
        <div className='productViewContainer'>
          <div className='productView_category'>
            <div className='tableRow'>
              <div className='tableHeader'>Product Name</div>
              <div className='tableHeader'>Sku</div>
              <div className='tableHeader'>Manufacturer</div>
              <div className='tableHeader'>Manufacturer Part Num</div>
              
              <div className='tableHeader'>Price</div>
              <div className='tableHeader'>MFG LIST</div>
              <div className='tableHeader'>MSRP</div>
              <div className='tableHeader'>Cost</div>
              <div className='tableHeader'>Price Code</div>
              <div className='tableHeader'>Multiplier</div>
              <div className='tableHeader'>Markup</div>
            </div>
          {/* Add other rows with content here */}
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default ProductView;
