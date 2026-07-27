import React from 'react'
import Home from '../pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Cart from '../pages/cart/Cart'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Wishlist from '../pages/Wishlist/Wishlist'
import Products from '../pages/Products/Products'
import BestSeller from '../pages/Products/BestSellers'
import NewIn from '../pages/Products/NewIn'
import Category from '../pages/Category/Category'


function AppRoutes() {
  return (
    <div>
    <Routes>
        
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/wishlist' element={<Wishlist/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
           <Route path='/products/:category' element={<Category/>}></Route>
        <Route path='/bestsellers' element={<BestSeller/>}></Route>
        <Route path='/newin' element={<NewIn/>}></Route>
       

        


      </Routes>
    </div>
  )
}

export default AppRoutes