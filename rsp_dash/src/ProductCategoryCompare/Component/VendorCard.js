import React, {useState} from "react";
import UpdateVendorForm from "./UpdateVendorForm"

function VendorCard({ vendor }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Handle the Vendor create
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-2 max-w-sm rounded overflow-hidden shadow-xl text-gray-600">
      <div className="px-6 py-4 bg-gray-300 text-white">
        <div className="flex justify-between items-center border-b mb-4 pb-2">
          <h2 className="font-bold text-2xl text-orange-400">{vendor?.vendorName}</h2>
          <img src="https://rspsupply.com/extensions/images/logo.png" className="w-12 h-12 object-cover rounded-full" alt="Vendor Logo" />
        </div>
      </div>

      <div className="px-6 py-4 border-b mb-4">
        <h3 className="text-lg font-bold mb-2">Contact Info</h3>
        <ul className="pl-5">
          <li>{vendor?.contactName}</li>
          <li>{vendor?.contactEmail}</li>
          <li>{vendor?.contactPhone}</li>
        </ul>
      </div>

      <div className="px-6 py-4 border-b mb-4">
        <h3 className="text-lg font-bold mb-2">List of Brands</h3>
        <div className="grid grid-cols-1 gap-2">
          {vendor?.brands?.map((brand, index) => (
            <div key={index}>{brand}</div>
          ))}
        </div>
      </div>

      <div className="px-6 py-4">
        <h3 className="text-lg font-bold mb-2">Reference Links</h3>
        {
          vendor?.fileLinks?.map((fileLink, index)=>{
            if(fileLink.link && /^https?:\/\//.test(fileLink.link))
            {
              return <div key={index}><a href={fileLink.link} className="text-blue-500" target="_blank" rel="noopener noreferrer" >{fileLink.name}</a></div>
            }
          })
        }
      </div>
      <div className="px-6 py-4">
        <h3 className="text-lg font-bold mb-2">Vendor Portal</h3>
        {vendor?.portal && /^https?:\/\//.test(vendor.portal) ? (
          <p>
            <a href={vendor.portal} className="text-blue-500" target="_blank" rel="noopener noreferrer">
              Visit Vendor Portal
            </a>
          </p>
        ) : (
          <p>No Portal</p>
        )}
      </div>

      <div className="px-6 py-4 flex justify-end">
        <button className="text-orange-300 px-4 py-2 rounded-md hover:text-orange-400"
        onClick={openModal}
        >Edit Vendor Info</button>
      </div>
      {isModalOpen && (
        <UpdateVendorForm onClose={closeModal} vendorToUpdate={vendor} />
      )}
    </div>
  );
}

export default VendorCard;
