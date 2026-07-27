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

        const existingUser = data.fin

       if(name===""){
            setNameError('input is blank')
            return;
         }
         else{
            setNameError("")
         }
         if(!/^[A-Za-z0-9]+$/.test(name)){
          setNameError('name should be numbers and letters')
          return;

         }
         else{
            setNameError("")
         }
      

         if(!email.endsWith("@gmail.com")){
            setEmailError('not a valid email')
            return;
         }
         else{
            setEmailError('')
         }
         if(!/^[A-Za-z0-9@#$%&]+$/.test(password)){
             setPasswordError('password must be contains letters, numbers, and special charactors')
             return;
         }
         else{
            setPasswordError("")
         }
         if(confirmPassword!==password){
            setConfirmPasswordError('confirm password is rejected')
            return;
         }
         else{
            setConfirmPasswordError('')
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
            <input type="text" placeholder='enter name ...' onChange={(e)=>setName(e.target.value)} className='p-5 border border-brand-gold bg-brand-cream' />
            <input type="email" placeholder='enter email Address ...' onChange={(e)=>setEmail(e.target.value)} className='p-5 border border-brand-gold bg-brand-cream' />
            <input type="password" placeholder='password...' onChange={(e)=>setPassword(e.target.value)} className='p-5 border border-brand-gold bg-brand-cream'/>
            <input type="password" placeholder='confirm password ...' onChange={(e)=>setConfirmPassword(e.target.value)} className='p-5 border border-brand-gold bg-brand-cream' />
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