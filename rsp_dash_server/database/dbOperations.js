const configSQL = require("./dbConfig");
const sql = require("mssql");
const fs = require("fs");
const util = require("util");
const Excel = require("exceljs");

const config = configSQL
// Get All 
const getSupplierBasedOnCategoryAndManu = async (category, manufacturers) => {
  try {
    let pool = await sql.connect(config);

    // Replace spaces in category with wildcards
    const processedCategory = category.replace(/\s/g, '%');

    // Construct the WHERE condition for category
    const categoryCondition = `c.HierarchyName LIKE '%${processedCategory}%'`;

    // Construct the WHERE condition for manufacturers if provided
    const manufacturerCondition = manufacturers
      ? manufacturers.map(manufacturer => `m.Name LIKE '%${manufacturer}%'`).join(' OR ')
      : '';

    // Conditionally include manufacturerCondition in the WHERE clause
    const whereClause = [categoryCondition, manufacturerCondition].filter(Boolean).join(' AND ');

    let query = `
      SELECT
        c.HierarchyName as [Category Name],
        d.Name as Supplier,
        m.Name as Manufacturer
      FROM
        RemoteSiteProducts.dbo.Category AS c
      LEFT JOIN
        RemoteSiteProducts.dbo.ProductCategory AS pc ON pc.CategoryID = c.CategoryID
      LEFT JOIN
        RemoteSiteProducts.dbo.ProductManufacturer AS pm ON pm.ProductID = pc.ProductID
      LEFT JOIN
        RemoteSiteProducts.dbo.Manufacturer AS m ON m.ManufacturerID = pm.ManufacturerID
      LEFT JOIN
        RemoteSiteProducts.dbo.ProductDistributor AS pd ON pd.ProductID = pc.ProductID
      LEFT JOIN
        RemoteSiteProducts.dbo.Distributor AS d ON d.DistributorID = pd.DistributorID
      WHERE
        ${whereClause}
      GROUP BY
        c.HierarchyName, d.Name, m.Name;
    `;

    // Execute the query
    const result = await pool.request().query(query);

    // Close the connection
    await sql.close();

    // Return the result
    return result.recordset;
  } catch (error) {
    console.log("Fail to retrieve Suppliers: ", error);
    // Close the connection in case of an error
    await sql.close();
    // Optionally, you can throw the error for the calling code to handle
    throw error;
  }
}

// Get All Products Based on a Category
const getProductsOnCategory = async(category, manufacturer)=>{
  try {
    console.log(category, manufacturer)
    if (category === "all") {
      category = null;
    }
    if (manufacturer === "all")
    {
      manufacturer = null
    }

    let pool = await sql.connect(config);
    let query = `

    --This is for getting the Filters Right
    WITH SectionMapping AS (
      SELECT
          s.SectionID AS ChildSectionID,
          s.[Name] AS ChildSectionName,
          s.ParentSectionID AS ParentSectionID,
          p.[Name] AS ParentSectionName
      FROM
          [RemoteSiteProducts].[dbo].[Section] AS s
          LEFT JOIN [RemoteSiteProducts].[dbo].[Section] AS  p  ON s.ParentSectionID = p.SectionID
		  where s.Published = 1
  ),

  --This is for getting the Category paths 

  CategoryMapping AS (
    SELECT
        pc.ProductID,
        MAX(CASE WHEN c.HierarchyLevel = 1 THEN c.HierarchyName END) AS Category1,
        MAX(CASE WHEN c.HierarchyLevel = 2 THEN c.HierarchyName END) AS Category2,
        MAX(CASE WHEN c.HierarchyLevel = 3 THEN c.HierarchyName END) AS Category3,
        MAX(CASE WHEN c.HierarchyLevel = 4 THEN c.HierarchyName END) AS Category4,
        CONCAT(
            MAX(CASE WHEN c.HierarchyLevel = 1 THEN c.HierarchyName END),
            ' | ',
            MAX(CASE WHEN c.HierarchyLevel = 2 THEN c.HierarchyName END),
            ' | ',
            MAX(CASE WHEN c.HierarchyLevel = 3 THEN c.HierarchyName END),
            ' | ',
            MAX(CASE WHEN c.HierarchyLevel = 4 THEN c.HierarchyName END)
        ) AS CombinedCategories
    FROM
        [RemoteSiteProducts].[dbo].[Category] AS c
        INNER JOIN ProductCategory AS pc ON pc.CategoryID = c.CategoryID
        INNER JOIN Product AS p ON p.ProductID = pc.ProductID
    GROUP BY
        pc.ProductID
),

  price_mapping as (
  
		  SELECT
        ep.VariantID,
        MAX(CASE WHEN cl.Name = 'Preferred' and cl.CustomerLevelID = 1 THEN ep.Price END) AS Preferred,
        MAX(CASE WHEN cl.Name = 'Gold' THEN ep.Price END) AS Gold,
        MAX(CASE WHEN cl.Name = 'Reseller' THEN ep.Price END) AS Reseller,

        MAX(CASE WHEN cl.Name = 'Volume Reseller' THEN ep.Price END) AS Volume,
        MAX(CASE WHEN cl.Name = 'Special' THEN ep.Price END) AS Special
			FROM
				[RemoteSiteProducts].[dbo].[ExtendedPrice] AS ep
				JOIN ProductVariant AS pv ON pv.VariantID = ep.VariantID
				JOIN CustomerLevel AS cl ON ep.CustomerLevelID = cl.CustomerLevelID
			WHERE
				pv.Published = 1
			GROUP BY
				ep.VariantID
  )
  
  SELECT
      P.[ProductID],
      P.[Name] AS ProductName,
      P.[SKU],
      M.[Name] AS Manufacturer,
      P.[ManufacturerPartNumber],
      D.[Name] AS Supplier,
      -- Include other columns from the ProductSection table
      P.[RelatedProducts],
      P.[MiscText],
      P.[ExtensionData],
      P.[Summary],
      P.[Description],
      P.[SEDescription],
      P.[SETitle],
      P.[ImageFilenameOverride],
      P.[Published],
      pv.Weight,
      pv.GTIN,
      PV.Condition,
      PV.Price,
      PV.MSRP,
      PV.Cost,
      PV.Dimensions as [MFG LIST],
      P.ReplacementProducts as [Obsolete Replacements],
      pr_ma.Gold,
      pr_ma.Preferred,
      pr_ma.Reseller,
      pr_ma.Special,
      pr_ma.Volume as [Volume Reseller],
      MAX(cm.Category1) AS Category1,
      MAX(cm.Category2) AS Category2,
      MAX(cm.Category3) AS Category3,
      MAX(cm.Category4) AS Category4,
    
       -- Added column for category hierarchy
      STUFF((
          SELECT ', ' + 
              CASE 
                  WHEN sm.ParentSectionName IS NOT NULL THEN sm.ParentSectionName + ': ' + sm.ChildSectionName
                  ELSE sm.ChildSectionName
              END
          FROM [RemoteSiteProducts].[dbo].[ProductSection] AS ps_inner
          INNER JOIN SectionMapping AS sm ON sm.ChildSectionID = ps_inner.SectionID
          WHERE ps_inner.ProductID = P.ProductID
          FOR XML PATH(''), TYPE
      ).value('.', 'NVARCHAR(MAX)'), 1, 2, '') AS SectionNames
  FROM
      [RemoteSiteProducts].[dbo].[Product] AS p
      INNER JOIN ProductManufacturer AS PM ON p.[ProductID] = PM.[ProductID]
      left JOIN Manufacturer AS M ON M.[ManufacturerID] = PM.[ManufacturerID]
      left JOIN ProductDistributor AS PD ON p.[ProductID] = PD.[ProductID]
      left JOIN Distributor AS D ON PD.[DistributorID] = D.[DistributorID]
      left JOIN ProductSection AS ps ON p.ProductID = ps.ProductID
      left JOIN SectionMapping AS sm ON sm.ChildSectionID = ps.SectionID
      
      left JOIN ProductVariant as pv ON pv.ProductID = p.ProductID
      left JOIN CategoryMapping AS CM ON p.ProductID = CM.ProductID -- Joining with the CTE

	    left join price_mapping as pr_ma on pr_ma.VariantID = pv.VariantID
      
  WHERE  
  (${category === null ? '1 = 1' : 'LOWER(cm.CombinedCategories) LIKE LOWER(@category)'}
  AND 
  ${manufacturer === null ? '1 = 1' : 'LOWER(M.Name) LIKE LOWER(@manufacturer)'})

  GROUP BY
      P.[ProductID],
      P.[Name],
      P.[SKU],
      M.[Name],
      P.[ManufacturerPartNumber],
      D.[Name],
      P.[RelatedProducts],
      P.[MiscText],
      P.[ExtensionData],
      P.[Summary],
      P.[Description],
      P.[SEDescription],
      P.[SETitle],
      P.[ImageFilenameOverride],
      P.[Published],
      PV.Weight,
      PV.GTIN,
      PV.Condition,
      PV.Price,
      PV.MSRP,
      PV.Cost,
      P.ReplacementProducts,
      pr_ma.Gold,
      pr_ma.Preferred,
      pr_ma.Reseller,
      pr_ma.Special,
      pr_ma.Volume,
      cm.Category1,
      cm.Category2,
      cm.Category3,
      cm.Category4,
      PV.Dimensions
      -- Added column for category hierarchy
    `;
   
    console.log("category:", category)
    console.log("Manufacturer:", manufacturer)
    let results = await pool.request()
        // .input('category', sql.NVarChar, `${category}`) // Using parameterized query and applying wildcards to the parameter
    .input('manufacturer', sql.NVarChar, `%${manufacturer || ''}%`)
    .input('category', sql.NVarChar, `%${category || ''}%`) // Using parameterized query and applying wildcards to the parameter
    .query(query);

    let products = results.recordset;


    // Close the connection
    await sql.close();
    // Return the result
    
    const updatedData = products.map(product => {
      // Shift the Category
      if (product.Category1 == null){
        product.Category1 = product.Category2
        product.Category2 = product.Category3
        product.Category3 = product.Category4
      }
      /********Create multiplier****** */ 
      let mfg_list_price = product['MFG LIST'];
      let cost = product.Cost;

      if (mfg_list_price) {
        // Calculate the multiplier
        let multiplier = cost / mfg_list_price;

        // Round the multiplier to two decimal places
        multiplier = Math.round(multiplier * 100) / 100;
        multiplier = Number(multiplier).toFixed(2)
        product['Multiplier'] = multiplier
        
      }

      /********Markup****** */ 
      let price = product['Price']
      if (price && cost){
        let markup = (price/cost) - 1
        markup = Math.round(markup *100)/100
        markup = markup*100
        markup = Number(markup).toFixed(2)
        markup = markup.toString()+"%"
        product['Markup'] = markup
      }

      /*******Calculate Discount Level 1 */ 
      let preferred = product['Preferred']
      if(price && preferred){
        let dis_1 = 1-(preferred/price)
        dis_1 = Math.round(dis_1 *100)/100
        dis_1 = dis_1*100
        dis_1 = Number(dis_1).toFixed(2)
        dis_1 = dis_1.toString()+"%"
        product['Discount Level1'] = dis_1
      }

      /*******Calculate Discount Level 2 */ 
      let gold = product['Gold']
      if(price && gold){
        let dis_1 = 1-(gold/price)
        dis_1 = Math.round(dis_1 *100)/100
        dis_1 = dis_1*100
        dis_1 = Number(dis_1).toFixed(2)
        dis_1 = dis_1.toString()+"%"
        product['Discount Level2'] = dis_1
      }

      /*******Calculate Discount Level 3 */ 
      let reseller = product['Reseller']
      if(price && reseller){
        let dis_1 = 1-(reseller/price)
        dis_1 = Math.round(dis_1 *100)/100
        dis_1 = dis_1*100
        dis_1 = Number(dis_1).toFixed(2)
        dis_1 = dis_1.toString()+"%"
        product['Discount Level3'] = dis_1
      }

      /*******Calculate Discount Level 4 */ 
      let special = product['Special']
      if(price && special){
        let dis_1 = 1-(special/price)
        dis_1 = Math.round(dis_1 *100)/100
        dis_1 = dis_1*100
        dis_1 = Number(dis_1).toFixed(2)
        dis_1 = dis_1.toString()+"%"
        product['Discount Level4'] = dis_1
      }
      // Split SectionNames into key-value pairs

      const keyValuePairs = product.SectionNames?.split(',').map(pair => pair.trim().split(':').map(item => item.trim()));
   
      // Add key-value pairs directly to the product
      if (keyValuePairs) {
        
        // Add key-value pairs directly to the product
        keyValuePairs.forEach(([key, value]) => {
          if (key === "Manufacturer" && product[key] !== value) {
            product[key] = value;
          }
           
        });
      }
     
      return product;
    });
    console.log(updatedData.length)
    console.log(products.length)
   
    return updatedData
  } catch (error) {
    console.log("Fail to retrieve products: ", error);
    // Close the connection in case of an error
    await sql.close();
    // Optionally, you can throw the error for the calling code to handle
    throw error;
  }
  }


/**
 * Retrieves a list of manufacturers from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of manufacturers.
 * @throws {Error} Throws an error if the retrieval process fails.
 **/
const getAllManufacturer = async () => {
  try {
    let pool = await sql.connect(config);
    let query = `
      SELECT [ManufacturerID]
          ,[Name]
      FROM Manufacturer as m
      where m.Published = 1
    `;

    // Execute the query
    const result = await pool.request().query(query);

    // Close the connection
    await sql.close();

    // Return the result
    return result.recordset;
  } catch (error) {
    console.log("Fail to retrieve manufacturers: ", error);
    // Close the connection in case of an error
    await sql.close();
    // Optionally, you can throw the error for the calling code to handle
    throw error;
  }
};

// Get Products based on a sku
const getAllProducts = async (SKU) => {
  try {
      let pool = await sql.connect(config);
      let query = `
    
    WITH SectionMapping AS (
        SELECT s.SectionID AS ChildSectionID,
               s.[Name] AS ChildSectionName,
               s.ParentSectionID AS ParentSectionID,
               p.[Name] AS ParentSectionName
        FROM [RemoteSiteProducts].[dbo].[Section] AS s
        LEFT JOIN [RemoteSiteProducts].[dbo].[Section] AS p
        ON s.ParentSectionID = p.SectionID
    )

    SELECT TOP (10)
        P.[ProductID],
        P.[Name] AS ProductName,
        P.[SKU],
        M.[Name] AS Manufacturer,
        P.[ManufacturerPartNumber],
        D.[Name] As Supplier,
        -- Include other columns from the ProductSection table
        P.[RelatedProducts],
        P.[MiscText],
        P.[ExtensionData],
        P.[Summary],
        P.[Description],
        P.[SEDescription],
        P.[SETitle],
        P.[ImageFilenameOverride],
        P.[Published],
        STRING_AGG(
            CASE 
                WHEN sm.ParentSectionName IS NOT NULL THEN sm.ParentSectionName + ': ' + sm.ChildSectionName
                ELSE sm.ChildSectionName
            END, ', ') AS SectionNames
    FROM [RemoteSiteProducts].[dbo].[Product] AS p
    INNER JOIN [RemoteSiteProducts].[dbo].[ProductManufacturer] AS PM ON p.[ProductID] = PM.[ProductID]
    INNER JOIN [RemoteSiteProducts].[dbo].[Manufacturer] AS M ON M.[ManufacturerID] = PM.[ManufacturerID]
    INNER JOIN [RemoteSiteProducts].[dbo].[ProductDistributor] AS PD ON p.[ProductID] = PD.[ProductID]
    INNER JOIN [RemoteSiteProducts].[dbo].[Distributor] AS D ON PD.[DistributorID] = D.[DistributorID]
    INNER JOIN [RemoteSiteProducts].[dbo].[ProductSection] AS ps ON p.ProductID = ps.ProductID
    INNER JOIN SectionMapping AS sm ON sm.ChildSectionID = ps.SectionID
    WHERE sm.ParentSectionName IS NOT NULL and P.SKU LIKE @SKU
    GROUP BY P.[ProductID],
        P.[Name],
        P.[SKU],
        M.[Name],
        P.[ManufacturerPartNumber],
        D.[Name],
        P.[RelatedProducts],
        P.[MiscText],
        P.[ExtensionData],
        P.[Summary],
        P.[Description],
        P.[SEDescription],
        P.[SETitle],
        P.[ImageFilenameOverride],
        P.[Published]
        `;

        let results = await pool.request()
          .input('SKU', sql.NVarChar, `%${SKU}%`) // Using parameterized query and applying wildcards to the parameter
          .query(query);

        let products = results.recordset;

      return products;
  } catch (error) {
      console.log(error);
      throw error; // Rethrow the error for proper error handling ||
  }
};

const getAllProductsBasedOnManfacturerAndDescription = async (Manufacturer, Description) => {
  try {
    if (Description === "null") {
      Description = null;
    }
    if (Manufacturer == "null")
    {
      Manufacturer = null
    }

    console.log(Manufacturer, Description);
    let pool = await sql.connect(config);
    // AND (@DESCRIPTION IS NULL OR ${likeConditions})
    // // Split the Description into an array of words using non-alphanumeric characters as separators
    // const descriptionWords = Description ? Description.split(/\W+/) : [];

    // // Create a dynamic WHERE clause with multiple LIKE conditions
    // const likeConditions = descriptionWords.map(
    //   (word) =>
    //     `LOWER(P.[Description]) LIKE '%' + LOWER('${word.replace("'", "''")}') + '%'`
    // ).join(' AND ');

      let query = `
    
    WITH SectionMapping AS (
        SELECT s.SectionID AS ChildSectionID,
               s.[Name] AS ChildSectionName,
               s.ParentSectionID AS ParentSectionID,
               p.[Name] AS ParentSectionName
        FROM [RemoteSiteProducts].[dbo].[Section] AS s
        LEFT JOIN [RemoteSiteProducts].[dbo].[Section] AS p
        ON s.ParentSectionID = p.SectionID
    )

    SELECT TOP (100)
        P.[ProductID],
        P.[Name] AS ProductName,
        P.[SKU],
        M.[Name] AS Manufacturer,
        P.[ManufacturerPartNumber],
        D.[Name] As Supplier,
        -- Include other columns from the ProductSection table
        P.[RelatedProducts],
        P.[MiscText],
        P.[ExtensionData],
        P.[Summary],
        P.[Description],
        P.[SEDescription],
        P.[SETitle],
        P.[ImageFilenameOverride],
        P.[Published],
        STRING_AGG(
            CASE 
                WHEN sm.ParentSectionName IS NOT NULL THEN sm.ParentSectionName + ': ' + sm.ChildSectionName
                ELSE sm.ChildSectionName
            END, ', ') AS SectionNames
    FROM [RemoteSiteProducts].[dbo].[Product] AS p
    INNER JOIN [RemoteSiteProducts].[dbo].[ProductManufacturer] AS PM ON p.[ProductID] = PM.[ProductID]
    INNER JOIN [RemoteSiteProducts].[dbo].[Manufacturer] AS M ON M.[ManufacturerID] = PM.[ManufacturerID]
    INNER JOIN [RemoteSiteProducts].[dbo].[ProductDistributor] AS PD ON p.[ProductID] = PD.[ProductID]
    INNER JOIN [RemoteSiteProducts].[dbo].[Distributor] AS D ON PD.[DistributorID] = D.[DistributorID]
    INNER JOIN [RemoteSiteProducts].[dbo].[ProductSection] AS ps ON p.ProductID = ps.ProductID
    INNER JOIN SectionMapping AS sm ON sm.ChildSectionID = ps.SectionID

    
    WHERE (@MANU IS NULL OR LOWER(M.Name) LIKE LOWER(@MANU))
    AND (@DESCRIPTION IS NULL OR LOWER(P.[Description]) LIKE '%' + LOWER(@DESCRIPTION) + '%')

    GROUP BY P.[ProductID],
        P.[Name],
        P.[SKU],
        M.[Name],
        P.[ManufacturerPartNumber],
        D.[Name],
        P.[RelatedProducts],
        P.[MiscText],
        P.[ExtensionData],
        P.[Summary],
        P.[Description],
        P.[SEDescription],
        P.[SETitle],
        P.[ImageFilenameOverride],
        P.[Published]
        `;

        let results = await pool.request()
          .input('MANU', sql.NVarChar, `%${Manufacturer || ''}%`)
          .input('DESCRIPTION', sql.NVarChar, `%${Description || ''}%`) // Using parameterized query and applying wildcards to the parameter
          .query(query);

        let products = results.recordset;

      return products;
  } catch (error) {
      console.log(error);
      throw error; // Rethrow the error for proper error handling ||
  }
};

// Edit a product that was found by a sku
const editProduct = async (data) => {
    try {
        let pool = await sql.connect(config);
        let query = ``
    }
    catch (error) {
        console.log("Fail to edit: ", error)
    }
}



  
// Get all Catgory based on manufacturer
const getCategoryOnManufacturer = async(manufacturer)=>{
  try {
    let pool = await sql.connect(config);
    let query = `
    SELECT 
        p.ProductID
        ,p.Name as ProductName
        ,p.SKU
        ,p.SEAltText as ShortDescription
        ,c.Name as CategoryName
        ,m.Name as ManufacturerName
    FROM Product as p
      inner join ProductCategory as pc
      on p.ProductID = pc.ProductID
      inner join Category as c
      on c.CategoryID = pc.CategoryID
      inner join ProductManufacturer as pm
      on pm.ProductID = p.ProductID
      inner join Manufacturer as m
      on m.ManufacturerID = pm.ManufacturerID
      where m.Name = @manufacturer and m.Deleted = 0
    `;
    // Execute the query
    let results = await pool.request()
    .input('manufacturer', sql.NVarChar, `${manufacturer}`) // Using parameterized query and applying wildcards to the parameter
    .query(query);

    let products = results.recordset;

    // Close the connection
    await sql.close();

    // Return the result
    return products
  } catch (error) {
    console.log("Fail to retrieve manufacturers: ", error);
    // Close the connection in case of an error
    await sql.close();
    // Optionally, you can throw the error for the calling code to handle
    throw error;
  }
  }


// Get All Products Based on a Category
const getAllProductsCategory = async()=>{
  try {
    let pool = await sql.connect(config);
    let query = `
    SELECT distinct
      CategoryID,
      Name,
      HierarchyName
    FROM Category
    `;

    // Execute the query
    let results = await pool.request()
    .query(query);

    let products = results.recordset;
    // Close the connection
    await sql.close();

    // Return the result
    return products
  } catch (error) {
    console.log("Fail to retrieve categories: ", error);
    // Close the connection in case of an error
    await sql.close();
    // Optionally, you can throw the error for the calling code to handle
    throw error;
  }
  }





  module.exports = {
    getAllProducts,
    editProduct,
    getAllManufacturer,
    getCategoryOnManufacturer,
    getProductsOnCategory,
    getAllProductsBasedOnManfacturerAndDescription,
    getAllProductsCategory,
    getSupplierBasedOnCategoryAndManu,
  };
// Get all products  //
// const writeFileAsync = util.promisify(fs.writeFile);

// const getAllProducts = async () => {
//   try {
//     let pool = await sql.connect(config);
//     let result = await pool.request().query(`SELECT TOP 10 * FROM Product`);
//     let products = result.recordset;
//     return products
//     // console.log("Products fetched from the database:", products);

//     // if (Array.isArray(products) && products.length > 0) {
//     //   console.log("Number of products fetched:", products.length);
//     //   // Export to Excel
//     //   await exportToExcel(products, "products.xlsx");
//     // } else {
//     //   console.log("No data found to export to Excel.");
//     // }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const exportToExcel = async (data, filename) => {
//   if (!Array.isArray(data) || data.length === 0) {
//     console.log("Data is not an array or is empty.");
//     return;
//   }

//   const workbook = new Excel.Workbook();
//   const worksheet = workbook.addWorksheet("Products");

//   // Add header row
//   const headerRow = worksheet.addRow(Object.keys(data[0]));
//   headerRow.font = { bold: true };

//   // Add data rows
//   data.forEach((row) => {
//     worksheet.addRow(Object.values(row));
//   });


//   // Auto fit column width
//   worksheet.columns.forEach((column) => {
//     const header = column.header || ""; // Handle undefined or null header
//     column.width = Math.max(12, header.length);
//   });


//   try {
//     await workbook.xlsx.writeFile(filename);
//     console.log(`Data successfully exported to ${filename}`);
//   } catch (error) {
//     console.log("Error exporting to Excel:", error);
//   }
// };


