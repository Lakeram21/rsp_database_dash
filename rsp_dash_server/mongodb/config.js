const { config } = require('dotenv');
const { MongoClient } =  require( 'mongodb');
config();

const connectToCluster = async()=> {
    let mongoClient;
    const uri = process.env.MONGODB_URI
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
 
        return mongoClient;
    } catch (error) {
        console.error('Connction to MongoDB Atlas failed!', error);
        process.exit();
    }
 }


 module.exports = {
    connectToCluster
 }
