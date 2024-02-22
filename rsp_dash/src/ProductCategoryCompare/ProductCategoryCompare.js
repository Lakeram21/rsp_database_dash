import React, { useEffect, useState } from 'react';
import { getAllProductsOnCategory_manufacturer, getAllManufacturer, getAllSupplierOnCategoryNManu } from '../Utils/utils';
import Select from 'react-select';

function ProductCategoryCompare() {

  const [manufacturers, setManufacturers] = useState([])
  const [category, setCategory] = useState('');
  const [Loading, setLoading] = useState(false)
  const [selectedManufacturer, setSelectedManufacturer] = useState([]);

  // Handle the Manufacturers that are selected on the dropdown
  const handleSelectChange = (selectedOptions) => {
    // Extract values from selected options
  const selectedValues = selectedOptions.map(option => {
    console.log(option)
    return option.value});

  // Set the values in the state
  setSelectedManufacturer(selectedValues);
  };

  // Fecth the supplier based on the form input
  const fetchSupplier = async()=>{
    if(category!="" || manufacturers.length > 0 ){
      const supplierInfo = await getAllSupplierOnCategoryNManu(category, selectedManufacturer)
      console.log(supplierInfo)
      const uniqueSuppliers = [...new Set(supplierInfo.map(info => info.Supplier))];
      console.log(uniqueSuppliers)

    }
    
  }

  // Get all manufacturers for ther drop down
  const fetchManufacturers = async () => {
    setManufacturers([])
    const fetchedmanufacturers = await getAllManufacturer();
    const sortedManufacturers = fetchedmanufacturers.sort((a, b) => a.Name.localeCompare(b.Name));

    // Create the options for the multiple select
    const manufacturerOptions = sortedManufacturers.map((manu) => ({
      value: manu.Name,
      label: manu.Name,
    }));

    setManufacturers(manufacturerOptions)
    // Use the manufacturers data to populate the dropdown
  };

  useEffect(() => {
    fetchManufacturers();
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
           
         <Select
            defaultValue={[]}
            isMulti
            name="manufacturers"
            options={manufacturers}
            className="px-3 py-2 rounded-md"
            classNamePrefix="select"
            onChange={handleSelectChange}
          />
        <button
          className="bg-orange-300 text-white px-4 py-2 rounded-md hover:bg-orange-400"
          onClick={fetchSupplier}
          disabled={Loading}
        >
          {Loading ? 'Loading...' : 'Find Suppliers'}
        </button>
        
      </div>
    </div>
  
  )
}

export default ProductCategoryCompare