import React from "react";
import { useSelector } from "react-redux";

function ProfileInfo() {

const user = useSelector((state) => state.user.user);

  return (
    <section
    className="
    px-6
    md:px-12
    py-16
    bg-[#F8F4EC]
    "
    >


      <div
      className="
      max-w-5xl
      mx-auto
      bg-white
      rounded-3xl
      shadow-xl
      p-8
      md:p-12
      border
      border-[#D6B36A]/30
      "
      >


       

        <div
        className="
        mb-10
        text-center
        "
        >

          <p
          className="
          text-[#C9A14A]
          uppercase
          tracking-[0.3em]
          text-sm
          "
          >
            Account Details
          </p>


          <h2
          className="
          mt-3
          text-4xl
          font-serif
          text-[#5C4033]
          "
          >
            My Profile
          </h2>


        </div>





        <div
        className="
        grid
        md:grid-cols-1
        gap-8
        "
        >


        

          <div
          className="
          p-6
          rounded-2xl
          bg-[#F8F4EC]
          "
          >

            <p
            className="
            text-sm
            text-gray-500
            uppercase
            tracking-wider
            "
            >
              Full Name
            </p>


            <h3
            className="
            mt-2
            text-xl
            font-serif
            text-[#5C4033]
            "
            >
              {user?.name || "Guest User"}
            </h3>

          </div>

          <div
          className="
          p-6
          rounded-2xl
          bg-[#F8F4EC]
          "
          >

            <p
            className="
            text-sm
            text-gray-500
            uppercase
            tracking-wider
            "
            >
              Email Address
            </p>


            <h3
            className="
            mt-2
            text-xl
            font-serif
            text-[#5C4033]
            break-all
            "
            >
              {user?.email}
            </h3>


          </div>

          <div
          className="
          p-6
          rounded-2xl
          bg-[#5C4033]
          text-white
          "
          >

            <p
            className="
            text-sm
            text-yellow-300
            uppercase
            tracking-wider
            "
            >
              Membership
            </p>


            <h3
            className="
            mt-2
            text-2xl
            font-serif
            "
            >
              ✦ Gold Member
            </h3>


          </div>





         

        



        </div>






        {/* Luxury Message */}

        <div
        className="
        mt-12
        text-center
        border-t
        pt-8
        "
        >

          <p
          className="
          font-serif
          italic
          text-xl
          text-[#5C4033]
          "
          >

          "Jewellery is not just worn,
          it becomes a part of your story."

          </p>


          <span
          className="
          block
          mt-3
          text-[#C9A14A]
          tracking-widest
          "
          >
            — LIORA
          </span>


        </div>



      </div>



    </section>
  )
}

export default ProfileInfo;