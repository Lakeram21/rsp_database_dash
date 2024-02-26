import React, { useState, useEffect } from 'react';
import { updateVendor } from '../../Utils/utils';

const UpdateVendorForm = ({ onClose, vendorToUpdate }) => {
  const [vendorData, setVendorData] = useState({
    vendorName: '',
    brands: [],
    contact: {
      name: '',
      phone: '',
      email: '',
    },
    fileLinks: [
      {
        name: '',
        link: '',
      },
    ],
    portal: '',
  });

  useEffect(() => {
    setVendorData({
      vendorName: vendorToUpdate?.vendorName || '',
      brands: vendorToUpdate?.brands || [],
      contact: {
        name: vendorToUpdate?.contactName || '',
        phone: vendorToUpdate?.contactPhone || '',
        email: vendorToUpdate?.contactEmail || '',
      },
      fileLinks: vendorToUpdate?.fileLinks || [{ name: '', link: '' }],
      portal: vendorToUpdate?.portal || '',
    });
  }, [vendorToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'brands') {
      setVendorData((prevData) => ({
        ...prevData,
        brands: value.split(',').map((brand) => brand.trim()),
      }));
    } else if (name.startsWith('contact')) {
      const [contactProp, contactPropKey] = name.split('-');
      setVendorData((prevData) => ({
        ...prevData,
        contact: {
          ...prevData.contact,
          [contactPropKey]: value,
        },
      }));
    } else if (name.startsWith('fileLinks')) {
      const [, index, field] = name.split('-');
      setVendorData((prevData) => ({
        ...prevData,
        fileLinks: prevData.fileLinks.map((link, i) =>
          i === Number(index)
            ? { ...link, [field]: value }
            : link
        ),
      }));
    } else {
      setVendorData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddFileLink = () => {
    setVendorData((prevData) => ({
      ...prevData,
      fileLinks: [
        ...prevData.fileLinks,
        { name: '', link: '' },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !vendorData.vendorName ||
      !vendorData.brands.length ||
      !vendorData.contact.name ||
      (!vendorData.contact.phone && !vendorData.contact.email)
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const updatedVendor = await updateVendor(
        vendorToUpdate._id,
        vendorData
      );
      console.log('Vendor data updated: ', updatedVendor);
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 bg-white p-6 rounded-md shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-6">Update Vendor Form</h2>

        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="vendorName"
            value={vendorData.vendorName}
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
          Contact Name:
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
          />
        </label>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">File Links</h3>
          {vendorData.fileLinks.map((link, index) => (
            <div key={index} className="flex items-center mb-2">
              <label className="block w-1/2 pr-2">
                Name:
                <input
                  type="text"
                  name={`fileLinks-${index}-name`}
                  value={link.name}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </label>
              <label className="block w-1/2 pl-2">
                Link:
                <input
                  type="text"
                  name={`fileLinks-${index}-link`}
                  value={link.link}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFileLink}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add File Link
          </button>
        </div>

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
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateVendorForm;
