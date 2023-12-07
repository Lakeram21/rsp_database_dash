import React, {useEffect, useState} from 'react'
import {
	Link
} from 'react-router-dom';
import "./ExcelManagement.css"
import PageBanner from '../PageBanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { getAllCategoryOnManufacturer, getAllManufacturer } from '../Utils/utils';

function ExcelManagement() {
  const [dataOnManufacturer, setDataOnManufacturer] = useState([])
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('');
  const [manufacturers, setManufacturers] = useState([])
  const [productCategories, setProductCategories] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])

  const fetchManufacturers = async () => {
    try {
      const data = await getAllManufacturer();
      const manufacturerNames = data.map(manufacturer => manufacturer.Name);
      
      setManufacturers(manufacturerNames);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    }
  };

  const filterDataOnCategory = ()=>{
    if(selectedProductCategory == "All"){
      setSelectedProducts(dataOnManufacturer)
    }
    else{
      const selected = dataOnManufacturer.filter((product)=> product.CategoryName === selectedProductCategory)
      setSelectedProducts(selected)
    }
  }

  // Get all Categories based on a manufacturer
  const fetchCategory = async () => {
    try {
      const data = await getAllCategoryOnManufacturer(selectedManufacturer);
      console.log(data)
      setDataOnManufacturer(data)
      const manufacturerNames = data.map(product => product.CategoryName);
      const uniqueManufacturerNames = manufacturerNames.filter((name, index) => manufacturerNames.indexOf(name) === index);

      setProductCategories(uniqueManufacturerNames);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    }
  };

  useEffect(()=>{
    fetchManufacturers()
  }, [])

  useEffect(()=>{
    fetchCategory()
  }, [selectedManufacturer])

  return (
    <div>
        <PageBanner name="Excel Management"/>
        <div className='excelMan_container'>
          <div className='excelMan_category'>
            <h2>Manufacturer</h2>
            <select value={selectedManufacturer} onChange={(e) => setSelectedManufacturer(e.target.value)}>
              <option value="">Select Manufacturer</option>
              {manufacturers.map((manufacturer, index) => (
                <option key={index} value={manufacturer}>
                  {manufacturer}
                </option>
              ))}
            </select>
          </div>
          
          <div className='excelMan_category'>
            <h2>Product Category</h2>
            <select value={selectedProductCategory} onChange={(e) => setSelectedProductCategory(e.target.value)}>
              <option value="">Select Product Category</option>
              <option value="All">All Category</option>
              {productCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className='excelMan_category_button'>
            <button onClick={filterDataOnCategory}>Search</button>
          </div>
        </div>
        
        <div>
          <h2>Preview Results ( Total Products {selectedProducts.length} )</h2>
          <div className='productViewContainer'>
            <div className='productView_category'>
              <div className='tableRow'>
                <div className='tableHeader'>Sku</div>
                <div className='tableHeader'>Product Name</div>
                <div className='tableHeader'>Manufacturer</div>
                <div className='tableHeader'>Category</div>
                <div className='tableHeader'>Short Description</div>
                
              </div>
              {selectedProducts.slice(0, 10).map((data, index) => (
                <div className='tableRow' key={index}>
                  <div className='tableData'>{data.SKU}</div>
                  <div className='tableData'>{data.ProductName}</div>
                  <div className='tableData'>{data.ManufacturerName}</div>
                  <div className='tableData'>{data.CategoryName}</div>
                  <div className='tableData'>{data.ShortDescription}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='excelMan_imports'>
          <button><FontAwesomeIcon icon={faFileCsv} color="#e97423"/>Export</button>
          <button><FontAwesomeIcon icon={faFileCsv} color="#e97423"/>Upload</button>
        </div>
    </div>
  )
}

export default ExcelManagement