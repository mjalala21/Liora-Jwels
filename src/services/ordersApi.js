import axios from 'axios';


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

export async function getAllOrders(){
  const response = await axios.get("http://localhost:3000/orders")

  return response.data;
}

export async function updateOrderStatus(orderId, status) {
  const response = await axios.patch(
    `http://localhost:3000/orders/${orderId}`,
    {
      status
    }
  );

  return response.data;
}
