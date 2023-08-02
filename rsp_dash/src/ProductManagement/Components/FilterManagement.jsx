import React, {useState} from 'react'
import "./FilterManagement.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

function FilterManagement() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('');

  const manufacturers = ['Manufacturer1', 'Manufacturer2', 'Manufacturer3']; // Replace with your actual manufacturer options
  const productCategories = ['Category1', 'Category2', 'Category3']; // Replace with your actual product category options

  return (
    <div>
      <div className='filterMan_container'>
          <div className='filterMan_category'>
            <select value={selectedManufacturer} onChange={(e) => setSelectedManufacturer(e.target.value)}>
              <option value="">Select Manufacturer</option>
              {manufacturers.map((manufacturer, index) => (
                <option key={index} value={manufacturer}>
                  {manufacturer}
                </option>
              ))}
            </select>
          </div>
          <div className='filterMan_category'>
          <select value={selectedProductCategory} onChange={(e) => setSelectedProductCategory(e.target.value)}>
            <option value="">Select Product Category</option>
            {productCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          </div>
          <div className='filterMan_category_button'>
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
        <div className='filterMan_imports'>

          <button><FontAwesomeIcon icon={faFileCsv} color="#e97423"/>Export</button>
          <button><FontAwesomeIcon icon={faFileCsv} color="#e97423"/>Upload</button>
        </div>
      </div>
     
    </div>
  )
}

export default FilterManagement