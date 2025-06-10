// components/ProductCard.jsx
import { GoArrowRight } from "react-icons/go";

const ProductCard = ({ name, image, price, oldPrice, onSale }) => {
  return (
    <>
      {/* Product Card */}
      <div className="rounded-xl overflow-hidden p-4 border border-gray-100 relative text-center hover:drop-shadow-xl transition-all duration-500 ease-in-out">
        {onSale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Sale!
          </span>
        )}
        <div className="bg-[#fff6ec] rounded-md p-4">
          <img
            src={image}
            alt={name}
            className="w-[200px] h-[200px] object-contain mx-auto mb-3"
          />
        </div>
        <h3 className="text-xl text-start font-semibold mb-1 mt-2">{name}</h3>
        <div className="text-sm text-start">
          {oldPrice && (
            <span className="text-gray-500 text-md line-through mr-1">
              ${oldPrice}
            </span>
          )}
          <span className="text-green-400 text-md font-bold">${price}</span>
        </div>
        <button className="bg-yellow-400 text-white px-3 md:px-6 py-2 text-sm md:text-md font-medium rounded-md flex items-center gap-2 mt-4 hover:bg-yellow-500 transition-colors cursor-pointer w-full justify-center">
          <span className="">ADD TO CART</span>
          <GoArrowRight  size={24} />
        </button>
      </div>
    </>
  );
};

export default ProductCard;
