import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './adminproduct.css'
export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    isActive:'',
    price: '',
    image: '',
    description: '',
    nutritionFacts: {
      servingSize: '',
      calories: '',
      protein: '',
      carbs: ''
    }
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      nutritionFacts: {
        ...prevData.nutritionFacts, 
        [name]: value,         
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/products', formData);
      toast.success("Product added successfully!");
      navigate('/admin/products');
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="add-product-container">
      <h2 className='heading-h2' >Add New Product </h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="isActive">isActive</label>
          <input type="text" id="isActive" name="isActive" value={formData.isActive} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} placeholder="/Images/your-image.jpg" required />
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} required></textarea>
        </div>

        <fieldset className="nutrition-fieldset">
          <legend>Nutrition Facts</legend>
          <div className="form-group">
            <label htmlFor="servingSize">Serving Size</label>
            <input type="text" id="servingSize" name="servingSize" value={formData.nutritionFacts.servingSize} onChange={handleNutritionChange} />
          </div>
          <div className="form-group">
            <label htmlFor="calories">Calories</label>
            <input type="text" id="calories" name="calories" value={formData.nutritionFacts.calories} onChange={handleNutritionChange} />
          </div>
          <div className="form-group">
            <label htmlFor="protein">Protein</label>
            <input type="text" id="protein" name="protein" value={formData.nutritionFacts.protein} onChange={handleNutritionChange} />
          </div>
          <div className="form-group">
            <label htmlFor="carbs">Carbs</label>
            <input type="text" id="carbs" name="carbs" value={formData.nutritionFacts.carbs} onChange={handleNutritionChange} />
          </div>
        </fieldset>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
}