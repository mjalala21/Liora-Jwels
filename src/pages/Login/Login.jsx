import React from 'react'
import { Link } from 'react-router-dom'


function Login() {
  return (
    <div className=' h-screen flex flex-col justify-center items-center'>
      <div className='w-3/6 border rounded-4xl text-center p-5'>
      <h1 className='text-5xl text-brand-brown font-extrabold'>Login</h1>
      <div className='flex flex-col gap-10  m-10 '>
        <input type = 'email' className='p-5 border border-brand-gold bg-brand-cream' />
        <input type="password" className='p-5 border border-brand-gold bg-brand-cream'  />
        <button className='bg-brand-beige p-5'>LogIn</button>
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