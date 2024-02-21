import React, { useEffect, useState } from 'react';
import { getAllProductsOnCategory_manufacturer, getAllManufacturer, getAllSupplierOnCategoryNManu } from '../Utils/utils';

function ProductCategoryCompare() {

  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [manufacturers, setManufacturers] = useState([])
  const [category, setCategory] = useState('');
  const [Loading, setLoading] = useState(false)

  const handleManufacturerChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedManufacturers(selectedOptions);
    console.log(selectedManufacturers)
  };

  const fetchSupplier = async()=>{
    const supplierInfo = await getAllSupplierOnCategoryNManu()
    console.log(supplierInfo)
  }
  const fetchManufacturers = async () => {
    setManufacturers([])
    const fetchedmanufacturers = await getAllManufacturer();
    const sortedManufacturers = fetchedmanufacturers.sort((a, b) => a.Name.localeCompare(b.Name));

    setManufacturers(sortedManufacturers)
    // Use the manufacturers data to populate the dropdown
  };

  useEffect(() => {
    fetchManufacturers();
    fetchSupplier();
  }, []);

  return (
   
    <div className='container mx-auto'>
      <div className="flex space-x-4 items-center">
        <input
          type="text"
          placeholder="Enter Category"
          className="border border-gray-300 px-3 py-2 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
           
        <select
          className="mt-16 border border-gray-300 px-3 py-2 rounded-md"
          value={selectedManufacturers}
          onChange={(e) => handleManufacturerChange(e)}
          multiple
        >
          <option value="">Select Manufacturer</option>
          {manufacturers?.map((manu) => (
            <option key={manu.manufacturerID} value={manu.Name}>
              {manu.Name}
            </option>
          ))}
        </select>
        
        <button
          className="bg-orange-300 text-white px-4 py-2 rounded-md hover:bg-orange-400"
        //   onClick={getProducts}
          disabled={Loading}
        >
          {Loading ? 'Loading...' : 'Get Products'}
        </button>
        
      </div>
    </div>
  
  )
}

export default ProductCategoryCompare