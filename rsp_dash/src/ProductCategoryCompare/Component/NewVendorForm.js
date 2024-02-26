// NewVendorForm.js

import React, { useState } from 'react';
import { createNewVendor } from "../../Utils/utils";

const NewVendorForm = ({ onClose }) => {
  const [vendorData, setVendorData] = useState({
    name: '',
    brands: [''],
    contact: {
      name: '',
      phone: '',
      email: ''
    },
    fileLinks: [
      {
        name: '',
        link: ''
      }
    ],
    portal: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'brands') {
      setVendorData((prevData) => ({
        ...prevData,
        brands: value.split(',').map((brand) => brand.trim())
      }));
    } else if (name.startsWith('contact')) {
      const [contactProp, contactPropKey] = name.split('-');
      setVendorData((prevData) => ({
        ...prevData,
        contact: {
          ...prevData.contact,
          [contactPropKey]: value
        }
      }));
    } else if (name.startsWith('fileLinks')) {
      const [fileLinksProp, fileLinksPropKey, index] = name.split('-');
      setVendorData((prevData) => {
        const updatedFileLinks = [...prevData.fileLinks];
        updatedFileLinks[index][fileLinksPropKey] = value;
        return {
          ...prevData,
          fileLinks: updatedFileLinks
        };
      });
    } else {
      setVendorData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !vendorData.name ||
      !vendorData.brands.length ||
      !vendorData.contact.name ||
      (!vendorData.contact.phone && !vendorData.contact.email)
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      console.log('Vendor data submitted:', vendorData);
      const newvendor = await createNewVendor(vendorData);
      // You can add logic to handle form submission (e.g., API call)
      onClose(); // Close the modal after submission
    } catch (error) {

    }

  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 bg-white p-6 rounded-md shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-6">New Vendor Form</h2>

        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={vendorData.name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            required
          />
        </label>

        <label className="block mb-2">
          Brands (Comma-separated):
          <input
            type="text"
            name="brands"
            value={vendorData.brands.join(', ')}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            required
          />
        </label>

        <label className="block mb-2">
          Contact Name:<span className='text-xs'> (If you don't have a name, place "Sales Rep")</span>
          <input
            type="text"
            name="contact-name"
            value={vendorData.contact.name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            required
          />
        </label>

        <label className="block mb-2">
          Contact Phone:
          <input
            type="text"
            name="contact-phone"
            value={vendorData.contact.phone}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            required
          />
        </label>

        <label className="block mb-2">
          Contact Email:
          <input
            type="text"
            name="contact-email"
            value={vendorData.contact.email}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            required
          />
        </label>

        <label className="block mb-2">
          Vendor Portal Link:
          <input
            type="text"
            name="portal"
            value={vendorData.portal}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
          />
        </label>

        <label className="block mb-2">
          Reference Links:
          {vendorData.fileLinks.map((fileLink, index) => (
            <div key={index}>
              <input
                type="text"
                name={`fileLinks-name-${index}`}
                value={fileLink.name}
                onChange={handleChange}
                placeholder="Link Name"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
              <input
                type="text"
                name={`fileLinks-link-${index}`}
                value={fileLink.link}
                onChange={handleChange}
                placeholder="Link URL"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setVendorData((prevData) => ({
                ...prevData,
                fileLinks: [
                  ...prevData.fileLinks,
                  { name: '', link: '' },
                ],
              }))
            }
          >
            Add File Link
          </button>
        </label>

        <div className="flex mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewVendorForm;
