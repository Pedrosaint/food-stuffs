import React from "react";
import { motion } from "framer-motion";
import Card from "./../../../../general/common/card";

const Hero2 = () => {
  const categories = [
    {
      title: "Vegetables",
      image: "/images/card-1.jpg",
      bgColor: "#F0FFF0",
    },
    {
      title: "Fresh Foods",
      image: "/images/card-2.jpg",
      bgColor: "#FF9999",
    },
    {
      title: "Super Salads",
      image: "/images/card-3.jpg",
      bgColor: "#fff7e6",
    },
  ];

  return (
    <>
      <div className="relative  overflow-hidden bg-white">
        {/* Leaf Image with Animation */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center"
        >
          <img
            src="/images/leaf.png"
            alt="leaf"
            className="md:w-[150px] w-30 h-auto mt-8 absolute top-[-90px] left-4  md:top-[-30px] md:left-10 transform -translate-x-1/2"
            style={{ filter: "blur(2px)" }}
          />
        </motion.div>

        {/* Cards Section */}
        <div className="flex justify-center mt-20">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl  md:text-6xl font-bold text-center text-gray-800"
          >
            Explore Our Categories
          </motion.h1>
        </div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center text-gray-600 mt-4 max-w-2xl mx-auto text-lg"
        >
          Find the best organic products for your needs
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10 md:px-8 container mx-auto p-4 md:p-0">
          {categories.map((category, index) => (
            <Card
              key={index}
              title={category.title}
              image={category.image}
              bgColor={category.bgColor}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero2;
