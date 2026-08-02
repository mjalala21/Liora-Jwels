  
import axios from 'axios';
  
export async function getProducts(){
    const response = await axios.get("http://localhost:3000/products")
    return response.data
  }

export async function registerUsers(user){
    const response = await axios.post("http://localhost:3000/users",user)
    return response.data
}

export async function getUsers(){
    const response = await axios.get("http://localhost:3000/users")
    return response.data
}

export async function addToCart(item){
    const response = await axios.post("http://localhost:3000/carts",item)

    return response.data
}

export async function getCart(userId){
    const response = await axios.get(`http://localhost:3000/carts?userId=${userId}`)
    return response.data
}

export async function removeItemfromCart(itemId){
    const response = await axios.delete(`http://localhost:3000/carts/${itemId}`)
    return response.data
}

export async function placeOrders(itemToOrder){
    const response = await axios.post("http://localhost:3000/orders", itemToOrder)
    return response.data
}

export async function getOrders(userId) {
  const response = await axios.get(
    `http://localhost:3000/orders?userId=${userId}`
  );
  return response.data;
}



export async function updateCart(itemId, updatedData) {
  const response = await axios.patch(
    `http://localhost:3000/carts/${itemId}`,
    updatedData
  );

  return response.data;
}

export async function getWishlist(userId){

  const response = await axios.get(
    `http://localhost:3000/wishlist?userId=${userId}`
  );

  return response.data;

}



export async function addToWishlist(item){

  const response = await axios.post(
    "http://localhost:3000/wishlist",
    item
  );

  return response.data;

}



export async function removeFromWishlist(id){

  const response = await axios.delete(
    `http://localhost:3000/wishlist/${id}`
  );

  return response.data;

}