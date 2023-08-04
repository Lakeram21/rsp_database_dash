const config = require("./dbConfig");
const sql = require("mssql");
const fs = require("fs");
const util = require("util");
const Excel = require("exceljs");

const writeFileAsync = util.promisify(fs.writeFile);

const getAllProducts = async () => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(`SELECT TOP 10 * FROM Product`);
    let products = result.recordset;

    console.log("Products fetched from the database:", products);

    if (Array.isArray(products) && products.length > 0) {
      console.log("Number of products fetched:", products.length);
      // Export to Excel
      await exportToExcel(products, "products.xlsx");
    } else {
      console.log("No data found to export to Excel.");
    }
  } catch (error) {
    console.log(error);
  }
};

const exportToExcel = async (data, filename) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.log("Data is not an array or is empty.");
    return;
  }

  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Products");

  // Add header row
  const headerRow = worksheet.addRow(Object.keys(data[0]));
  headerRow.font = { bold: true };

  // Add data rows
  data.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });

  // Auto fit column width
  worksheet.columns.forEach((column) => {
    const header = column.header || ""; // Handle undefined or null header
    column.width = Math.max(12, header.length);
  });

  try {
    await workbook.xlsx.writeFile(filename);
    console.log(`Data successfully exported to ${filename}`);
  } catch (error) {
    console.log("Error exporting to Excel:", error);
  }
};

module.exports = {
  getAllProducts,
};
