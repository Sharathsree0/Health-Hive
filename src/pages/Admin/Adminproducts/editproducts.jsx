import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './adminProduct.css';

export default function EditProducts() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(`http://localhost:5001/products/${productId}`);
          setFormData(data);
        } catch (error) {
          console.error("Failed to fetch product for editing", error);
          toast.error("Could not find product data.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/products/${productId}`, formData);
      toast.success("Product updated successfully!");
      navigate('/admin/products'); 
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product.");
    }
  };

  if (isLoading) {
    return <div>Loading product for editing...</div>;
  }

  return (
    <div className="edit-product-container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit} className="edit-product-form">
        
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/Images/your-image-name.jpg"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="save-changes-btn">Save Changes</button>
      </form>
    </div>
  );
}