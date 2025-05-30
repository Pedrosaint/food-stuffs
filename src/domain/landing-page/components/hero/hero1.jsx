// import { GoArrowRight } from "react-icons/go";

// const Hero1 = () => {
//   return (
//     <div className="relative h-screen overflow-hidden ">
//       {/* Background Image Layer */}
//       <div
//         className="absolute inset-0 bg-cover bg-center blur-sm"
//         style={{ backgroundImage: "url('/images/hero-image.jpg')" }}
//       ></div>

//       {/* Content Layer */}
//       <div className="relative z-10  h-full container mx-auto py-70">
//         <h1 className="text-white text-[90px] font-bold">
//           Buy Best <span className="text-green-600">Organic Products</span>{" "}
//           Online
//         </h1>
//         <p className="text-white mt-4 max-w-2xl text-3xl font-medium">
//           Get naturally produced fruits, vegetables and groceries delivered at
//           your doorstep with Foodsto.
//         </p>
//         <button className="bg-green-600 text-white px-36 py-2 text-2xl font-medium rounded-md flex w-full max-w-md items-center gap-2 mt-4 hover:bg-green-500 transition-colors cursor-pointer">
//           <span className=""> View more</span>
//           <GoArrowRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Hero1;



import { GoArrowRight } from "react-icons/go";

const Hero1 = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-[-10px] bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('/images/hero-image.jpg')" }}
      ></div>

      {/* Content Layer */}
      <div className="relative z-10 h-full container mx-auto flex flex-col justify-center px-4 md:px-8">
        <h1 className="text-white text-4xl md:text-6xl lg:text-[90px] font-bold">
          Buy Best <span className="text-green-600">Organic Products</span>{" "}
          Online
        </h1>
        <p className="text-white mt-4 max-w-2xl text-xl md:text-3xl font-medium">
          Get naturally produced fruits, vegetables and groceries delivered at
          your doorstep with Foodsto.
        </p>
        <button className="bg-green-600 text-white px-10 py-3 text-xl md:text-2xl font-medium rounded-md flex items-center gap-2 mt-6 hover:bg-green-500 transition-colors cursor-pointer w-fit">
          <span>View more</span>
          <GoArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Hero1;
