const { config } = require('dotenv');
config();

const configSQL = {
    user: process.env.SQL_USER,
    password:  process.env.SQL_PASS,
    server: process.env.SQL_SERVER,
    // server: "138.68.224.200",
    database: process.env.SQL_DB_NAME,
   
    options: {
      // trustServerCertificate: true,
      // enableArithAbort: true,
      // instanceName: "SQLEXPRESS",
      encrypt: false, // Enable encryption for added secur
      requestTimeout: 1200000
    },
    
    // port: 1433,
  };
  
  module.exports = configSQL;
  