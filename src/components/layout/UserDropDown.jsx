import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRegUser,
  FaBoxOpen,
  FaHeart,
  FaShoppingBag,
  FaSignOutAlt
} from "react-icons/fa";


function UserDropdown(){

  const [open,setOpen] = useState(false);

  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user"));



  if(!user){
    return (
      <Link to="/login">
       <FaRegUser />
      </Link>
    )
  }



const firstLetter = user?.name?.charAt(0).toUpperCase();


  function logout(){

    localStorage.removeItem("user");

    navigate("/login");

  }




  return (

    <div
    className="
    relative
    "
    >



      {/* Avatar */}


      <button
      onClick={()=>setOpen(!open)}
      className="
      w-11
      h-11
      rounded-full
      bg-brand-brown
      text-brand-gold
      border
      border-yellow-500
      flex
      items-center
      justify-center
      text-xl
      font-serif
      "
      >

      {firstLetter}

      </button>





      {
        open &&

        <div
        className="
        absolute
        right-0
        mt-4
        w-72
        bg-white
        rounded-3xl
        shadow-2xl
        border
        border-yellow-200
        p-6
        z-50
        "
        >




          {/* User Info */}


          <div
          className="
          text-center
          pb-5
          border-b
          "
          >

            <div
            className="
            mx-auto
            w-16
            h-16
            rounded-full
            bg-brand-brown
            text-brand-gold
            flex
            items-center
            justify-center
            text-3xl
            font-serif
            "
            >

            {firstLetter}

            </div>



            <h3
            className="
            mt-3
            font-serif
            text-xl
            text-brand-brown
            "
            >

            {user.fullName}

            </h3>



            <p
            className="
            text-sm
            text-gray-500
            "
            >

            {user.email}

            </p>


          </div>






          {/* Menu */}


          <div
          className="
          mt-5
          space-y-3
          "
          >



          <MenuItem
          icon={<FaRegUser />}
          text="Profile"
          link="/profile"
          />


          <MenuItem
          icon={<FaBoxOpen/>}
          text="Orders"
          link="/orders"
          />


          <MenuItem
          icon={<FaHeart/>}
          text="Wishlist"
          link="/wishlist"
          />


          <MenuItem
          icon={<FaShoppingBag/>}
          text="Cart"
          link="/cart"
          />



          </div>






          {/* Logout */}


          <button
          onClick={logout}
          className="
          mt-6
          w-full
          py-3
          rounded-full
          bg-brand-brown
          text-white
          flex
          justify-center
          items-center
          gap-3
          hover:bg-brand-gold
          transition
          "
          >

          <FaSignOutAlt/>

          Logout

          </button>



        </div>

      }



    </div>

  )
}





function MenuItem({icon,text,link}){


return(

<Link
to={link}
className="
flex
items-center
gap-4
p-3
rounded-xl
text-brand-brown
hover:bg-[#F8F4EC]
transition
"
>

<span className="text-brand-gold">
{icon}
</span>


<span>
{text}
</span>


</Link>

)

}



export default UserDropdown;