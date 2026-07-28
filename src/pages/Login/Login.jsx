import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../services/api'
import { useState} from 'react'


function Login() {

  const navigate = useNavigate()

const[email, setEmail] = useState("")
const[password, setPassword] = useState("")
const[rerror, setError] = useState({
  remail : "",
  rpassword : ""
})

const {data, isLoading} = useQuery({
  queryKey : ["users"],
  queryFn : getUsers
})
if(isLoading){
  return <p>Loading...</p>
}
function handleLogin(){
   console.log(data)
  const loginUser = data.find(user=>user.email===email)

  

 
 if(loginUser){
    setError({
      ...rerror,
      remail : "user not found"
    })
 }
if(password!==loginUser.password){
 setError({
  ...rerror,
  rpassword : "invalid password entered"
 })
}

localStorage.setItem("user", JSON.stringify(loginUser));

navigate('/')

}


  return (
    <div className=' h-screen flex flex-col justify-center items-center'>
      <div className='w-3/6 border rounded-4xl text-center p-5'>
      <h1 className='text-5xl text-brand-brown font-extrabold'>Login</h1>
      <div className='flex flex-col gap-10  m-10 '>
        <div><input type = 'email' placeholder='enter your email...' className=' w-full p-5 border border-brand-gold bg-brand-cream' onChange={(e)=>setEmail(e.target.value)}/></div>
        <div><input type="password" placeholder="enter password" className='w-full p-5 border border-brand-gold bg-brand-cream' onChange={(e)=>setPassword(e.target.value)}  /></div>
        <button className='bg-brand-beige p-5' onClick={handleLogin}>LogIn</button>
      </div>
      <div className='flex gap-5 justify-center'>
      <p className='p-2'>if you're not registerd yet ! </p>
      <Link to='/register'><button className='bg-brand-gold px-4 py-2 rounded-2xl'>Register</button></Link>
      </div>
</div>
    </div>
  )
}

export default Login