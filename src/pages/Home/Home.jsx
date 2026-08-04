import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import Collections from "../Products/Collections";
import BestSellers from "../Products/BestSellers";
import PromiseSection from "./Promise";


import jewellery from "../../assets/jwellery/bgjwellery11.png";


function Home() {



  const text = "Timeless Elegance, Sparkle Forever";


  return (
<>
  <Hero/>
   
    <Collections/>
    <BestSellers/>
    <PromiseSection/>
    </>

  )

}

export default Home;