import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../utils/api";
import "./adminproduct.css";
export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="admin-products-container">
      <h1>Manage Products</h1>

      <Link to="/admin/products/add">+ Add Product</Link>

      <div className="product-gallery-grid">
        {products.map((product) => (
          <div key={product._id} className="gallery-card">
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
            <p>{product.category}</p>

            <div className="gallery-card-actions">
              <button onClick={() => handleDelete(product._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
