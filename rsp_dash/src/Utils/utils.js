

/***************
 * MONGODB Enpoints
 * 
 *******************/
export const getAllVendorDetails = async()=>{
  try {
    const response = await fetch('http://localhost:8080/api/allvendor', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error; // Re-throw the error for the calling code to handle
  }
}

export const createNewVendor = async (newvendorData) => {
  try {
    const response = await fetch('http://localhost:8080/api/createvendor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newvendorData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log(responseData);

  } catch (error) {
    console.error('Error updating record:', error);
  }
};

export const updateVendor = async (id,vendorData) => {
  try {
    const response = await fetch(`http://localhost:8080/api/editVendor/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendorData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData

  } catch (error) {
    console.error('Error updating record:', error);
  }
};

/****************
 * SQL Enpoints
 * 
 ***************************/
// This function is used to checjk if the data was edited
export const checkEdits= (originalData, updatedData, filter, updatedFilter)=>{
    for(const key in originalData){
        if(originalData[key] != updatedData[key]){
            // Chekc what was changed
            console.log(`${originalData[key]} was changed`)
            return true
        }
    }
    for(const key in filter){
        if(filter[key] != updatedFilter[key]){
            // Chekc what was changed
            console.log(`${filter[key]} was changed`)
            return true
        }
       
    }
    return false
}

export const updateRecord = (updatedData, updatedFilters)=> {
    fetch('http://localhost:8080/api/product', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedData, updatedFilters }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error updating record:', error);
    });
  }

  // Get all manufacturer
export const getAllManufacturer = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/allmanufacturer', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating record:', error);
      throw error; // Re-throw the error for the calling code to handle
    }
  };

export const getAllSupplierOnCategoryNManu = async (category, manufacturers) => {
    try {
      const response = await fetch('http://localhost:8080/api/supplier', {
        method: 'POST',
        body:JSON.stringify({
          "category": category,
          "manufacturers": manufacturers
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating record:', error);
      throw error; // Re-throw the error for the calling code to handle
    }
  };

export const getAllCategoryOnManufacturer = async (manufacturer) => {
    try {
      const response = await fetch(`http://localhost:8080/api//allcategoryonmanufacturer/${manufacturer}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating record:', error);
      throw error; // Re-throw the error for the calling code to handle
    }
  };
  

export const getAllProductsOnCategory_manufacturer = async (category, manufacturer) => {
    try {
      console.log(category, manufacturer)
      const url = `http://localhost:8080/api/allproductsoncategories/${encodeURIComponent(category || 'all')}/${encodeURIComponent(manufacturer || 'all')}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting record:', error);
      throw error; // Re-throw the error for the calling code to handle
    }
  };
  
  