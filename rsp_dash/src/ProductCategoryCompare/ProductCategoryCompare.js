import React, { useEffect, useState } from 'react';
import { getAllProductsOnCategory_manufacturer, getAllManufacturer, getAllSupplierOnCategoryNManu, getAllVendorDetails } from '../Utils/utils';
import Select from 'react-select';
import VendorCard from './Component/VendorCard';
import NewVendorForm from './Component/NewVendorForm';

function ProductCategoryCompare() {

  const [manufacturers, setManufacturers] = useState([])
  const [category, setCategory] = useState('');

  const [selectedManufacturer, setSelectedManufacturer] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [filterVendors, setFilterVendors] = useState()
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  
  const handleRefresh = () => {
    // Toggle the refresh state to force a re-render
    console.log('Refreshing...');
    setRefresh(prevRefresh => !prevRefresh);
  };

  // Handle the Vendor create
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

      const filterSupplierInfo = vendors?.filter(vendor => uniqueSuppliers.includes(vendor.vendorName))
      setFilterVendors(filterSupplierInfo)

    }
    
  }

  // Fetching Vender Information
  const fetchVendorInfo = async()=>{
      const vendorInfo = await getAllVendorDetails()
      console.log(vendorInfo)
      setVendors(vendorInfo)
      setFilterVendors(vendorInfo)
  }

  // Get all manufacturers for ther drop down
  const fetchManufacturers = async () => {
    setManufacturers([])
    const fetchedmanufacturers = await getAllManufacturer();
    console.log(fetchedmanufacturers)
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
    fetchVendorInfo();
  }, [refresh]);

  

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
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Find Suppliers'}
        </button>
      </div>

      <div className='flex gap-2 border-t mb-2'>
        <button className="mt-6 bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500"
        onClick={handleRefresh}
        >
          View Vendor Directory
        </button>
        <button className="mt-6 bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500"
        onClick={openModal}
        >
          Add New Vendor
        </button>
      </div>

      <div className="flex flex-wrap justify-evenly mt-8 mb-2">
        {filterVendors?.map((vendor, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
            <VendorCard vendor={vendor} />
          </div>
        ))}
      </div>

      
      {isModalOpen && (
        <NewVendorForm onClose={closeModal} />
      )}
    </div>
  
  )
}

export default ProductCategoryCompare