
import React,{useState} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, updateProductById } from "../../services/productsApi";
import ProductsTable from "./components/ProductsTable";
import {
  FaSearch,
  FaPlus,
  FaBoxOpen,
  FaCheckCircle,
} from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { HiOutlineCollection } from "react-icons/hi";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import SearchBar from "../../components/layout/SearchBar";
import ProductView from "./components/ProductView";
import EditProduct from "./components/EditProduct";
import NoItemsFound from "./components/NoItemsFound";
import { toast } from "react-toastify";


function AdminProducts() {

  const queryClient = useQueryClient();

  const [selectedProduct, setSelectedProduct] = useState(null);
const [editingProduct, setEditingProduct] = useState(null);


  const[stockFilter, setStockFilter] = useState("All Stock")
  const[categoryFilter, setCategoryFilter]= useState("All Category")
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const updateProductMutation = useMutation({

  mutationFn: updateProductById,

  onSuccess: () => {

    queryClient.invalidateQueries({
      queryKey: ["products"],
    });

    setEditingProduct(null);
    
    toast.success("Product Edited Successfully")

  },

  onError : ()=>{
    toast.error("Edititng Product failed")
  }

});

const {search, setSearch, searchedData : searchedProducts} = useSearch(products, (product)=>product.name || "")



const categoryFilteredProducts = searchedProducts.filter(product =>
  categoryFilter === "All Category" ||
  categoryFilter === product.category
);

const filteredProducts = categoryFilteredProducts.filter(product => {

  if (stockFilter === "All Stock") {
    return true;
  }

  if (stockFilter === "In Stock") {
    return product.stock > 10;
  }
   
   if(stockFilter === "Low Stock"){
    return product.stock >0 && product.stock <=10
   }

  if (stockFilter === "Out of Stock") {
    return product.inStock === false;
  }

  return false;
});

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl text-[#3B2418] font-semibold">
          Loading Products...
        </h1>
      </div>
    );
  }

  const availableProducts = products.filter((p) => p.stock>0).length;
  const outOfStock = products.filter((p) => p.stock===0).length;
  const totalCategories = new Set(products.map((p) => p.category)).size;

  // const searchFilterProducts = products.filter(product=>
  //   product.name.toLowerCase().includes(search.toLowerCase()))

  const handleEditProduct = (product) => {

  setSelectedProduct(null);

  setEditingProduct(product);

};


const handleSaveProduct = (updatedProduct) => {

  updateProductMutation.mutate(updatedProduct)

};

  return (
    <div className="min-h-screen bg-[#F8F4EC] p-8">

      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-5xl font-serif text-[#3B2418] tracking-wide">
            Products
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Manage your luxury jewellery collection
          </p>
        </div>

       <Link to= '/admin/productform'><button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C89F2F] transition-all px-6 py-3 rounded-xl font-semibold text-[#3B2418] shadow-lg">
          <FaPlus />
          Add Product
        </button></Link>
      </div>

      <SearchBar search={search}
                 setSearch={setSearch}
                 
      />

      {/* Search */}
      {/* <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 mb-10">

        <FaSearch className="text-gray-400 text-xl" />

        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 outline-none text-[#3B2418] placeholder:text-gray-400"
        />

      </div> */}

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mb-12">

        {/* Total Products */}

        <div className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-xl transition-all">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">

            <FaBoxOpen className="text-[#D4AF37] text-2xl" />

          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {products.length}
          </h2>

          <p className="text-gray-500 mt-2">
            Total Products
          </p>

        </div>

        {/* Available */}

        <div className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-xl transition-all">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">

            <FaCheckCircle className="text-green-500 text-2xl" />

          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {availableProducts}
          </h2>

          <p className="text-gray-500 mt-2">
            Available
          </p>

        </div>

        {/* Out of Stock */}

        <div className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-xl transition-all">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">

            <MdOutlineInventory2 className="text-red-500 text-2xl" />

          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {outOfStock}
          </h2>

          <p className="text-gray-500 mt-2">
            Out of Stock
          </p>

        </div>

        {/* Categories */}

        <div className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-xl transition-all">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">

            <HiOutlineCollection className="text-[#D4AF37] text-2xl" />

          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {totalCategories}
          </h2>

          <p className="text-gray-500 mt-2">
            Categories
          </p>

        </div>

      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-4 mb-8">

        <select className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none text-[#3B2418]"
        onChange={(e)=>setCategoryFilter(e.target.value)}
        >

          <option value = "All Category">All Categories</option>
          <option value ="Ring">Ring</option>
          <option value = "Necklace">Necklace</option>
          <option value = "Bracelet">Bracelet</option>
          <option value = "Earing">Earring</option>
          <option value="Bangle">Bangle</option>

        </select>

        <select className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none text-[#3B2418]"
        onChange={(e)=>setStockFilter(e.target.value)}
        >

          <option value = "All Stock">All Stock</option>
          <option value = "Low Stock">Low Stock</option>
          <option value = "In Stock">In Stock</option>
          <option value = "Out of Stock">Out of Stock</option>

        </select>

      </div>

      {/* Products Table */}
{filteredProducts.length<=0 ? <NoItemsFound/> : 
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

       <ProductsTable
  products={products}
  searchedProducts={filteredProducts}
  onView={(product) => setSelectedProduct(product)}
/>

      </div>

}

      {/* Product View */}

{selectedProduct && (
  <ProductView
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
    onEdit={handleEditProduct}
  />
)}

{/* Edit Product */}

{editingProduct && (
  <EditProduct
    product={editingProduct}
    onClose={() => setEditingProduct(null)}
    onSave={handleSaveProduct}
    isSaving={updateProductMutation.isPending}
  />
)}

    </div>
  );
}

export default AdminProducts;