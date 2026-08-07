import axios from 'axios';



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
// export async function cleanCartItems(cartItems,userId){
//   const response= await axios.delete(`http://localhost:3000/carts/${userId}`, cartItems)
//   return response.data
// }

export async function cleanCartItems(cartItems){

  const deleteRequests = cartItems.map(item =>
    axios.delete(
      `http://localhost:3000/carts/${item.id}`
    )
  );

  const response = await Promise.all(deleteRequests);

  return response;
}


export async function updateCart(itemId, updatedData) {
  const response = await axios.patch(
    `http://localhost:3000/carts/${itemId}`,
    updatedData
  );

  return response.data;
}