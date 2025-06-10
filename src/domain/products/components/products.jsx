

import { motion } from "framer-motion";
import ProductCard from "../../../general/common/product-card";
import { FadeUp } from "../../../utils/animation";
import { CgShoppingBag } from "react-icons/cg";

const Products = () => {
  const products = [
    {
      name: "Eggplant",
      image: "/images/eggplant.png",
      price: 5.3,
    },
    {
      name: "Vermeer",
      image: "/images/plantain.png",
      price: 7.5,
      oldPrice: 10,
      onSale: true,
    },
    {
      name: "Benas",
      image: "/images/benas.png",
      price: 7.5,
    },
    {
      name: "Eggplant",
      image: "/images/eggplant.png",
      price: 5.3,
    },
    {
      name: "Vermeer",
      image: "/images/plantain.png",
      price: 7.5,
      oldPrice: 10,
      onSale: true,
    },
    {
      name: "Benas",
      image: "/images/benas.png",
      price: 7.5,
    },
    {
      name: "Benas",
      image: "/images/benas.png",
      price: 7.5,
    },
    {
      name: "Eggplant",
      image: "/images/eggplant.png",
      price: 5.3,
    },
    {
      name: "Vermeer",
      image: "/images/plantain.png",
      price: 7.5,
      oldPrice: 10,
      onSale: true,
    },
    {
      name: "Benas",
      image: "/images/benas.png",
      price: 7.5,
    },
  ];
  return (
    <>
      {products.length > 0 ? (
        <>
          <div className="flex justify-center mt-35 md:mt-25">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-2xl md:text-5xl font-bold text-center text-gray-800"
            >
              Always Fresh, Always Perfect
            </motion.h1>
          </div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center text-gray-600 md:mt-4 md:max-w-2xl md:mx-auto px-3 md:px-0 mb-3"
          >
            Hand-selected at peak freshness, delivered with care.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-10 md:px-8 container mx-auto">
            {products.map((product, index) => (
              <motion.div
                variants={FadeUp(product.delay)}
                initial="hidden"
                whileInView={"visible"}
              >
                <ProductCard key={index} {...product} />
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center mt-35 md:mt-20 py-20 md:py-30"
        >
          <div className="text-gray-400 mb-6">
            <CgShoppingBag size={64} />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Currently Out of Stock
          </h3>
          <p className="text-gray-500 px-4 text-center">
            We're preparing fresh products for you. Check back soon or subscribe
            to get notified!
          </p>
        </motion.div>
      )}
    </>
  );
}

export default Products