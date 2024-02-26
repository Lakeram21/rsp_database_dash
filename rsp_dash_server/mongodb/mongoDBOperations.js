const {connectToCluster} = require("../mongodb/config")
const { ObjectId } = require('mongodb');

const createVendor = async(vendorData)=>{
    let mongoClient = await connectToCluster()
    const db = mongoClient.db('RSP_vendors')
    const collection = db.collection('vendor')
    try {
        const vendor = {
            vendorName: vendorData?.name,
            contactName: vendorData?.contact?.name,
            contactPhone: vendorData?.contact?.phone,
            contactEmail: vendorData?.contact?.email,
            brands: vendorData?.brands,
            fileLinks: vendorData?.fileLinks,
            portal: vendorData?.portal
        }
        const newVendor = await collection.insertOne(vendor);
        return newVendor
    } catch (error) {
        console.log(error)
        return error
    }
}


const getAllVendors = async()=>{
    
    let mongoClient = await connectToCluster()
    const db = mongoClient.db('RSP_vendors')
    const collection = db.collection('vendor')
    try {
        const allVendors = await collection.find().toArray();
        return allVendors
        
    } catch (error) {

        console.log(error)
        return error
    }
}

const updateVendor = async (id,vendorData) => {
    console.log(vendorData);
    let mongoClient = await connectToCluster();
    const db = mongoClient.db('RSP_vendors');
    const collection = db.collection('vendor');
    try {

      const filter = { _id: new ObjectId(String(id)) };// Assuming _id is the unique identifier for the document
  
      const update = {
        $set: {
          vendorName: vendorData?.vendorName,
          contactName: vendorData?.contact?.name,
          contactPhone: vendorData?.contact?.phone,
          contactEmail: vendorData?.contact?.email,
          brands: vendorData?.brands,
          fileLinks: vendorData?.fileLinks,
          portal: vendorData?.portal,
        },
      };
  
      const updated = await collection.updateOne(filter, update);
      return updated;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  



module.exports = {
    createVendor,
    getAllVendors,
    updateVendor,
}