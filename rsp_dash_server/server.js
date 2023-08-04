const express = require('express'),
      dbOperations = require("./database/dbOperations"),
      cors    = require("cors")


dbOperations.getAllProducts().then(response=>{
  console.log(response)
})

// const path = require('path');
// const sql = require('mssql');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // SQL Server database configuration
// const config = {
//   user: 'your_username',       // Your SQL Server username
//   password: 'your_password',   // Your SQL Server password
//   server: 'localhost',         // Your SQL Server instance (change if needed)
//   database: 'your_database',   // Your database name
//   options: {
//     enableArithAbort: true,
//   },
// };

// // Serve static files from the "build" directory in your React app
// app.use(express.static(path.join(__dirname, 'build')));

// // Define your server routes here, if needed

// // Example SQL query to retrieve data from the database
// app.get('/api/data', async (req, res) => {
//   try {
//     // Connect to the database
//     await sql.connect(config);

//     // Query the database
//     const result = await sql.query('SELECT * FROM your_table');

//     // Send the data as a JSON response
//     res.json(result.recordset);
//   } catch (error) {
//     console.error('Error executing SQL query:', error.message);
//     res.status(500).send('Server error');
//   } finally {
//     // Close the database connection
//     sql.close();
//   }
// });

// // Catch-all route to serve the React app
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// // });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
