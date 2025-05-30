import React from "react";

const Hero4 = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-16"
      style={{ backgroundImage: "url('/images/banner.jpg')" }} // ← Your banner image here
    >
      {/* Optional dark overlay */}
      <div className="bg-black/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-8">
            Discover Fresh Organic Goodness
          </h2>
          <p className="text-lg mb-12">
            Shop hand-picked fruits, veggies, and groceries delivered straight
            to your door.
          </p>

          <div className="flex justify-center">
            <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero4;
