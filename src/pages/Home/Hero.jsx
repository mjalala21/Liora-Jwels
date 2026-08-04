import React from 'react'

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroVideo from "../../assets/videos/hero-jewellery.mp4";
import jewellery from "../../assets/jwellery/bgjwellery11.png";

function Hero() {

     const text = "Timeless Elegance, Sparkle Forever";

  return (
     <div>


     <section
className="
relative
h-screen
overflow-hidden
flex
items-center
justify-center
text-center
"
>

<video
  src={heroVideo}
  autoPlay
  loop
  muted
  playsInline
  className="
  absolute
  inset-0
  w-full
  h-full
  object-cover
  "
/>


        {/* Luxury dark overlay */}

        <div
          className="
absolute
inset-0
bg-gradient-to-b
from-black/30
via-transparent
to-[#F8F4EC]/20
"
        />



       

        <motion.div

          className="
absolute
w-[500px]
h-[500px]
rounded-full
bg-yellow-300/20
blur-3xl
"

          animate={{

            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]

          }}

          transition={{

            duration: 6,
            repeat: Infinity

          }}

        />












        {/* Content */}

        <div

          className="
relative
z-10
flex
flex-col
items-center
"

        >



          {/* Logo */}

          <motion.h1

            initial={{

              opacity: 0,
              letterSpacing: "0.8em"

            }}

            animate={{

              opacity: 1,
              letterSpacing: "0.35em"

            }}

            transition={{

              duration: 2

            }}

            className="

font-serif
text-7xl
md:text-9xl
text-[#D4AF37]
drop-shadow-lg

"

          >

            LIORA

          </motion.h1>






          {/* Line */}

          <motion.div

            initial={{
              width: 0
            }}

            animate={{
              width: 180
            }}

            transition={{
              duration: 2,
              delay: 1
            }}

            className="
h-[2px]
bg-[#D4AF37]
mt-6
"

          />







          {/* Tagline */}


          <h2

            className="
mt-8
text-3xl
md:text-5xl
font-serif
text-[#F8F4EC]
tracking-wide
"

          >

            {

              text.split("").map((letter, index) => (


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

                    delay: 1.5 + index * 0.03

                  }}

                >

                  {letter}

                </motion.span>


              ))

            }

          </h2>







          <p

            className="
mt-6
max-w-xl
text-white/80
text-lg
leading-8
"

          >

            Discover exquisite jewellery crafted to celebrate
            your most precious moments with timeless beauty.

          </p>







          {/* Button */}


          <Link to="/products">


            <motion.button


              initial={{

                opacity: 0,
                y: 40

              }}

              animate={{

                opacity: 1,
                y: 0

              }}

              transition={{

                delay: 3,
                duration: 1

              }}


              whileHover={{

                scale: 1.08

              }}


              className="

relative
mt-10
px-12
py-4

border
border-[#D4AF37]

rounded-full

text-[#D4AF37]

font-serif

tracking-[0.3em]

uppercase

overflow-hidden

group

"

            >


              <span className="
relative
z-10
group-hover:text-black
transition
">

                Explore Collection

              </span>



              <span

                className="
absolute
inset-0
bg-[#D4AF37]
translate-y-full
group-hover:translate-y-0
transition
duration-500
"

              />


            </motion.button>


          </Link>



        </div>






        {/* Floating Sparkles */}


        {
          [1, 2, 3, 4, 5].map((item) => (


            <motion.div

              key={item}

              className="
absolute
w-2
h-2
bg-[#D4AF37]
rounded-full
"

              style={{

                top: `${20 * item}%`,
                right: `${10 * item}%`

              }}

              animate={{

                opacity: [0, 1, 0],
                scale: [1, 2, 1]

              }}

              transition={{

                duration: 3,
                repeat: Infinity,
                delay: item

              }}


            />


          ))

        }




      </section>


    </div>
  )
}

export default Hero