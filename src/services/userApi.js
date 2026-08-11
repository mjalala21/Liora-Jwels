import axios from 'axios';

export async function registerUsers(user){
    const response = await axios.post("http://localhost:3000/users",user)
    return response.data
}

export async function getUsers(){
    const response = await axios.get("http://localhost:3000/users")
    return response.data
}

export async function getUserById(id) {
  const response = await axios.get(`http://localhost:3000/users/${id}`);
  return response.data;
}

export async function deleteUserById(id){
   const response = await axios.delete(`http://localhost:3000/users/${id}`);
   return response.data
}

export async function updateUserById(user){
    const response = await axios.patch(`http://localhost:3000/users/${user.id}`,
        {
            status : user.status
        }
    )

    return response.data
}