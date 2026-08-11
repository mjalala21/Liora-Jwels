import axios from 'axios';

  
export async function getProducts(){
    const response = await axios.get("http://localhost:3000/products")
    return response.data
  }

export async function addProducts(newProduct){
const response =  await axios.post("http://localhost:3000/products", newProduct)
return response.data
}

export async function deleteProduct(productId){
    const response = await axios.delete(`http://localhost:3000/products/${productId}`)
    return response.data
}

export async function updateProductById(product) {
  const response = await axios.patch(
    `http://localhost:3000/products/${product.id}`,
    {
      name: product.name,
      category: product.category,
      material: product.material,
      price: product.price,
      originalPrice: product.originalPrice,
      stock: product.stock,
      image: product.image,
      description: product.description,
    }
  );

  return response.data;
}