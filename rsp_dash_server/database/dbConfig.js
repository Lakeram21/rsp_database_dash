const config = {
    user: "rspdash",
    password: "password",
    server: "DESKTOP-9BBIKSS",
    database: "RemoteSiteProducts",
    options: {
      trustServerCertificate: true,
      enableArithAbort: true,
      instanceName: "SQLEXPRESS",
      encrypt: true, // Enable encryption for added secur
    },
    port: 1433,
  };
  
  module.exports = config;
  