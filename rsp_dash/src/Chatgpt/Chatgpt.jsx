import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

const Chatgpt = () => {
  const [selectedData, setSelectedData] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const binaryString = event.target.result;

        // Parse Excel content using xlsx
        const workbook = XLSX.read(new Uint8Array(binaryString), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Extract data based on headers (case-insensitive)
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          defval: '',
          raw: false,
          cellDates: false,
          cellStyles: false,
          blankrows: false,
          range: 0,
          skipHeader: false,
          includeSheets: null,
          password: '',
          sheetRows: undefined,
          rawNumbers: false,
          dateNF: 'yyyy-MM-ddTHH:mm:ss.SSSZ',
        });

        // Extract all columns from the Excel file
        const allColumns = jsonData[0];

        // Example: Extract data based on headers "Sku" and "Description" (case-insensitive)
        const selectedHeaders = ["Sku", "Description"];

        // Find the indices of selected headers in allColumns
        const headerIndices = selectedHeaders.map((header) =>
          allColumns.findIndex((col) => col.toLowerCase() === header.toLowerCase())
        );

        // Map data based on selected headers
        const selectedData = jsonData.map((row) =>
          Object.fromEntries(
            headerIndices
              .filter((index) => index !== -1) // Exclude headers not found
              .map((index) => [selectedHeaders[index], row[index]])
          )
        );

        // Perform operations on selected data (replace with your logic)
        // For demonstration, we'll log the selected data
        console.log('Selected Data:', selectedData);

        // Update state with the selected data
        setSelectedData(selectedData);
      };

      reader.readAsArrayBuffer(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an Excel file here, or click to select one</p>
      </div>

      {selectedData && (
        <div>
          <h3>Selected Data</h3>
          <pre>{JSON.stringify(selectedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Chatgpt;
