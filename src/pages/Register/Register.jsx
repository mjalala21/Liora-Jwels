import React from 'react'
import { Link } from 'react-router-dom'
import {useQuery, useMutation } from '@tanstack/react-query'
import { registerUsers, getUsers } from '../../services/api'
import { useState } from 'react'

function Register() {
 
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")

    const[error, setError] = useState({
      name : "",
      email : "",
      password : "",
      confirmPassword : ""
    })

     const[nameError, setNameError] = useState(null)
      const[emailError, setEmailError] = useState(null)
      const[passwordError, setPasswordError] = useState(null)
      const[confirmPasswordError, setConfirmPasswordError] = useState(null)

      const{data} = useQuery({
        queryKey : ["users"],
        queryFn : getUsers 
      })

          const registerMuatation = useMutation({
        mutationFn : registerUsers
    })

   
      const handleRegister = ()=>{

        const existingUser = data.find(user=>user.name===name)

        if(existingUser){
         return "user Already exsist"
        }

       if(name===""){
          setError({
            ...error,
            name : "name input is blank"
          })
          return;
         }
         else{
            setError({
            ...error,
            name : ""
         })
         }
         if(!/^[A-Za-z0-9]+$/.test(name)){
          setError({
            ...error,
            name : "name sould contain number and letters"
          })
          return;
         }
         else{
            setError({
            ...error,
            name : ""
         })}
      

         if(!email.endsWith("@gmail.com")){
            setError({
            ...error,
            email : "invalid email entered"
          })
          return;
         }
         else{
           setError({
            ...error,
            email : ""
         })
         }
         if(!/^[A-Za-z0-9@#$%&]+$/.test(password)){
            
              setError({
            ...error,
            password : "password must be contains letters, numbers, and special charactors"
          })
          return;

         }
         else{
            setError({
            ...error,
            password : ""
         })
         }
         if(confirmPassword!==password){
             setError({
            ...error,
            confirmPassword : "password not confirmed"
          })
          return;
         }
         else{
            setError({
            ...error,
            confirmPassword : ""
         })
         }
         
         
          const newUser={
            name : name,
            email: email,
            password: password,
            role : "user"
        

         }
    
    registerMuatation.mutate(newUser)

      }
  

  return (
    <div className='h-screen flex flex-col justify-center items-center '>
        <div  className='w-3/6 border rounded-4xl text-center p-5'>
        <h1 className='text-5xl text-brand-brown font-extrabold'>Register</h1>
        <div className='flex flex-col gap-10  m-10 '>
            <div><input type="text" placeholder='enter name ...' onChange={(e)=>setName(e.target.value)} className='w-full p-5 border border-brand-gold bg-brand-cream' /><p>{error.name}</p></div>
            <div><input type="email" placeholder='enter email Address ...' onChange={(e)=>setEmail(e.target.value)} className='w-full p-5 border border-brand-gold bg-brand-cream' /><p>{error.email}</p></div>
            <div><input type="password" placeholder='password...' onChange={(e)=>setPassword(e.target.value)} className='w-full p-5 border border-brand-gold bg-brand-cream'/><p>{error.password}</p></div>
            <div><input type="password" placeholder='confirm password ...' onChange={(e)=>setConfirmPassword(e.target.value)} className='w-full p-5 border border-brand-gold bg-brand-cream' /><p>{error.confirmPassword}</p></div>
            <button className='bg-brand-beige p-5' onClick={handleRegister}>Register</button>

        </div>
        <div className='flex gap-5 justify-center'>
        <p className='text-center p-2'>if you're already registered ! </p>
        <Link to='/login'><button className='bg-brand-gold px-4 py-2 rounded-2xl'>Login</button></Link>
        </div>
    </div>
    </div>
  )
}

export default Register