const config = require("./dbConfig");
const sql = require("mssql");
const fs = require("fs");
const util = require("util");
const Excel = require("exceljs");



const getAllProducts = async (SKU) => {
  try {
      let pool = await sql.connect(config);
      let query = `
   
    
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
        P.[Published]
    FROM
        [RemoteSiteProducts].[dbo].[Product] AS P
    JOIN
        [RemoteSiteProducts].[dbo].[ProductManufacturer] AS PM ON P.[ProductID] = PM.[ProductID]
    JOIN
        [RemoteSiteProducts].[dbo].[Manufacturer] AS M ON M.[ManufacturerID] = PM.[ManufacturerID]
    JOIN
        [RemoteSiteProducts].[dbo].[ProductDistributor] AS PD ON P.[ProductID] = PD.[ProductID]
    JOIN
        [RemoteSiteProducts].[dbo].[Distributor] AS D ON PD.[DistributorID] = D.[DistributorID]
    WHERE
        P.SKU LIKE @SKU;
      `;

      let results = await pool.request()
          .input('SKU', sql.NVarChar, `%${SKU}%`) // Using parameterized query and applying wildcards to the parameter
          .query(query);

      let products = results.recordset;
      return products;
  } catch (error) {
      console.log(error);
      throw error; // Rethrow the error for proper error handling
  }
};

// Get all products
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

module.exports = {
  getAllProducts,
};
