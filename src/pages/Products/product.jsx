import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useCart } from "../Context/cartcontext";
import { useWishlist } from "../Context/wishlistcontext";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { useSearchParams, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./product.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const categoryFilter = searchParams.get("category");

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  /* ================= CATEGORIES ================= */
  const allCategories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  /* ================= FILTER + SORT ================= */
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.isActive);

    if (categoryFilter) {
      list = list.filter((p) => p.category === categoryFilter);
    }

    if (searchTerm) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "low-to-high") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, categoryFilter, searchTerm, sortOrder]);

  /* ================= PAGINATION ================= */
  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    offset,
    offset + productsPerPage
  );
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleCategoryClick = (category) => {
    setSearchParams({ category });
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchTerm("");
    setSortOrder("default");
    setCurrentPage(0);
  };

  /* ================= UI ================= */
  return (
    <div className="container">
      <h2 className="heading">Our Products</h2>

      {/* SEARCH + SORT */}
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

      {/* CATEGORY FILTER */}
      <div className="category-filter-bar">
        <ul className="category-list">
          <li>
            <button onClick={clearFilters}>All Products</button>
          </li>
          {allCategories.map((category) => (
            <li key={category}>
              <button onClick={() => handleCategoryClick(category)}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* PRODUCTS GRID */}
      <ul className="list">
        {currentProducts.map((product) => {
          const isInWishlist = wishlistItems.some(
            (item) => item.id === product._id
          );

          const imageUrl =
            product.images?.[0]?.url ||
            "https://via.placeholder.com/300x300?text=No+Image";

          return (
            <li key={product._id} className="card">
              <div className="card-image-container">
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="image"
                />

                <div
                  className="wishlist-icon"
                  onClick={() =>
                    isInWishlist
                      ? removeFromWishlist(product._id)
                      : addToWishlist(product)
                  }
                >
                  {isInWishlist ? (
                    <FaHeart color="#e74c3c" />
                  ) : (
                    <FaRegHeart />
                  )}
                </div>
              </div>

              <h3 className="title">{product.title}</h3>
              <p className="category">{product.category}</p>
              <p className="price">₹{product.price}</p>

              <div className="card-buttons">
                <Link
                  to={`/products/${product._id}`}
                  className="view-button"
                >
                  View
                </Link>

                <button
                  className="add-to-cart"
                  onClick={() => addToCart(product._id)}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* PAGINATION */}
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
