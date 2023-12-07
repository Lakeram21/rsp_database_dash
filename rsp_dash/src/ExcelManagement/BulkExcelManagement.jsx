import React, { useEffect, useState } from 'react';
import { getAllProductsOnCategory_manufacturer } from '../Utils/utils';
import * as XLSX from 'xlsx';
import PacmanLoader from "react-spinners/PacmanLoader"




function BulkExcelManagement() {
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [filter_headers, setHeaders] = useState([])

  const searchForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let tem_header = []
      const fetchedProducts = await getAllProductsOnCategory_manufacturer(category);
      console.log(fetchedProducts)
      setProducts(fetchedProducts);

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

      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const exportToExcel = () => {
    let startRow = 3, startCol = 0, headerRow = 1
    // Preset headers in a specific order
    const orderedHeaders = [
      'ProductName', 'SKU', 'Manufacturer', 'ManufacturerPartNumber',
      'Supplier', 'RelatedProducts', 'Restricted Quantities',
      'Obsolete Replacements', 'MiscText', 'ExtensionData',
      'Manufacturer Category', 'Category1', 'Category2', 'Category3',
      'Category4', 'Summary', 'Description', 'SEDescription', 'SETitle',
      'Weight', 'Shipping Weight', 'GTIN', 'Published', 'Condition','Revised Markup', 'Competitor',
      'Price', 'MFG LIST','MSRP', 'Cost', 'Price Code', 'Multiplier', 'Markup', 'Preferred',
      'Gold', 'Reseller', 'Volume Reseller', 'Special', 'ImageFilenameOverride',
      'URL', 'ScrapeDate', 'Test'
    ];
    
    const additionalHeader_above = [
      'Product Fields', '', '', '',
      '', '', '','', '', '',
      '', 'Import File Version:', '3.0', 'You cannot delete the first 3 header rows of this spreadhsheet!',
      '', '', '', '', '',
      '', '', '', '', '','', '',
      '', '','', '', '', '', '', 'Remote Site Products Price Structure				',
      '', '', '', '', 'Product-Fields',
      '', '', ''
    ];
    
    const additionalHeader_below = [
      '(text field)', 'text field', '(text name of manufacturer)', 'text field',
      '(text name of distributor)', 'comma separated list of product names', '',
      '', 'Shipping', 'Shipping Time',
      '', 'xpath of 1st category mapping', 'xpath of 2nd category mapping', 'xpath of 3rd category mapping',
      'xpath of 4th category mapping', 'text field', 'text field', 'text field', 'text field',
      'decimal field (lbs)', '', '', '1 or 0', '', '',
      '', 'decimal field','', '', 'decimal field', 'decimal field','', '', 'Level 1',
      'Level 2', 'Level 3', 'Level 4', 'Level 5', '(text-field)',
      '', '', ''
    ];

    const filterheader = []
    // Create a new array with organized data
    const organizedData = products.map(product => {
      const organizedProduct = {};
      
      // Map data based on the ordered headers
      orderedHeaders.forEach(header => {
        organizedProduct[header] = product[header] || ''; // Set to empty string if the header is not present in the original data
      });
  
      // Add additional headers from SectionNames
      if (product.SectionNames) {
        const sectionNames = product.SectionNames.split(',').map(pair => pair.trim().split(':'));
        sectionNames.forEach(pair => {
          // console.log(pair)
          if (pair.length > 1){
            const key = pair[0].trim();
            const value = pair[1].trim();
            organizedProduct[key] = value;
            if (!filterheader.includes(key) && key!== "Manufacturer"){
              filterheader.push(key)
            }
          }
          
        });
      }
  
      return [organizedProduct, filterheader];
    });
    
      // Create a new array with strings "Filter" + index
      const newArray = Array.from({ length: filterheader.length }, (_, index) => "Filter" + (index + 1));
      

      const worksheet = XLSX.utils.json_to_sheet([{}, ...organizedData.map(entry => entry[0])], { header: orderedHeaders, origin: { r: headerRow, c: startCol } },);
      // XLSX.utils.sheet_add_json(worksheet, organizedData.map(entry => entry[0]), { skipHeader: true, origin: { r: startRow, c: startCol } });
    
      // Add additional headers from SectionNames starting from headerRow + the number of rows in organizedData + 1
      XLSX.utils.sheet_add_json(worksheet, [{}], { header: additionalHeader_below, skipHeader: false, origin: { r: headerRow+1, c: startCol} });
      XLSX.utils.sheet_add_json(worksheet, [{}], { header: additionalHeader_above, skipHeader: false, origin: { r: 0, c: startCol} });

      XLSX.utils.sheet_add_json(worksheet, [{}], { header: filterheader, skipHeader: false, origin: { r: headerRow+1, c: 42} });
      XLSX.utils.sheet_add_json(worksheet, [{}], { header: newArray, skipHeader: false, origin: { r: headerRow, c: 42} });

      // Create workbook and save
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
      XLSX.writeFile(workbook, 'products.xlsx');
  };
  
  // Example usage with starting row 2, starting column 1, and header row 1

  return (
    <div>
      <form onSubmit={searchForm}>
        <input
          type='text'
          placeholder='Search based on category'
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />
        <input type='submit' value='Submit' />
      </form>

      <hr />
      <h2>Results: Number of Products Found {products?.length}</h2>
          {loading ? 
          <PacmanLoader
          color='Blue'
          /> : null}
      <div>
        <ul className='pagination'>
          {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className='page-link'>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={exportToExcel}>Export to Excel</button>
      </div>
      <div>
        <div className='productViewContainer'>
          <div className='productView_category'>
            <div className='tableRow'>
              <div className='tableHeader'>Product Name</div>
              <div className='tableHeader'>Sku</div>
              <div className='tableHeader'>Manufacturer</div>
              <div className='tableHeader'>Manufacturer Part#</div>
              <div className='tableHeader'>Supplier</div>
              <div className='tableHeader'>Related Products</div>
              <div className='tableHeader'>Related Quantities</div>
              <div className='tableHeader'>Obsolete Replacements</div>
              <div className='tableHeader'>Shipping</div>
              <div className='tableHeader'>Shipping Time</div>
              <div className='tableHeader'>Manufacturer Category</div>

              <div className='tableHeader'>Category1</div>
              <div className='tableHeader'>Category2</div>
              <div className='tableHeader'>Category3</div>
              <div className='tableHeader'>Category4</div>

              <div className='tableHeader'>Summary</div>
              <div className='tableHeader'>Description</div>
              <div className='tableHeader'>SEDescription</div>
              <div className='tableHeader'>SETitle</div>
              <div className='tableHeader'>Weight</div>
              <div className='tableHeader'>Shipping Weight</div>
              <div className='tableHeader'>GTIN</div>
              <div className='tableHeader'>Published</div>
              <div className='tableHeader'>Condition</div>
              <div className='tableHeader'>Revised Markup</div>
              <div className='tableHeader'>Competitor</div>
              <div className='tableHeader'>Price</div>
              <div className='tableHeader'>MFG List</div>
              <div className='tableHeader'>MSRP</div>
              <div className='tableHeader'>Cost</div>
              <div className='tableHeader'>Price Code</div>
              <div className='tableHeader'>Multiplier</div>
              <div className='tableHeader'>Markup</div>
              <div className='tableHeader'>Preferred</div>
              <div className='tableHeader'>Gold</div>
              <div className='tableHeader'>Reseller</div>
              <div className='tableHeader'>Volume Reseller</div>
              <div className='tableHeader'>Special</div>


              <div className='tableHeader'>Image Filename Override</div>
              <div className='tableHeader'>Url</div>
              <div className='tableHeader'>Scrape Date</div>
              <div className='tableHeader'>Test</div>

              {filter_headers?.map((header, index) => {
                // console.log(header)
                return(
                <div key= {index} className='tableHeader filter'>
                  <h3>Filter {index+1}:</h3><p>{header}</p></div>)
              })}


            </div>

            {currentItems?.map((product, index) => {
                
                //Getting the Filters to match their headers 
                const filter_dic = product.SectionNames
                const keyValuePairs = filter_dic.split(',').map(pair => pair.trim());

                // Create a dictionary from the key-value pairs
                const dictionary = {};
                keyValuePairs.forEach(pair => {
                  const [key, value] = pair.split(':').map(item => item.trim());
                  dictionary[key] = value;
                });

                return (
                  <div className='tableRow' key={index}>
                    {/* Your existing table data */}
                    <div className='tableData'>{product.ProductName}</div>
                    <div className='tableData'>{product.SKU}</div>
                    <div className='tableData'>{product.Manufacturer}</div>
                    <div className='tableData'>{product.ManufacturerPartNumber}</div>
                    <div className='tableData'>{product.Supplier}</div>
                    <div className='tableData'>{product.RelatedProducts}</div>
                    <div className='tableData'>{product.RelatedQuantities}</div>
                    <div className='tableData'>{product.ReplacementProducts}</div>
                    <div className='tableData'>{product.MiscText}</div>
                    <div className='tableData'>{product.ExtensionData}</div>
                    <div className='tableData'>{product.ManufacturerCategory}</div>
                    

                    <div className='tableData'>{product.Category1}</div>
                    <div className='tableData'>{product.Category2}</div>
                    <div className='tableData'>{product.Category3}</div>
                    <div className='tableData'>{product.Category4}</div>
                 

                    

                    <div className='tableData'>{product.Summary}</div>
                    <div className='tableData'>{product.Description}</div>
                    <div className='tableData'>{product.SEDescription}</div>
                    <div className='tableData'>{product.SETitle}</div>
                    <div className='tableData'>{product.Weight}</div>
                    <div className='tableData'>{product.ShippingWeight}</div>
                    <div className='tableData'>{product.GTIN}</div>
                    <div className='tableData'>{product.Published}</div>
                    <div className='tableData'>{product.Condition}</div>
                    <div className='tableData'>{product.RevisedMarkup}</div>
                    <div className='tableData'>{product.Competitor}</div>
                    <div className='tableData'>{product.Price}</div>
                    <div className='tableData'>{product.MSRP2}</div>
                    <div className='tableData'>{product.MFGList}</div>
                    <div className='tableData'>{product.Cost}</div>
                    <div className='tableData'>{product.PriceCode}</div>
                    <div className='tableData'>{product.Multiplier}</div>
                    <div className='tableData'>{product.Markup}</div>
                    <div className='tableData'>{product.Preferred}</div>
                    <div className='tableData'>{product.Gold}</div>
                    <div className='tableData'>{product.Reseller}</div>
                    <div className='tableData'>{product.Volume}</div>
                    <div className='tableData'>{product.Special}</div>
                    <div className='tableData'>{product.ImageFilenameOverride}</div>
                    <div className='tableData'>{product.URL}</div>
                    <div className='tableData'>{product.ScrapeDate}</div>
                    <div className='tableData'>{product.Test}</div>

                    {
                     filter_headers.map((header, index)=>(
                      <div className='tableData'>{dictionary[header]}</div>
                     ))
                    }
                  </div>
                );
              })}


          </div>
        </div>
      </div>
     
    </div>
  );
}

export default BulkExcelManagement;
