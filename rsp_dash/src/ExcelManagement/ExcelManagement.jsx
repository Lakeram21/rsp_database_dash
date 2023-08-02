import React, {useState} from 'react'
import {
	Link
} from 'react-router-dom';
import "./ExcelManagement.css"
import PageBanner from '../PageBanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

function ExcelManagement() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('');
  const dummyData = [
    {
      productName: "Product 1",
      sku: "SKU001",
      manufacturer: "Manufacturer A",
      manufacturerPartNum: "MPN001",
      supplier: "Supplier X",
      relatedProducts: "Related Product 1",
      restrictedQuantities: "No",
      obsoleteReplacement: "Replacement Product X",
      freight: "Free Shipping",
      shippingTime: "2-5 days",
      category1: "Category A",
      category2: "Category B",
      category3: "Category C",
      category4: "Category D",
      summary: "Product summary for Product 1",
      description: "Product description for Product 1",
      seDescription: "SEO description for Product 1",
      seTitle: "SEO title for Product 1",
      weight: "5 lbs",
      shippingWeight: "6 lbs",
      gtin: "12345678901234",
      imageFilenameOverride: "product1_image.jpg",
    },
    {
      productName: "Product 2",
      sku: "SKU002",
      manufacturer: "Manufacturer B",
      manufacturerPartNum: "MPN002",
      supplier: "Supplier Y",
      relatedProducts: "Related Product 2",
      restrictedQuantities: "Yes",
      obsoleteReplacement: "Replacement Product Y",
      freight: "Paid Shipping",
      shippingTime: "3-7 days",
      category1: "Category X",
      category2: "Category Y",
      category3: "Category Z",
      category4: "Category W",
      summary: "Product summary for Product 2",
      description: "Product description for Product 2",
      seDescription: "SEO description for Product 2",
      seTitle: "SEO title for Product 2",
      weight: "3 lbs",
      shippingWeight: "4 lbs",
      gtin: "98765432109876",
      imageFilenameOverride: "product2_image.jpg",
    },
    // Add more rows as needed...
  ];

  const manufacturers = ['Manufacturer1', 'Manufacturer2', 'Manufacturer3']; // Replace with your actual manufacturer options
  const productCategories = ['Category1', 'Category2', 'Category3']; // Replace with your actual product category options

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
            {productCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          </div>
          <div className='excelMan_category_button'>
            <button>Search</button>
          </div>
        </div>
        
        <div>
          <h2>Preview Results</h2>
          <div className='productViewContainer'>
            <div className='productView_category'>
              <div className='tableRow'>
                <div className='tableHeader'>Product Name</div>
                <div className='tableHeader'>Sku</div>
                <div className='tableHeader'>Manufacturer</div>
                <div className='tableHeader'>Manufacturer Part Num</div>
                <div className='tableHeader'>Supplier</div>
                <div className='tableHeader'>Related Products</div>
                <div className='tableHeader'>Restricted Quantities</div>
                <div className='tableHeader'>Obsolete Replacement</div>
                <div className='tableHeader'>Freight</div>
                <div className='tableHeader'>Shipping Time</div>
                <div className='tableHeader'>Category 1</div>
                <div className='tableHeader'>Category 2</div>
                <div className='tableHeader'>Category 3</div>
                <div className='tableHeader'>Category 4</div>
                <div className='tableHeader'>Summary</div>
                <div className='tableHeader'>Description</div>
                <div className='tableHeader'>SEDescription</div>
                <div className='tableHeader'>SETitle</div>
                <div className='tableHeader'>Weight</div>
                <div className='tableHeader'>Shipping Weight</div>
                <div className='tableHeader'>GTIN</div>
                <div className='tableHeader'>Image Filename Override</div>
              </div>
              {dummyData.map((data, index) => (
                <div className='tableRow' key={index}>
                  <div className='tableData'>{data.productName}</div>
                  <div className='tableData'>{data.sku}</div>
                  <div className='tableData'>{data.manufacturer}</div>
                  <div className='tableData'>{data.manufacturerPartNum}</div>
                  <div className='tableData'>{data.supplier}</div>
                  <div className='tableData'>{data.relatedProducts}</div>
                  <div className='tableData'>{data.restrictedQuantities}</div>
                  <div className='tableData'>{data.obsoleteReplacement}</div>
                  <div className='tableData'>{data.freight}</div>
                  <div className='tableData'>{data.shippingTime}</div>
                  <div className='tableData'>{data.category1}</div>
                  <div className='tableData'>{data.category2}</div>
                  <div className='tableData'>{data.category3}</div>
                  <div className='tableData'>{data.category4}</div>
                  <div className='tableData'>{data.summary}</div>
                  <div className='tableData'>{data.description}</div>
                  <div className='tableData'>{data.seDescription}</div>
                  <div className='tableData'>{data.seTitle}</div>
                  <div className='tableData'>{data.weight}</div>
                  <div className='tableData'>{data.shippingWeight}</div>
                  <div className='tableData'>{data.gtin}</div>
                  <div className='tableData'>{data.imageFilenameOverride}</div>
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