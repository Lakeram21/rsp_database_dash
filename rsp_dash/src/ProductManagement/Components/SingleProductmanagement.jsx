import React, {useState} from 'react';
import './SingleProductmanagement.css'; // Import your CSS file if you have any custom styles
import Popup from 'reactjs-popup';
import {checkEdits, updateRecord} from "../../Utils/utils"

function SingleProductManagement() {
  const [sku, setSku] = useState(null)
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [showpopUp, setShowPopUp] = useState(false)
  const [originalSelected, setOriginalSelected] = useState(null)
  const [originalSelectedFilter, setOriginalSelectedFilter] = useState(null)
  const fetchData = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/product/${sku}`);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  // The Filters comes as a string and its to be in a dictionary
  const parseStringToDictionary = (str) => {
    const keyValuePairs = str.split(', ');
    const dictionary = {};

    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split(': ');
      dictionary[key] = value;
    });

    return dictionary;
  };
  
  const fetchSelectedProduct = (product)=>{
    setSelected(product)
    setOriginalSelected(product)
    const dictionary = parseStringToDictionary(product.SectionNames)
    setSelectedFilter(dictionary)
    setOriginalSelectedFilter(dictionary)
    setShowPopUp(true)
  }
  // The Edit function
  const editProduct = (e)=>{
    e.preventDefault()
    let edited  = checkEdits(originalSelected, selected, originalSelectedFilter, selectedFilter)
    if(edited){
      const data = updateRecord(selected, selectedFilter)
    }
    console.log(edited)
    
  }
  const handleClosePopup = ()=>{
    setShowPopUp(false)
  }

  return (
    <div>
      <div className='prodViewMan_container'>
          <div className='prodViewMan_category'>
            <input type='text' placeholder='Enter Product Sku' 
                  value={sku}
                  onChange={(event) => setSku(event.target.value)}/>
          </div>
          <div onClick={fetchData} className='prodViewMan_category_button'>
            <button>Search</button>
          </div>
      </div>
      <div>
        {/* Add the content for displaying the filtered results here */}
        <div className='productViewContainer'>
          <div className='productView_category'>
            <div className='tableRow'>
              <div className='tableHeader'>*</div>
              <div className='tableHeader'>Published</div>
              <div className='tableHeader'>Product Name</div>
              <div className='tableHeader'>Sku</div>
              <div className='tableHeader'>Manufacturer</div>
              <div className='tableHeader'>Manufacturer Part Num</div>
              <div className='tableHeader'>Supplier</div>
              <div className='tableHeader'>RelatedProducts</div>
              <div className='tableHeader'>Freight</div>
              <div className='tableHeader'>Shipping Time</div>
              <div className='tableHeader'>Summary</div>
              <div className='tableHeader'>Description</div>
              <div className='tableHeader'>SEDescription</div>
              <div className='tableHeader'>SETitle</div>
              
            </div>
            {data?.map((product, index) => (
              <div className='tableRow' key={index}>
                  <div className='tableData'>
                    <button className='editButton' onClick={()=>{fetchSelectedProduct(product)}}>Edit</button> {/* Add the Edit button */}
                  </div>
                  <div className={`tableData published ${product.Published === 0 ? 'highlighted' : ''}`}>{product.Published}</div>
                  <div className='tableData'>{product.ProductName}</div>
                  <div className='tableData'>{product.SKU}</div>
                  <div className='tableData'>{product.Manufacturer}</div>
                  <div className='tableData'>{product.ManufacturerPartNumber}</div>
                  <div className='tableData'>{product.Supplier}</div>
                  <div className='tableData'>{product.RelatedProducts}</div>
                  <div className='tableData'>{product.MiscText}</div>
                  <div className='tableData'>{product.ExtensionData}</div>
                  <div className='tableData'>{product.Summary}</div>
                  <div className='tableData'>{product.Description}</div>
                  <div className='tableData'>{product.SEDescription}</div>
                  <div className='tableData'>{product.SETitle}</div>
                  
              </div>
             
            ))}
          </div>
        </div>
        {
          showpopUp && 
          <div className='popupOverlay'>
            <div className='blurBackground'></div>
            <div className='popupContent'>
              <button className='closeButton' onClick={handleClosePopup}>
                Close
              </button>
              <h1 className='popupHeader_h1'>{selected.SKU}</h1>
              <form>
                <div className='inputGroup'>
                  <label>SKU:</label>
                  <input 
                    type='text' 
                    value={selected?.SKU} 
                    onChange={(event) => setSelected({ ...selected, SKU: event.target.value })} 
                  />
                </div>
                <div className='inputGroup'>
                  <label>Product Name:</label>
                  <textarea type='text' value={selected?.ProductName} onChange={(event)=>setSelected({...selected, ProductName: event.target.value})} />
                </div>
                <div className='inputGroup'>
                  <label>Manufacturer:</label>
                  <input type='text' value={selected?.Manufacturer} onChange={(event)=>setSelected({...selected, Manufacturer: event.target.value})}/>
                </div>
                <div className='inputGroup'>
                  <label>Manufacturer Part #:</label>
                  <input type='text' value={selected?.ManufacturerPartNumber} onChange={(event)=>setSelected({...selected, ManufacturerPartNumber: event.target.value})}/>
                </div>
                <div className='inputGroup'>
                  <label>Supplier:</label>
                  <input type='text' value={selected?.Supplier} onChange={(event)=>setSelected({...selected, Supplier: event.target.value})}/>
                </div>
                <div className='inputGroup'>
                  <label>Related Products:</label>
                  <input type='text' value={selected?.RelatedProducts} onChange={(event)=>setSelected({...selected, RelatedProducts: event.target.value})}/>
                </div>

                <div className='inputGroup'>
                  <label>Freight:</label>
                  <input type='text' value={selected?.MiscText} onChange={(event)=>setSelected({...selected, MiscText: event.target.value})}/>
                </div>
                <div className='inputGroup'>
                  <label>Shipping Time:</label>
                  <input type='text' value={selected?.ExtensionData} onChange={(event)=>setSelected({...selected, ExtensionData: event.target.value})}/>
                </div>
                <div className='inputGroup'>
                  <label>Summary:</label>
                  <textarea  rows='4' type='text' value={selected?.Summary} onChange={(event)=>setSelected({...selected, Summary: event.target.value})}/>
                </div>
                <div className='inputGroup'>
                  <label>Description:</label>
                  <textarea  rows='4' type='text' value={selected?.Description} onChange={(event)=>setSelected({...selected, Description: event.target.value})}/>
                </div>
                <div className='inputGroup'>
                  <label>SEDescription:</label>
                  <textarea  rows='4' type='text' value={selected?.SEDescription} onChange={(event)=>setSelected({...selected, SEDescription: event.target.value})}/>
                </div>
                <div className='inputGroup'>
                  <label>SETitle:</label>
                  <textarea  rows='4' type='text' value={selected?.SETitle} onChange={(event)=>setSelected({...selected, SETitle: event.target.value})}/>
                
                <h2>Filters</h2>
                </div>
                    {Object.entries(selectedFilter).map(([key, value]) => (
                      <div key={key} className='inputGroup'>
                        <label>{key}:</label>
                        <input type='text' value={value}  onChange={(event) => setSelectedFilter({...selectedFilter, [key]:event.target.value})}/>
                      </div>
                    ))}
                <div>
                  <button className='popup_submit_button' onClick={editProduct}>Submit</button>
                </div>
              </form>            
            </div>
          </div>
        }
      </div>
     
    </div>
  );
}

export default SingleProductManagement;
