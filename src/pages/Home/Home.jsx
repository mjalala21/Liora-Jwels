import React from 'react'
import { FaRegGem } from 'react-icons/fa'
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

import jwellery from '../../assets/jwellery/bgjwellery11.png'
import Collections from '../Products/Collections';
import BestSellers from '../Products/BestSellers';
import PromiseSection from '../Products/Promise';


function Home() {
 const text = "Timeless Elegance, Sparkle Forever";

  return (

<div>
    <div style = {{ backgroundImage : "url('images/Hero/mainhero2.jpeg') "}} 

    className=' relative bg-cover bg-center h-screen flex flex-col items-center pt-30 gap-12 text-center text-brand-brown'>
      {/* <h1 className="logo text-9xl tracking-[0.3em]">
                   LIORA
      </h1> */}
 <motion.img

src={jwellery}

className=" absolute left-40 bottom-0
w-[400px]
drop-shadow-[0_0_40px_rgba(255,215,120,0.7)]
"


animate={{
   
rotateY:[0,20,0],
y:[0,-20,0]

}}

transition={{

duration:8,
repeat:Infinity,
ease:"easeInOut"

}}


/>   

        <motion.h1
        initial={{ opacity: 0, scale: 0.5  }}
        animate={{ opacity: 1, scale: 1.1 }}
        transition={{
          duration: 1.5,
          ease: "easeOut"
        }}
        className="text-9xl font-serif tracking-widest text-brown-900"
      >
        LIORA
      </motion.h1>
      
      
       {/* <p className='text-bold text-4xl'>Shine Bright</p>   */}
        <motion.h2
        className="text-4xl mt-6 font-serif"
      >
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 1 + index * 0.04,
              duration: 0.4
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h2>

     <Link to='/products'><motion.button
  initial={{
    opacity: 0,
    y: 30
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
 transition={{
 delay:1.8,
 duration:1,
 ease:[0.16,1,0.3,1]
}}

  whileHover={{
    scale: 1.05
  }}

  whileTap={{
    scale: 0.95
  }}

  className="
    mt-10
    px-10
    py-3
    rounded-full
    border-2
    border-[#3A1F12]
    text-[#3A1F12]
    font-serif
    tracking-[0.25em]
    uppercase
    text-sm
    relative
    overflow-hidden
    group
    transition-all
    duration-500
    hover:text-[#e9d1c5]
    hover:scale-105
    hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]
  "
>
  <span className="relative z-10">
    Explore Collection
  </span>

  <span
    className="
      absolute
      inset-0
      
        bg-[#2E1A12]
      translate-y-full
      group-hover:translate-y-0
      transition-transform
      duration-500
    "
  />

</motion.button></Link>

       {/* <button className='mt-10 border w-80 border-brand-brown px-4 py-4 rounded-xl font-bold'>Explore Jwellery</button> */}
    </div>

<Collections/>
<BestSellers/>
<PromiseSection/>
    
 </div>
  )
}

export default Home