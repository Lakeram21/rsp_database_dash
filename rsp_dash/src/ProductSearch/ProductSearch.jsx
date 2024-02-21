import React, { useEffect, useState } from 'react';
import ExcelTemplate from '../CommonComponets/ExcelTemplate';
import { getAllProductsOnCategory_manufacturer, getAllManufacturer } from '../Utils/utils';

function ProductSearch() {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [manufacturers, setManufacturers] = useState([])
  const [category, setCategory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [Loading, setLoading] = useState(false)
  const [filter_headers, setHeaders] = useState([])

  //const filter_headers = Array.from({ length: 6 }, (_, index) => `Filter ${index + 1}`);

  const getProducts = async () => {
    setLoading(true)
    let tem_header = []

    const fetchedProducts = await getAllProductsOnCategory_manufacturer(category, manufacturer);
    setFetchedProducts(fetchedProducts);
    // console.log(fetchedProducts)

     //Set headers for the app view
     fetchedProducts?.forEach((product, index) => {
      const sectionNames = product.SectionNames || '';
      const sectionPairs = sectionNames.split(',').map(pair => pair.trim().split(':'));
    
      // Iterate through each key-value pair in the product
      sectionPairs.forEach(pair => {
        const key = pair[0].trim();
        
        if(!tem_header.includes(key)){
          tem_header.push(key)
        }
      });
    });
    setHeaders(tem_header)

    setLoading(false)
  };

  const fetchManufacturers = async () => {
    setManufacturers([])
    const fetchedmanufacturers = await getAllManufacturer();
    const sortedManufacturers = fetchedmanufacturers.sort((a, b) => a.Name.localeCompare(b.Name));

    setManufacturers(sortedManufacturers)
    // Use the manufacturers data to populate the dropdown
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  useEffect(()=>{},[])
  return (
    <div className='mt-40 container mx-auto'>
      <div className="flex space-x-4 items-center mt-4">
        <input
          type="text"
          placeholder="Enter Category"
          className="border border-gray-300 px-3 py-2 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <select
          className="border border-gray-300 px-3 py-2 rounded-md"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
        >
          <option value="">Select Manufacturer</option>
          {/* Map over the manufacturersList to dynamically create options */}
          {manufacturers?.map((manu) => {
            return (<option key={manu.manufacturerID} value={manu.Name}>
            {manu.Name}
          </option>)
          })}
        </select>
        <button
          className="bg-orange-300 text-white px-4 py-2 rounded-md hover:bg-orange-400"
          onClick={getProducts}
          disabled={Loading}
        >
          {Loading ? 'Loading...' : 'Get Products'}
        </button>
      </div>

      <ExcelTemplate filter_headers={filter_headers} fetchedProducts={fetchedProducts} />
    </div>
  );
}

export default ProductSearch;
