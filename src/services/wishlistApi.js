import axios from 'axios';



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