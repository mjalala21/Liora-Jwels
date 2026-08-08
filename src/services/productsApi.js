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