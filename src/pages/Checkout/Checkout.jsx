import React from "react";
import { FaLock, FaCreditCard, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { placeOrders, getCart, getProducts } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

function Checkout() {

const[name, setName] = useState("")
const[phone, setPhone] = useState("")
const[email, setWEmail] = useState("")
const[city, setCity] = useState("")
const[address, setAddress] = useState("")
const[payMethod, setPayMethod] = useState(null)

const [error, setError] = useState({
  name: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  payment: ""
});

const navigate= useNavigate()

const user = JSON.parse(localStorage.getItem("user"))

const buyNowItem = JSON.parse(
  localStorage.getItem("buyNowItem")
);

const {data : products=[], isProductLoading} = useQuery({
    queryKey : ['products'],
    queryFn : ()=>getProducts()
})

const {data : cart=[], isCartLoading} = useQuery({
    queryKey : ['cart', user.id],
    queryFn : ()=>getCart(user.id)
})

const placeOrderMutation = useMutation({
    mutationFn : placeOrders
})

const checkoutItems = buyNowItem 
? [buyNowItem]
: cart;

const cartedProduct = checkoutItems
  .map(item => {
    const product = products.find(
      p => String(p.id) === String(item.productId)
    );

    return {
      ...item,
      product
    };
  })
  .filter(item => item.product);


  const total = cartedProduct.reduce(

    (sum,item)=>
      sum + item.product.price * item.quantity,

      0

  );


function handlePlaceOrder(){


  const newErrors = {
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    payment: ""
  };


  if(!name.trim()){
    newErrors.name = "Full name is required";
  }


  if(!phone.trim()){
    newErrors.phone = "Phone number is required";
  }
  else if(phone.length !== 10){
    newErrors.phone = "Enter a valid 10 digit phone number";
  }


  if(!email.trim()){
    newErrors.email = "Email is required";
  }
  else if(!email.endsWith("@gmail.com")){
    newErrors.email = "Enter a valid Gmail address";
  }


  if(!city.trim()){
    newErrors.city = "City is required";
  }


  if(!address.trim()){
    newErrors.address = "Address is required";
  }


  if(!payMethod){
    newErrors.payment = "Please select payment method";
  }



  setError(newErrors);



  if(
    newErrors.name ||
    newErrors.phone ||
    newErrors.email ||
    newErrors.city ||
    newErrors.address ||
    newErrors.payment
  ){
    return;
  }



  const orderItem = {
    userId: user.id,
    items: checkoutItems,
    totalAmount: total,

    shippingAddress:{
      fullName:name,
      phone,
      city,
      address
    },

    paymentMethod:payMethod,
    status:"Pending",
    createdAt:new Date().toISOString()
  };


  placeOrderMutation.mutate(orderItem,{
    onSuccess:()=>{
      localStorage.removeItem("buyNowItem");
      navigate("/orderplaced");
    }
  });

}


  return (
    <div className="min-h-screen bg-[#F8F4EC] px-6 py-16">


     

      <div className=" pt-50 text-center mb-14">

        <h1 className="
          text-5xl
          font-serif
          text-brand-brown
          tracking-wide
        ">
          Complete Your Purchase
        </h1>

        <p className="
          mt-4
          text-gray-600
          font-light
        ">
          A timeless experience awaits you
        </p>

      </div>




      <div className="
        max-w-6xl
        mx-auto
        grid
        lg:grid-cols-3
        gap-10
      ">



       

        <div className="
          lg:col-span-2
          bg-white
          rounded-3xl
          shadow-xl
          p-10
        ">


          <div className="
            flex
            items-center
            gap-3
            mb-8
          ">

            <FaMapMarkerAlt 
              className="text-brand-gold"
            />

            <h2 className="
              text-2xl
              font-serif
              text-brand-brown
            ">
              Delivery Details
            </h2>

          </div>



          <div className="
            grid
            md:grid-cols-2
            gap-6
          ">

  <div>
            <input onChange={(e)=>{

 setName(e.target.value);

 setError(prev=>({
   ...prev,
   name:""
 })) 
}}
              placeholder="Full Name"
              className="
                border
                border-[#D8C3A5]
                rounded-xl
                px-5
                py-4
                w-full
                outline-none
                focus:ring-2
                focus:ring-[#B08D57]
              "
            />
            <p className="text-red-500 text-sm mt-1">
 {error.name}
</p>
</div>
<div>

            <input
            onChange={(e)=>{

 setPhone(e.target.value);

 setError(prev=>({
   ...prev,
   phone:""
 })) 
}}
              placeholder="Phone Number"
              className="
                border
                border-[#D8C3A5]
                rounded-xl
                px-5
                py-4
                w-full
                outline-none
                focus:ring-2
                focus:ring-[#B08D57]
              "
            />
            <p className="text-red-500 text-sm mt-1">
 {error.phone}
</p>
</div>

<div>
            <input
            onChange={(e)=>{

 setWEmail(e.target.value);

 setError(prev=>({
   ...prev,
   email:""
 })) 
}}
              placeholder="Email Address"
              className="
                border
                border-[#D8C3A5]
                rounded-xl
                px-5
                py-4
                w-full
                outline-none
                focus:ring-2
                focus:ring-[#B08D57]
              "
            />
            <p className="text-red-500 text-sm mt-1">
 {error.email}
</p>
</div>
<div>

            <input
           onChange={(e)=>{

 setCity(e.target.value);

 setError(prev=>({
   ...prev,
   city:""
 })) 
}}
              placeholder="City"
              className="
                border
                border-[#D8C3A5]
                rounded-xl
                px-5
                py-4
                w-full
                outline-none
                focus:ring-2
                focus:ring-[#B08D57]
              "
            />
            <p className="text-red-500 text-sm mt-1">
 {error.city}
</p>
</div>


          </div>



          <textarea
          onChange={(e)=>{

 setAddress(e.target.value);

 setError(prev=>({
   ...prev,
   address:""
 })) 
}}
            placeholder="Complete Address"
            rows="4"
            className="
              mt-6
              w-full
              border
              border-[#D8C3A5]
              rounded-xl
              px-5
              py-4
              outline-none
              focus:ring-2
              focus:ring-[#B08D57]
            "
          />
          <p className="text-red-500 text-sm mt-1">
 {error.address}
</p>




       

          <div className="mt-10">


            <div className="
              flex
              items-center
              gap-3
              mb-5
            ">

              <FaCreditCard
                className="text-brand-gold"
              />

              <h2 className="
                text-2xl
                font-serif
                text-brand-brown
              ">
                Payment Method
              </h2>


            </div>



            <div className="
              flex
              gap-5
              flex-wrap
            ">


              <button
              onClick={()=>setPayMethod("cod")}
                className={`${payMethod==="cod" ? "bg-brand-brown text-white" :" bg-white"}
                  border
                  border-[#B08D57]
                  px-6
                  py-3
                  rounded-full
                  text-brand-brown
                  hover:bg-[#B08D57]
                  hover:text-white
                  transition
                `}
              >
                Cash On Delivery
              </button>



              <button
              onClick={()=>setPayMethod("card")}

                className={` ${payMethod==="card" ? "bg-brand-brown text-white" : "bg-white"}
                  border
                  border-[#B08D57]
                  px-6
                  py-3
                  rounded-full
                  text-brand-brown
                  hover:bg-[#B08D57]
                  hover:text-white
                  transition
                `}
              >
                UPI / Card
              </button>


            </div>
 <p className="text-red-500 text-sm mt-3">
 {error.payment}
</p>

          </div>



        </div>






        {/* Order Summary */}

{/* Order Summary */}

<div className="
  bg-[#3A2418]
  text-white
  rounded-3xl
  p-8
  h-fit
  shadow-2xl
">


  <h2 className="
    text-3xl
    font-serif
    mb-8
  ">
    Order Summary
  </h2>



  <div className="
    border-t
    border-white/20
    pt-6
    mt-6
  ">


    <div className="
      flex
      justify-between
      text-xl
      font-semibold
    ">

      <span>
        Total Amount
      </span>


      <span className="text-[#D4AF37]">
        ₹{total}
      </span>


    </div>


  </div>




  <button
    onClick={handlePlaceOrder}
    className="
      mt-8
      w-full
      bg-[#D4AF37]
      text-[#3A2418]
      py-4
      rounded-full
      font-semibold
      tracking-wide
      hover:scale-105
      transition
      flex
      justify-center
      items-center
      gap-3
    "
  >

    <FaLock/>

    Place Order

  </button>



</div>



      </div>


    </div>
  )
}

export default Checkout;