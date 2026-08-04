import React from "react";
import { FaGem, FaShieldAlt, FaHeart, FaShippingFast } from "react-icons/fa";

function PromiseSection() {

  const promises = [
    {
      icon: <FaGem />,
      title: "Premium Quality",
      description:
        "Every piece is crafted with carefully selected materials to ensure lasting brilliance and elegance.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trusted Authenticity",
      description:
        "We promise genuine quality and jewellery you can cherish for a lifetime.",
    },
    {
      icon: <FaHeart />,
      title: "Timeless Designs",
      description:
        "Elegant creations that blend classic beauty with modern sophistication.",
    },
    {
      icon: <FaShippingFast />,
      title: "Delightful Experience",
      description:
        "From selection to delivery, we make every moment of your jewellery journey special.",
    },
  ];


  return (
    <section className="
      bg-[#F8F4EC]
      py-24
      px-10
    ">


      {/* Heading */}

      <div className="
        flex
        flex-col
        items-center
        text-center
        gap-5
        mb-16
      ">

        <p className="
          text-brand-gold
          tracking-[5px]
          text-sm
        ">
          OUR COMMITMENT
        </p>


        <h2 className="
          text-5xl
          font-serif
          text-brand-brown
          tracking-wide
        ">
          THE LIORA PROMISE
        </h2>


        <div className="
          w-32
          h-[1px]
          bg-brand-gold
        ">
        </div>


        <p className="
          max-w-3xl
          text-brand-brown
          text-lg
          leading-relaxed
        ">
          Every piece of jewellery tells a story. At LIORA, we promise
          timeless designs, exceptional quality, and a luxurious experience
          crafted to celebrate your most precious moments.
        </p>

      </div>



      {/* Promise Cards */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-8
      ">


      {promises.map((item,index)=>(

        <div
          key={index}
          className="
            bg-white
            rounded-2xl
            p-8
            text-center
            shadow-md
            transition-all
            duration-500
            hover:-translate-y-3
            hover:shadow-xl
          "
        >

          <div className="
            text-brand-gold
            text-4xl
            flex
            justify-center
            mb-5
          ">
            {item.icon}
          </div>


          <h3 className="
            font-serif
            text-2xl
            text-brand-brown
            mb-3
          ">
            {item.title}
          </h3>


          <p className="
            text-gray-600
            leading-relaxed
          ">
            {item.description}
          </p>


        </div>

      ))}


      </div>


    </section>
  );
}

export default PromiseSection;