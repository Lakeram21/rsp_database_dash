
import * as XLSX from 'xlsx';

export const exportToExcel =  (products) => {
 
      return new Promise((resolve, reject)=>{

      try{
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
            'Gold', 'Reseller', 'Volume Reseller', 'Special',
            '', '','','', '','','','', '','','', '','','','','','',
            'Discount Level1','Discount Level2','Discount Level3','Discount Level4',
            'Discount Level5','Discount Level6','Discount Level7','Discount Level8',
            'Discount Level9','Discount Level10','Discount Level11','Discount Level12','Discount Level13',
            'Discount Level14','Discount Level15','Discount Level16','Discount Level17','Discount Level18',
            'Discount Level19','Discount Level20','Discount Level21','Discount Level22',
            'ImageFilenameOverride',
            'URL', 'ScrapeDate', 'Test'
          ];
          
          const additionalHeader_above = [
            'Product Fields', 
            '', '', '','', '', '','', '', '','', 
            'Import File Version:', '3.0', 'You cannot delete the first 3 header rows of this spreadhsheet!',
            '', '', '', '', '','', '', '', '', '','', '','', '','', '', '', '', '', 
            'Remote Site Products Price Structure				',
            '', '', '', '', 
            // This is the extra level
            '', '','','', '','','','', '','','', '','','','','','',
            // this is discount level
            '', '','','', '','','','', '','','', '','','','','','',,'','','','',
            'Product-Fields',
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
            'Level 2', 'Level 3', 'Level 4', 'Level 5','Level 6',
            // This is the extra level
            'Level 7', 'Level 8','Level 9','Level 10', 'Level 11','Level 12','Level 13','Level 14', 'Level 15','Level 16','Level 17',
            'Level 18','Level 19','Level 20','Level 21','Level 22',
            // this is discount level
            'Preferred', 'Gold','Volume Reseller','Special', '','','','', '','','', '','','','','','',,'','','','',
            '(text-field)',
            '', '', ''
          ];

          const filterheader = []
          // Create a new array with organized data
          const organizedData = products?.map(product => {
            const organizedProduct = {};
            
            // Map data based on the ordered headers
            orderedHeaders.forEach(header => {
              organizedProduct[header] = product[header] !== undefined && product[header] !== null ? product[header] : '';
            });
        
            // Add additional headers from SectionNames
            if (product.SectionNames) {
              const sectionNames = product.SectionNames.split(', ').map(pair => pair.trim().split(':'));
              sectionNames.forEach(pair => {
                if (pair.length > 1) {
                  const key = pair[0].trim();
                  const value = pair[1].trim();
                  
                  if (organizedProduct[key]) {
                    // If key already exists, append the new value with a comma
                    // Except for Manafacturer because its a double header name
                    if(key != "Manufacturer"){
                      organizedProduct[key] += `, ${value}`;
                    }
                    
                  } else {
                    organizedProduct[key] = value;
                    if (!filterheader.includes(key) && key !== "Manufacturer") {
                      filterheader.push(key);
                    }
                  }
                }
              });
            }
        
            return [organizedProduct, filterheader];
          });
          
            // Create a new array with strings "Filter" + index
            const newArray = Array.from({ length: filterheader.length }, (_, index) => "Filter" + (index + 1));
        
            const worksheet = XLSX.utils.json_to_sheet([{}, ...organizedData.map(entry => entry[0])], { header: orderedHeaders, origin: { r: headerRow, c: startCol }},);
            
            // XLSX.utils.sheet_add_json(worksheet, organizedData.map(entry => entry[0]), { skipHeader: true, origin: { r: startRow, c: startCol } });
          
            // Add additional headers from SectionNames starting from headerRow + the number of rows in organizedData + 1
            XLSX.utils.sheet_add_json(worksheet, [{}], { header: additionalHeader_below, skipHeader: false, origin: { r: headerRow+1, c: startCol} });
            XLSX.utils.sheet_add_json(worksheet, [{}], { header: additionalHeader_above, skipHeader: false, origin: { r: 0, c: startCol} });

            // Filter header and data
            XLSX.utils.sheet_add_json(worksheet, [{}], { header: filterheader, skipHeader: false, origin: { r: headerRow+1, c: 81} });
            
            XLSX.utils.sheet_add_json(worksheet, [{}], { header: newArray, skipHeader: false, origin: { r: headerRow, c: 81} });

            // Create workbook and save
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
            XLSX.writeFile(workbook, 'products.xlsx');
            resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

    