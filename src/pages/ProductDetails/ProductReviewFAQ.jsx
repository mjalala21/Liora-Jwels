import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaQuoteLeft
} from "react-icons/fa";

function ProductReviewsFAQ() {

  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "Is this jewellery BIS Hallmarked?",
      answer:
        "Yes. Every LIORA gold jewellery piece is BIS Hallmarked and comes with a certificate of authenticity."
    },
    {
      question: "Do you provide free shipping?",
      answer:
        "Yes. We provide complimentary insured shipping across India."
    },
    {
      question: "Can I return my jewellery?",
      answer:
        "Yes. You can request a return within 30 days, provided the jewellery is unused and in its original packaging."
    },
    {
      question: "Does it include luxury gift packaging?",
      answer:
        "Absolutely. Every LIORA order is delivered in our signature premium gift box."
    }
  ];

  const reviews = [
    {
      name: "Aarav Sharma",
      rating: 5,
      review:
        "The craftsmanship is exceptional. It looks even more beautiful than the pictures."
    },
    {
      name: "Aisha Rahman",
      rating: 5,
      review:
        "Elegant packaging and excellent quality. I received so many compliments."
    },
    {
      name: "Priya Nair",
      rating: 5,
      review:
        "Absolutely worth the purchase. Beautiful finishing and premium feel."
    }
  ];

  return (
    <section className="bg-[#F8F4EC] py-28">

      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}

        <motion.div
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:.7}}
          viewport={{once:true}}
          className="text-center"
        >

          <p className="tracking-[6px] uppercase text-brand-gold">

            Trusted By Our Customers

          </p>

          <h2 className="mt-5 text-5xl font-serif text-brand-brown">

            Reviews & Questions

          </h2>

          <div className="w-28 h-[2px] bg-brand-gold mx-auto mt-8"></div>

        </motion.div>





        {/* Rating Summary */}

        <div className="bg-white rounded-[40px] p-10 shadow-xl mt-20">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <h1 className="text-7xl font-serif text-brand-brown">

                4.9

              </h1>

              <div className="flex text-brand-gold text-2xl mt-4">

                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>

              </div>

              <p className="mt-5 text-gray-600">

                Based on 218 verified customer reviews.

              </p>

            </div>





            <div className="space-y-4">

              {[5,4,3,2,1].map(star=>(

                <div
                  key={star}
                  className="flex items-center gap-4"
                >

                  <span className="w-6">

                    {star}

                  </span>

                  <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">

                    <div
                      className={`bg-brand-gold h-full ${
                        star===5
                          ? "w-[90%]"
                          : star===4
                          ? "w-[8%]"
                          : "w-[2%]"
                      }`}
                    ></div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>









        {/* Customer Reviews */}

        <div className="grid lg:grid-cols-3 gap-10 mt-20">

          {reviews.map((review,index)=>(

            <motion.div
              key={index}
              initial={{opacity:0,y:50}}
              whileInView={{opacity:1,y:0}}
              transition={{duration:.7}}
              viewport={{once:true}}
              className="
                bg-white
                rounded-[35px]
                p-8
                shadow-lg
              "
            >

              <FaQuoteLeft className="text-brand-gold text-4xl"/>

              <div className="flex gap-1 mt-6 text-brand-gold">

                {[...Array(review.rating)].map((_,i)=>

                  <FaStar key={i}/>

                )}

              </div>

              <p className="mt-6 text-gray-600 leading-8">

                "{review.review}"

              </p>

              <h4 className="mt-8 font-serif text-2xl text-brand-brown">

                {review.name}

              </h4>

            </motion.div>

          ))}

        </div>










        {/* FAQ */}

        <div className="mt-28">

          <h2 className="text-5xl text-center font-serif text-brand-brown">

            Frequently Asked Questions

          </h2>

          <div className="mt-16 max-w-4xl mx-auto">

            {faqs.map((faq,index)=>(

              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg mb-6 overflow-hidden"
              >

                <button

                  onClick={()=>

                    setOpenFAQ(

                      openFAQ===index
                      ? null
                      : index

                    )

                  }

                  className="
                    w-full
                    flex
                    justify-between
                    items-center
                    px-8
                    py-6
                    text-left
                  "

                >

                  <span className="font-semibold text-brand-brown">

                    {faq.question}

                  </span>

                  {

                    openFAQ===index

                    ? <FaChevronUp/>

                    : <FaChevronDown/>

                  }

                </button>

                {

                  openFAQ===index &&

                  <div className="px-8 pb-8 text-gray-600 leading-8">

                    {faq.answer}

                  </div>

                }

              </div>

            ))}

          </div>

        </div>










        {/* Luxury Banner */}

        <div className="mt-28 bg-brand-brown rounded-[45px] p-20 text-center text-white">

          <p className="tracking-[5px] uppercase text-brand-gold">

            LIORA

          </p>

          <h2 className="mt-6 text-5xl font-serif">

            Jewellery That Becomes

            <br/>

            Part Of Your Story

          </h2>

          <p className="mt-8 max-w-3xl mx-auto leading-8 text-white/80">

            Every piece is thoughtfully handcrafted to celebrate
            life's unforgettable moments. Discover timeless elegance
            designed to be treasured for generations.

          </p>

        </div>

      </div>

    </section>
  );
}

export default ProductReviewsFAQ;