import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import ProductForm from "./components/ProductForm";
import { addProduct } from "../../services/productsApi";

function AddProduct() {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    material: "",
    price: "",
    originalPrice: "",
    stock: 0,
    image: "",
    description: "",
    active: true,
    inStock: true,
  });

  const addProductMutation = useMutation({
    mutationFn: addProduct,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success("Product added successfully");

      navigate("/admin/adminproducts");
    },

    onError: () => {
      toast.error("Failed to add product");
    },
  });

  const handleSubmit = (e) => {

    e.preventDefault();

    const stock = Number(product.stock);

    const finalProduct = {
      ...product,

      price: Number(product.price),

      originalPrice:
        product.originalPrice === ""
          ? ""
          : Number(product.originalPrice),

      stock,

      inStock: stock > 0,

      active: stock > 0,
    };

    addProductMutation.mutate(finalProduct);
  };

  const handleCancel = () => {
    navigate("/admin/adminproducts");
  };

  return (
    <ProductForm
      product={product}
      setProduct={setProduct}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitText="Add Product"
      isSaving={addProductMutation.isPending}
    />
  );
}

export default AddProduct;