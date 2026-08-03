import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BackButton() {

  const navigate = useNavigate();

  return (

    <button

      onClick={() => navigate(-1)}

      className="
      flex
      items-center
      gap-3
      bg-brand-beige
      text-[#3A2418]
      px-5
      py-3
      rounded-full
      border-none
     
      hover:bg-[#D4AF37]
      hover:text-[#3A2418]
      transition
      duration-300
      shadow-md
      "

    >

      <FaArrowLeft />

      Back

    </button>

  );

}

export default BackButton;