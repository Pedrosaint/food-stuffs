// Hero2.jsx
import { motion } from "framer-motion";
import ProductCard from "../../../../general/common/product-card";
import { FadeUp } from "../../../../utils/animation";

const Hero3 = () => {
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
  ];

  return (
    <>
      <div className="flex justify-center mt-20">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-center text-gray-800"
        >
          Our Best Products
        </motion.h1>
      </div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center text-gray-600 mt-4 max-w-2xl mx-auto text-lg mb-9"
      >
        Discover our top-quality organic products, handpicked for you.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10 md:px-8 container mx-auto">
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
  );
};

export default Hero3;
