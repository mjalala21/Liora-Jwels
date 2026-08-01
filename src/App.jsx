import React from 'react'
import Navbar from './components/layout/Navbar'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div>
      
      <AppRoutes/>
    </div>
  )
}

export default App