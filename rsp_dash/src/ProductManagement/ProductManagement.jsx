import React, { useState } from 'react'
import {
	Link
} from 'react-router-dom';
import "./ProductManagement.css"
import PageBanner from '../PageBanner';
import ProductView from './Components/ProductView';
import ProductCarousel from './Components/ProductCarousel';
import FilterManagement from './Components/FilterManagement';
import ImageManagement from './Components/ImageManagement';
function ProductManagement() {
  const [select, setSelect] = useState("Normal")
  return (
    <div>
         
         <PageBanner name="Product Management"/>
         <div className='productMan_category'>
          <ul class="productMan_custom-list">
              <li>
                <h2 onClick={()=>{setSelect("View")}}>Single Product Management</h2>
              </li>
              <li>
                <h2 onClick={()=>{setSelect("Filter")}}>Filter Management</h2>
              </li>
            
          </ul>
         </div>
         <hr/>
         <div>
          {
          select == "View"?<ProductView/>:
          select == "Filter"?<FilterManagement/>:
          select == "Image"?<ImageManagement/>:
          <ProductView/>}
         </div>
         
    </div>
  )
}

export default ProductManagement