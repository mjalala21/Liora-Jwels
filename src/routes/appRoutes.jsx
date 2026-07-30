import React from 'react'
import Home from '../pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Cart from '../pages/Cart/Cart'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Wishlist from '../pages/Wishlist/Wishlist'
import Products from '../pages/Products/Products'
import BestSeller from '../pages/Products/BestSellers'
import Category from '../pages/Category/Category'
import UserLayout from '../layouts/UserLayout'
import AuthLayout from '../layouts/AuthLayout'
import NotFound from '../pages/NotFound/NotFound'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import PromiseSection from '../pages/Products/Promise'


function AppRoutes() {
  return (
    <div>
    <Routes>
      <Route element = {<UserLayout/>}>
        <Route path='/' element={<Home/>}></Route>
       
        <Route path='/wishlist' element={<Wishlist/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/products/category/:category' element={<Category/>}></Route>
        <Route path='/products/:id' element={<ProductDetails/>}></Route>
        <Route path='/bestsellers' element={<BestSeller/>}></Route>
        <Route path='/promise' element={<PromiseSection/>}></Route>
      </Route>
      <Route element={<AuthLayout/>}>
         <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        </Route>

        <Route path="*" element={<NotFound/>}></Route>
        
       

        


      </Routes>
    </div>
  )
}

export default AppRoutes