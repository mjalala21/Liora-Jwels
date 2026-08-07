import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import { getUsers } from "../../services/api";
import { getUsers } from "../../services/userApi";

import { useDispatch } from "react-redux";
import { setUser} from "../../redux/slices/UserSlice";



function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({
    email: "",
    password: ""
  });


  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });


  if(isLoading){
    return <p>Loading...</p>
  }



  function handleLogin(){

    const newErrors = {
  email: "",
  password: ""
};

if (!email.trim()) {
  newErrors.email = "Email is required";
}

if (!password) {
  newErrors.password = "Password is required";
}

setError(newErrors);

if (newErrors.email || newErrors.password) {
  return;
}

    const loginUser = data.find(
      user => user.email === email
    );


    if(!loginUser){

      setError({
        ...error,
        email:"User not found"
      });

      return;
    }


    if(loginUser.password !== password){

      setError({
        ...error,
        password:"Incorrect password"
      });

      return;
    }


    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({
    // id: loginUser.id,
    // name : loginUser.name,
    // email : loginUser.email
    // })
    // );
    localStorage.setItem("userId", loginUser.id);

    dispatch(setUser(loginUser))

    navigate("/");

  }

  return (

    <div 
      className="
        min-h-screen
        bg-[#F8F4EC]
        flex
        items-center
        justify-center
        p-6
      "
    >


      <div className="
        max-w-5xl
        w-full
        grid
        md:grid-cols-2
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-2xl
      ">


        {/* Image Side */}

        <div 
          className="
            hidden
            md:block
            bg-cover
            bg-center
          "
          style={{
            backgroundImage:
            "url('images/necklaces/jwellery.jpg')"
          }}
        >

          <div className="
            h-full
            bg-black/30
            flex
            flex-col
            justify-end
            p-10
            text-white
          ">

            <h2 className="
              text-5xl
              font-serif
            ">
              LIORA
            </h2>

            <p className="
              mt-3
              text-lg
            ">
              Timeless elegance crafted for your precious moments.
            </p>

          </div>

        </div>




        {/* Login Form */}

        <div className="
          p-10
          md:p-14
        ">


          <div className="
            text-center
            mb-10
          ">

            <h1 className="
              text-5xl
              font-serif
              text-brand-brown
              tracking-wide
            ">
              Welcome Back
            </h1>


            <p className="
              mt-3
              text-gray-500
            ">
              Sign in to continue your luxury journey
            </p>


            <div className="
              w-24
              h-[1px]
              bg-brand-gold
              mx-auto
              mt-5
            "></div>


          </div>




          <div className="
            flex
            flex-col
            gap-6
          ">


            <div>

              <input
                type="email"
                placeholder="Email address"
                className="
                  w-full
                  p-4
                  rounded-xl
                  border
                  border-brand-gold/40
                  bg-brand-cream
                  outline-none
                  focus:ring-2
                  focus:ring-brand-gold
                "
               onChange={(e) => {
  setEmail(e.target.value);

  setError((prev) => ({
    ...prev,
    email: ""
  }));
}}
              />

              {
                error.email &&
                <p className="text-red-500 mt-2">
                  {error.email}
                </p>
              }

            </div>




            <div>

              <input
                type="password"
                placeholder="Password"
                className="
                  w-full
                  p-4
                  rounded-xl
                  border
                  border-brand-gold/40
                  bg-brand-cream
                  outline-none
                  focus:ring-2
                  focus:ring-brand-gold
                "
               onChange={(e) => {
  setPassword(e.target.value);

  setError((prev) => ({
    ...prev,
    password: ""
  }));
}}
              />

              {
                error.password &&
                <p className="text-red-500 mt-2">
                  {error.password}
                </p>
              }

            </div>




            <button
              onClick={handleLogin}
              className="
                bg-brand-brown
                text-white
                py-4
                rounded-xl
                tracking-widest
                hover:bg-brand-gold
                transition
                duration-500
              "
            >
              LOGIN
            </button>


          </div>




          <div className="
            flex
            justify-center
            gap-3
            mt-8
            text-sm
          ">

            <p>
              New to LIORA?
            </p>


            <Link 
              to="/register"
              className="
                text-brand-gold
                font-semibold
                hover:underline
              "
            >
              Create Account
            </Link>


          </div>


        </div>


      </div>


    </div>

  );
}

export default Login;