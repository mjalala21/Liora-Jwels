import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, addToCart, getCart, addToWishlist, getWishlist } from "../../services/api";
import { 
  FaHeart,
  FaEye,
  FaShoppingBag
} from "react-icons/fa";


function Category() {


  const {category} = useParams();

  const queryClient = useQueryClient()

  const navigate = useNavigate()



  const [quickView,setQuickView] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"))

  const {data : products=[], isProductLoading, error} = useQuery({

    queryKey:["products",category],

    queryFn:getProducts

  });

   const {data : cart, isCartLoading } = useQuery({

    queryKey : ["cart", user.id],
    queryFn : ()=>getCart(user.id)

  })

  const {data:wishlist=[]} = useQuery({

  queryKey:["wishlist", user.id],

  queryFn:()=>getWishlist(user.id)

});

  const addCartMutation = useMutation({
    mutationFn : addToCart,

     onSuccess: (data) => {
    console.log("Added successfully", data);
     queryClient.invalidateQueries({
      queryKey : ["cart", user.id]
     }) 
  },

  onError: (error) => {
    console.log("Error:", error);
  }
});

const wishlistMutation = useMutation({

  mutationFn:addToWishlist,

  onSuccess:()=>{

    queryClient.invalidateQueries({
      queryKey:["wishlist", user.id]
    });

  }

});


  if(isProductLoading || isCartLoading){

    return (
      <div className="
        h-screen
        flex
        justify-center
        items-center
      ">
        Loading Collection...
      </div>
    );

  }

  console.log(cart)



  if(error){

    return <p>{error.message}</p>

  }




  const filteredProducts =
  products.filter(
    product=>product.category===category
  );

  




 function handleAddCart(idToAdd){

if(!user){
  navigate("/login")
  return;
}

  const cartedProduct= products.find(p=>
    String(p.id)=== String(idToAdd))


const existingItem = cart.find(item=> 
   String(item.userId) === String(user.id) &&
  String(item.productId) === String(idToAdd)
  
)
console.log("Current cart:", cart);
console.log("Clicked product:", idToAdd);
console.log("Current user:", user.id);


if(existingItem){
  alert("this item already added to te cart")

  return;
}
  
  


    const cartedItem = {
      userId: user.id ,
      productId : cartedProduct.id ,
      quantity : 1
    }


    addCartMutation.mutate(cartedItem)



 }
function handleWishlist(product){


if(!user){

  navigate("/login");

  return;

}



const alreadyAdded = wishlist.find(item=>

 String(item.productId) === String(product.id)

);



if(alreadyAdded){

 alert("Already added to wishlist");

 return;

}



const wishlistItem={

 userId:user.id,

 productId:product.id

};



wishlistMutation.mutate(wishlistItem);


}


  return (

    <div className="
      bg-[#F8F4EC]
      min-h-screen
    ">



      {/* Header */}


      <div
      className="
        h-[45vh]
        bg-cover
        bg-center
        flex
        justify-center
        items-center
        relative
      "
      style={{
        backgroundImage:
        "url('/images/Hero/hero1.jpg')"
      }}
      >


        <div className="
          absolute
          inset-0
          bg-black/40
        "></div>



        <div className="
          relative
          text-center
          text-white
        ">


          <h1 className="
            text-6xl
            font-serif
            tracking-wide
          ">

            {category} Collection

          </h1>



          <p className="
            mt-5
            text-lg
          ">

            Discover timeless pieces crafted
            for unforgettable moments.

          </p>


        </div>


      </div>







      {/* Products */}


      <div className="
        px-10
        py-20
      ">



      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-10
      ">



      {
        filteredProducts.map(product=>(


          <div
          key={product.id}
          className="
            group
            bg-white
            rounded-3xl
            overflow-hidden
            shadow-md
            hover:shadow-2xl
            transition
            duration-500
          "
          >



          {/* Image */}


          <div className="
            relative
            overflow-hidden
          ">


          <Link
          to={`/products/${product.id}`}
          >


          <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-[380px]
            object-cover
            group-hover:scale-110
            transition
            duration-700
          "
          />


          </Link>




          {/* Icons */}


          <div className="
            absolute
            top-5
            right-5
            flex
            flex-col
            gap-3
          ">


        <button

onClick={()=>handleWishlist(product)}

className="
 bg-white
 p-3
 rounded-full
 shadow
 hover:text-red-500
 transition
"

>

         <FaHeart
className={
 wishlist.some(
 item=>String(item.productId)===String(product.id)
 )
 ? "text-red-500"
 : "text-gray-400"
}
/>

          </button>





          <button
          onClick={()=>
            setQuickView(product)
          }
          className="
            bg-white
            p-3
            rounded-full
            shadow
          "
          >

          <FaEye/>

          </button>



          </div>



          </div>







          {/* Details */}



          <div className="
            p-6
            text-center
          ">


          <h2 className="
            text-xl
            font-serif
            text-brand-brown
          ">

          {product.name}

          </h2>




          <p className="
            text-brand-gold
            mt-2
          ">
            ★★★★★
          </p>




          <p className="
            text-lg
            font-semibold
            text-brand-brown
            mt-2
          ">

          ₹ {product.price}

          </p>




          <button disabled={isCartLoading}
          type='button'  onClick={()=>{
            console.log("clicked")
          handleAddCart(product.id)}}
          className="
            mt-5
            w-full
            flex
            items-center
            justify-center
            gap-3
            bg-brand-brown
            text-white
            py-3
            rounded-full
            hover:bg-brand-gold
            transition
          "
          >

          <FaShoppingBag/>

          Add To Cart

          </button>



          </div>



          </div>


        ))
      }



      </div>


      </div>









      {/* Quick View */}



      {
        quickView &&

        <div className="
          fixed
          inset-0
          bg-black/50
          flex
          justify-center
          items-center
          z-50
        ">


        <div className="
          bg-white
          rounded-3xl
          p-10
          max-w-lg
          relative
        ">


        <button

        onClick={()=>
          setQuickView(null)
        }

        className="
          absolute
          right-5
          top-5
        "

        >

        ✕


        </button>



        <img
        src={quickView.image}
        className="
          w-72
          h-72
          object-cover
          rounded-xl
          mx-auto
        "
        />



        <h2 className="
          text-3xl
          font-serif
          text-brand-brown
          mt-5
        ">

        {quickView.name}

        </h2>



        <p className="
          mt-3
        ">

        {quickView.description}

        </p>



        <p className="
          text-brand-gold
          text-xl
          mt-3
        ">

        ₹ {quickView.price}

        </p>



        </div>



        </div>

      }



    </div>

  )
}


export default Category;