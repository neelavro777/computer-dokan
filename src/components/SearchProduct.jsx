import React, { useState } from 'react';

const SearchProduct = ({ products, onProductClick }) => {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    // Filter products based on search term
    const filtered = products.filter(item =>
      item.product.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  // Function to handle click on dropdown item
  const handleDropdownClick = (product) => {
    setSearch("");
    setFilteredProducts([]);
    onProductClick(product);
  };

  return (
    <div>
      <input
        type="text"
        className="form-control mt-3"
        placeholder="Search by product name"
        value={search}
        onChange={handleSearchChange}
      />
      {search.trim() !== "" && (
        <ul className="list-group mt-2">
          {filteredProducts.map((data) => (
            <li
              onMouseOver={(e) => e.target.classList.add("active")}
              onMouseOut={(e) => e.target.classList.remove("active")}
              key={data.id} // Assuming there's an 'id' property
              className="list-group-item"
              onClick={() => handleDropdownClick(data)}
            >
              {data.product}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchProduct;
