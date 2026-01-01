import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useCart } from '../Context/cartcontext';
import { useWishlist } from '../Context/wishlistcontext';
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSearchParams, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './product.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentpage, setcurrentpage] = useState(0); 
  const [productsperpage] = useState(6);

  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  const allCategories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  const displayedProducts = useMemo(() => {
    let filtered = [...products.filter(p => p.isActive)];
    if (categoryFilter) {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'low-to-high') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, categoryFilter, searchTerm, sortOrder]);
  

  const offset = currentpage * productsperpage;
  const currentProducts = displayedProducts.slice(offset, offset + productsperpage);
  const pageCount = Math.ceil(displayedProducts.length / productsperpage);

  const handlePageClick = ({ selected }) => {
    setcurrentpage(selected);
  };

  const handleCategoryClick = (category) => {
    setSearchParams({ category });
    setcurrentpage(0); 
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchTerm('');
    setSortOrder('default');
    setcurrentpage(0);
  };

  return (
    <div className="container">
      <h2 className="heading">Our Products</h2>

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search for products..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="sort-dropdown"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="category-filter-bar">
        <ul className="category-list">
          <li><button onClick={clearFilters}>All Products</button></li>
          {allCategories.map(category => (
            <li key={category}>
              <button onClick={() => handleCategoryClick(category)}>{category}</button>
            </li>
          ))}
        </ul>
      </div>

      {categoryFilter && (
        <div className="filter-header">
          Showing: <strong>{categoryFilter}</strong>
        </div>
      )}

      <ul className="list">
        {currentProducts.map(product => {
          const isInWishlist = wishlistItems.some(item => item.id === product.id);

          return (
            <li key={product.id} className="card">
              <div className="card-image-container">
                <img src={product.image} alt={product.name} className="image" />
                <div
                  className="wishlist-icon"
                  onClick={() =>
                    isInWishlist
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product)
                  }
                >
                  {isInWishlist ? <FaHeart color="#e74c3c" /> : <FaRegHeart />}
                </div>
              </div>
              <h3 className="title">{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">₹{product.price}</p>
              <div className="card-buttons">
                <Link to={`/products/${product.id}`} className="view-button">View</Link>
                <button className="add-to-cart" onClick={() => addToCart(product)}>
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}
