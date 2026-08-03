import React from "react";
import { useSelector } from "react-redux";

function ProfileHero() {

 const user = useSelector((state) => state.user.user);

  

  const username = user?.name || "Guest";

  const firstLetter = username.charAt(0).toUpperCase();


  return (
    <section
      className="
      relative
      h-[80vh]
      bg-cover
      bg-center
      flex
      items-center
      justify-center
      overflow-hidden
      "
      style={{
        backgroundImage:
        "url('/images/Hero/profilehero5.png')"
      }}
    >


      {/* Dark Luxury Overlay */}

      <div
      className="
      absolute
      inset-0
      bg-black/50
      "
      ></div>



      {/* Floating Gold Glow */}

      <div
      className="
      absolute
      w-96
      h-96
      bg-yellow-500/20
      rounded-full
      blur-3xl
      -top-20
      -left-20
      "
      ></div>


      <div
      className="
      absolute
      w-96
      h-96
      bg-yellow-500/10
      rounded-full
      blur-3xl
      bottom-0
      right-0
      "
      ></div>





      {/* Content */}

      <div
      className="
      relative
      z-10
      text-center
      text-white
      px-5
      "
      >


        {/* Avatar */}

        <div
        className="
        mx-auto
        mb-6
        w-28
        h-28
        rounded-full
        bg-brand-brown
        border
        border-yellow-400
        flex
        items-center
        justify-center
        text-5xl
        font-serif
        shadow-2xl
        "
        >

          {firstLetter}

        </div>





        <p
        className="
        uppercase
        tracking-[0.4em]
        text-sm
        text-yellow-300
        mb-4
        "
        >
          Welcome Back
        </p>





        <h1
        className="
        text-5xl
        md:text-6xl
        font-serif
        tracking-wide
        "
        >

          {username}

        </h1>




        <p
        className="
        mt-5
        text-lg
        text-gray-200
        max-w-xl
        mx-auto
        "
        >

        Your timeless jewellery journey
        continues with LIORA.

        </p>




        <div
        className="
        mt-8
        flex
        justify-center
        "
        >

          <span
          className="
          px-6
          py-2
          rounded-full
          border
          border-yellow-400
          text-yellow-300
          tracking-widest
          text-sm
          "
          >

          ✦ LIORA MEMBER ✦

          </span>

        </div>



      </div>



    </section>
  )
}

export default ProfileHero;