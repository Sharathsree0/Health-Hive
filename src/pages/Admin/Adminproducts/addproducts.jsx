import { useState } from "react";
import api from "../../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/products", {
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      images: [data.image],
      isActive: true,
    });
    toast.success("Product added");
    navigate("/admin/products");
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Title" onChange={e => setData({...data,title:e.target.value})}/>
      <input placeholder="Category" onChange={e => setData({...data,category:e.target.value})}/>
      <input placeholder="Price" onChange={e => setData({...data,price:e.target.value})}/>
      <input placeholder="Image URL" onChange={e => setData({...data,image:e.target.value})}/>
      <textarea placeholder="Description" onChange={e => setData({...data,description:e.target.value})}/>
      <button>Add Product</button>
    </form>
  );
}
