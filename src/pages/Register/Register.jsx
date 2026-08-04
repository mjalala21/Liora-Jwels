import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { registerUsers, getUsers } from "../../services/api";
import { toast } from "react-toastify";



function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");


  const [error,setError] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  });


  const {data} = useQuery({
    queryKey:["users"],
    queryFn:getUsers
  });


 const navigate = useNavigate();

const registerMutation = useMutation({
  mutationFn: registerUsers,

  onSuccess: () => {
 

    toast.success("Account created successfully!");

   
      navigate("/login");
   
  },

  onError: (error) => {
    console.log(error);
    toast.error("Something went wrong.");
  },
});



const handleRegister = () => {

  const newErrors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (!name.trim()) {
    newErrors.name = "Full name is required";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!email.endsWith("@gmail.com")) {
    newErrors.email = "Enter a valid Gmail address";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password = "Password must contain at least 6 characters";
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  const existingUser = data.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    newErrors.email = "User already exists";
  }

  setError(newErrors);

  if (
    newErrors.name ||
    newErrors.email ||
    newErrors.password ||
    newErrors.confirmPassword
  ) {
    return;
  }

  const newUser = {
    name,
    email,
    password,
    role: "user",
  };

  registerMutation.mutate(newUser);
};




  return (

    <div className="
      min-h-screen
      bg-[#F8F4EC]
      flex
      justify-center
      items-center
      p-6
    ">


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



        {/* Image Section */}

        <div
          className="
            hidden
            md:block
            bg-cover
            bg-center
          "
          style={{
            backgroundImage:
            "url('images/rings/ring21.jpg')"
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
              tracking-widest
            ">
              LIORA
            </h2>


            <p className="
              mt-4
              text-lg
            ">
              Begin your journey into timeless elegance.
            </p>


          </div>


        </div>




        {/* Register Form */}


        <div className="
          p-10
          md:p-14
        ">


          <div className="
            text-center
            mb-8
          ">


            <h1 className="
              text-5xl
              font-serif
              text-brand-brown
            ">
              Create Account
            </h1>


            <p className="
              text-gray-500
              mt-3
            ">
              Join LIORA and discover exquisite jewellery
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
            gap-5
          ">



            <div>

              <input
                type="text"
                placeholder="Full name"
                 onChange={(e) => {
    setName(e.target.value);

    setError((prev) => ({
      ...prev,
      name: "",
    }));
  }}
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
              />

              <p className="text-red-500 text-sm mt-1">
                {error.name}
              </p>

            </div>




            <div>

              <input
                type="email"
                placeholder="Email address"
  onChange={(e) => {
    setEmail(e.target.value);

    setError((prev) => ({
      ...prev,
      email: "",
    }));
  }}                className="
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
              />

              <p className="text-red-500 text-sm mt-1">
                {error.email}
              </p>

            </div>




            <div>

              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
    setPassword(e.target.value);

    setError((prev) => ({
      ...prev,
      password: "",
    }));
  }}
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
              />

              <p className="text-red-500 text-sm mt-1">
                {error.password}
              </p>

            </div>




            <div>

              <input
                type="password"
                placeholder="Confirm password"
                  onChange={(e) => {
    setConfirmPassword(e.target.value);

    setError((prev) => ({
      ...prev,
      confirmPassword: "",
    }));
  }}
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
              />

              <p className="text-red-500 text-sm mt-1">
                {error.confirmPassword}
              </p>

            </div>




            <button
              onClick={handleRegister}
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
              CREATE ACCOUNT
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
              Already have an account?
            </p>


            <Link
              to="/login"
              className="
                text-brand-gold
                font-semibold
                hover:underline
              "
            >
              Login
            </Link>


          </div>


        </div>


      </div>


    </div>

  );

}


export default Register;