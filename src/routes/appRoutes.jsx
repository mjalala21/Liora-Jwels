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
import PromiseSection from '../pages/Home/Promise'
import Checkout from '../pages/Checkout/Checkout'
import MyOrders from '../pages/Orders/Orders'
import ProtectedRoute from './ProtectedRoute'
import Profile from '../pages/Profile/Profile'
// import OrderSuccess from '../pages/Orders/OrderPlaced'
import OrderPlaced from "../pages/Orders/OrderPlaced";
import OrderDetails from "../pages/Orders/OrderDetails";
import AllProducts from '../pages/Products/AllProducts'
import BlankLayout from "../layouts/BlankLayout";
import AdminLayout from '../layouts/AdminLayout'
import Dashbord from './../pages/Admin/Dashbord'
import AdminProducts from '../pages/Admin/AdminProducts'
import AdminOrders from '../pages/Admin/AdminOrders'
import Users from './../pages/Admin/Users'
// import An from './../pages/Admin/Analytics'
import AdminAnalytics from '../pages/Admin/AdminAnalytics'
import ProductForm from '../pages/Admin/components/ProductForm'
import AdminRoute from './AdminRoute'
import BlockedPage from '../pages/BlockedPage/BlockedPage'





function AppRoutes() {
  return (
    <div>
    <Routes>
      <Route element={<ProtectedRoute/>}>

  <Route element={<BlankLayout/>}>
    <Route 
      path="/orderplaced/:id" 
      element={<OrderPlaced/>}
    />
  </Route>


          <Route element={<UserLayout/>}>
          <Route path='/profile' element={<Profile/>}/>
             <Route path='/cart' element={<Cart/>}></Route>
              <Route path='/wishlist' element={<Wishlist/>}></Route>
              <Route path='/orders' element={<MyOrders/>}></Route>
              <Route path="/orderplaced/:id" element={<OrderPlaced/>}/>
              <Route path="/orders/:id" element={<OrderDetails/>}/>
        <Route path='/checkout' element={<Checkout/>}></Route>
        {/* <Route path='/orderplaced' element={<OrderSuccess/>}></Route> */}
          </Route>

      </Route>

      <Route element = {<UserLayout/>}>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path = '/allproducts' element = {<AllProducts/>}></Route>
        <Route path='/products/category/:category' element={<Category/>}></Route>
        <Route path='/products/:id' element={<ProductDetails/>}></Route>
        <Route path='/bestsellers' element={<BestSeller/>}></Route>
        </Route>
       
     
      <Route element={<AuthLayout/>}>
         <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        </Route>
    <Route element={<AdminRoute />}>
        <Route path='/admin' element={<AdminLayout/>}>
           <Route path='dashbord' element={<Dashbord/>}></Route>
           <Route path='adminproducts' element={<AdminProducts/>}></Route>
           <Route path='productform' element={<ProductForm/>}></Route>
           <Route path='adminorders' element={<AdminOrders/>}></Route>
           <Route path='users' element={<Users/>}></Route>
           <Route path='adminanalytics' element={<AdminAnalytics/>}></Route>

        </Route>
        </Route>
        <Route path= '/blockedpage' element={<BlockedPage/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        
      
      </Routes>
    </div>
  )
}

export default AppRoutes

