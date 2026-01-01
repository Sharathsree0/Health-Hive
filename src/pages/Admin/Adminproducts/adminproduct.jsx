import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminproduct.css'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


    const [currentpage, setcurrentpage] = useState(0); 
    const [productsperpage] = useState(6);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:5001/products")
        setProducts(res.data)
      } catch (err) { console.error(err) }
      finally { setIsLoading(false) }
    }
    fetchdata()
  }, [])
  const handleToggleActive = async (productToUpdate) => {
    const updatedProduct = {
      ...productToUpdate,
      isActive: !productToUpdate.isActive,
    };
    try {
      await axios.put(`http://localhost:5001/products/${productToUpdate.id}`, updatedProduct);
      setProducts(currentProducts =>
        currentProducts.map(p => (p.id === productToUpdate.id ? updatedProduct : p))
      );
      toast.success(`Product has been ${updatedProduct.isActive ? 'activated' : 'deactivated'}.`);
    } catch (error) {
      toast.error("Failed to update product status.");
    }
  };
  

  const handledelect = async (productId) => {
    try {
      if (window.confirm('Are you sure you want to permanently delete this product?')) {
        await axios.delete(`http://localhost:5001/products/${productId}`)
        setProducts(products.filter(i => i.id !== productId))
        toast.success("product deleted successfully.")
      }
    } catch (err) { console.error(err) }
  }

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="admin-products-container">
      <div className="page-header">
        <div className="header-text">
          <h1>Manage Products</h1>
          <p>Here you can add new products, view, edit, and delete your products.</p>
        </div>
        <Link to="/admin/products/add" className="add-product-btn">+ Add New Product </Link>
      </div>

      <div className="product-gallery-grid">
        {products.map(product => (
          <div key={product.id} className="gallery-card">
            <div className="gallery-card-image-wrapper">
              <img src={product.image} alt={product.name} className="gallery-card-image" />
            </div>
            <div className="gallery-card-content">
              <span className="gallery-card-category">{product.category}</span>
              <h3 className="gallery-card-title">{product.name}</h3>
              <p className="gallery-card-price">₹{product.price}</p>
            </div>
            
            <div className="gallery-card-actions">
              <Link to={`/admin/products/edit/${product.id}`} className="edit-btn">Edit</Link>
               <button className={product.isActive ? 'deactivate-btn' : 'activate-btn'}onClick={() => handleToggleActive(product)}            >
                {product.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button className="delete-btn" onClick={() => handledelect(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}