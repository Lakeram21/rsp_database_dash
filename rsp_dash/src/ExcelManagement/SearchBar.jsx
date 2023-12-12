import React, { useState } from 'react';


const SearchBar = ({ setCategory, category, setManufacturer, manufacturer, manufacturers, searchForm }) => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    searchForm(); // Call the searchForm function
  };

  return (
    <div className="search-form-container">
      <form onSubmit={searchForm} className="search-form">
        <div className="form-row">
          <label htmlFor="categoryInput">Enter a Category:</label>
          <input
            type="text"
            id="categoryInput"
            placeholder="Search based on category"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
            value={category}
          />
        </div>

        <div className="form-row">
          <label htmlFor="manufacturerDropdown">Select Manufacturer:</label>
          <select
            id="manufacturerDropdown"
            value={manufacturer}
            onChange={(event) => {
              setManufacturer(event.target.value);
            }}
          >
            <option value="">Select One</option>
            <option value="all">All</option>
            {manufacturers?.map((m, index) => (
              <option key={index} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SearchBar;
