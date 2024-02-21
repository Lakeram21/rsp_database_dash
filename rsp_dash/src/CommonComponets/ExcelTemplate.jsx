import React,{useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { exportToExcel } from './ExportExcel';

function ExcelTemplate({filter_headers, fetchedProducts}) {
    const [excelLoading, setExcelLoading] = useState(false)
    let isExporting = true;
    const itemsPerPage = 100; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(fetchedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedProducts = fetchedProducts.slice(startIndex, endIndex);

    const exportFile = () => {
      try {
        // Assuming exportToExcel is an asynchronous operation
        exportToExcel(fetchedProducts);
    
        // Reset loading state after export is completed
      } catch (error) {
        console.error("Error exporting to Excel:", error);
      } 
    };
    
   

  return (
    <div className="mt-10">
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <div className="bg-white shadow-md rounded-md overflow-x-scroll overflow-y-scroll" style={{ maxHeight: '70vh' }}>
          {/* Header and Content Container */}
          <div className="bg-gray-200 sticky top-0 z-10">

            {/* Generate table headers dynamically */}
            <div className="flex flex-row border-b border-gray-300">
              {[
                'Product Name', 'Sku', 'Manufacturer', 'Manufacturer Part#', 'Supplier',
                'Related Products', 'Related Quantities', 'Obsolete Replacements', 'Shipping',
                'Shipping Time', 'Manufacturer Category', 'Category1', 'Category2', 'Category3',
                'Category4', 'Summary', 'Description', 'SEDescription', 'SETitle', 'Weight',
                'Shipping Weight', 'GTIN', 'Published', 'Condition', 'Revised Markup', 'Competitor',
                'Price', 'MFG List', 'MSRP', 'Cost', 'Price Code', 'Multiplier', 'Markup',
                'Preferred', 'Gold', 'Reseller', 'Volume Reseller', 'Special', 'Image Filename Override',
                'Url', 'Scrape Date', 'Test', ...filter_headers,
              ].map((header, index) => (
                <div key={index}
                className={`flex-grow py-2 px-4 border-r border-gray-300 bg-gray-200`}
                style={{ minWidth: '250px' }}
              >{index < 43 ? (
                      <p className="text-sm font-medium group">{header}</p>
                    ) : (
                      <p className="text-sm font-medium group">Filter {index-42}:{header}</p>
                    )}
                
                </div>
              ))}
            </div>
          </div>

          {/* Content Container */}
          <div >
            {/* Generate table rows dynamically */}
            {paginatedProducts?.map((product, index) => {
        
              
              //Getting the Filters to match their headers 
              const dictionary = {};
              const filter_dic = product.SectionNames
              if (filter_dic != null){
                const keyValuePairs = filter_dic?.split(',').map(pair => pair.trim());

                // Create a dictionary from the key-value pairs
                keyValuePairs.forEach(pair => {
                  const [key, value] = pair.split(':').map(item => item.trim());
                  dictionary[key] = value;
              });

              }
              
              return <div key={index} className="flex flex-row">
              {[
                'ProductName', 'SKU', 'Manufacturer', 'ManufacturerPartNumber', 'Supplier',
                'RelatedProducts', 'RelatedQuantities', 'Obsolete Replacements', 'MiscText',
                'ExtensionData', 'ManufacturerCategory', 'Category1', 'Category2', 'Category3',
                'Category4', 'Summary', 'Description', 'SEDescription', 'SETitle', 'Weight',
                'ShippingWeight', 'GTIN', 'Published', 'Condition', 'RevisedMarkup', 'Competitor',
                'Price', 'MFG LIST', 'MSRP', 'Cost', 'PriceCode', 'Multiplier', 'Markup',
                'Preferred', 'Gold', 'Reseller', 'Volume Reseller', 'Special', 'ImageFilenameOverride',
                'URL', 'ScrapeDate', 'Test', ...filter_headers,
              ].map((field, index) => (
                <div key={index} className="flex-grow py-2 px-4 border-r border-b border-gray-300" style={{ minWidth: '250px'}}>
                  {/* This is to place the filter in the right place */}
                  <div className="text-sm overflow-hidden max-h-6 hover:max-h-full">
                    {index < 43 ? (
                      <p className="text-sm">{product[field]}</p>
                    ) : (
                      dictionary[field]
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            })}
          </div>
        </div>

        {/* This is the Section under the data that shows the Page Index */}
        <div className='flex justify-between p-2'>

          <div className="flex">
            <button onClick={exportFile}>
             <FontAwesomeIcon icon={faFileExcel} className="text-orange-300 text-4xl"  />
            </button>
          </div>

          <div className="flex">
              <span className="mx-2 mt-2">
                Product Count: {fetchedProducts?.length}
              </span>
          </div>
          <div className="flex">
              <button
                className="mx-2 px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-2 mt-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="mx-2 px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
          </div>

        </div>
        
      </div>
    </div>

)}

export default ExcelTemplate