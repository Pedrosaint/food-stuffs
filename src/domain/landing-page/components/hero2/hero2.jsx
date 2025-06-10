import { motion } from "framer-motion";
import Card from "./../../../../general/common/card";
import { FadeRight, FadeLeft } from "../../../../utils/animation";

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
        {/*leaf image*/}
        <div className="absolute top-[-130px] left-4  md:top-[-30px] md:left-10 blur-sm opacity-90 rotate-[40deg]">
          <motion.img
            variants={FadeRight(0.5)}
            initial="hidden"
            whileInView={"visible"}
            whileHover={{ scale: 1.1 }}
            src="/images/leaf.png"
            alt="leaf"
            className="w-full md:max-w-[200px] mt-15"
          />
        </div>

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
          className="text-center text-gray-600 mt-4 max-w-2xl mx-auto text-lg mb-9"
        >
          Find the best organic products for your needs
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10 md:px-8 container mx-auto p-4">
          {categories.map((category, index) => (
            <motion.div
              variants={FadeLeft(category.delay)}
              initial="hidden"
              whileInView={"visible"}
            >
              <Card
                key={index}
                {...category}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero2;
