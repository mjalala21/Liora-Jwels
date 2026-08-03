import React from 'react'
import Navbar from './components/layout/Navbar'
import AppRoutes from './routes/AppRoutes'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

         


function App() {
  return (
    <div>
  

      <AppRoutes/>
        <ToastContainer 
        position="top-right"
        autoClose={3000}
      />
    </div>
  )
}

export default App