import { useQuery } from "@tanstack/react-query";
import { getCart, getProducts } from "../services/api";


 function getCartProducts(carted,producted){
   



const {data : products=[], isProductLoading} = useQuery({
    queryKey : ["products"],
    queryFn : getProducts 
})

const {data : cart=[], isCartLoading} = useQuery({
    queryKey : ["cart"],
    queryFn : getCart
})

  return cart.map(item=>
  {
    const product = products.find(
        p=> String(p.id) === String(item.productId))

        return {
            ...item, 
            product
        }
    
  }
  )


}