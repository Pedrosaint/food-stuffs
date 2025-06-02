const Card = ({ title, image, bgColor }) => {
  return (
    <div
      className="rounded-xl p-4 w-full flex justify-between items-center hover:drop-shadow-xl transition-all duration-500 ease-in-out"
      style={{ backgroundColor: bgColor }}
    >
      {/* Left section */}
      <div className="flex flex-col justify-end h-[70px]">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <button className="text-white bg-yellow-500 hover:bg-yellow-600 text-md py-1 px-3 rounded cursor-pointer">
          View Shop →
        </button>
      </div>

      {/* Image section */}
      <img
        src={image}
        alt={title}
        className="w-[200px] h-[200px] object-cover rounded-full"
      />
    </div>
  );
};

export default Card;
