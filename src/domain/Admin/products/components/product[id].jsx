import { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeLeft } from "../../../../utils/animation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ImageUploader from "./image-uploader";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "view";

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const mockProducts = [
      {
        id: "1",
        name: "Plantain",
        category: "Food",
        price: "₦2000",
        stock: 10,
        description: "Fresh plantain",
        image: "",
      },
      {
        id: "2",
        name: "Apple",
        category: "Food",
        price: "₦3000",
        stock: 5,
        description: "Juicy apples",
        image: "",
      },
    ];

    const foundProduct = mockProducts.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save logic here
    console.log("Product saved:", product);
    toast.success("Product saved successfully!");
    navigate("/dashboard/product");
  };

  return (
    <motion.div
      variants={FadeLeft(0.5)}
      initial="hidden"
      whileInView={"visible"}
      className="text-gray-950"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <AiOutlineArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className="flex flex-col items-center justify-center">
        <div className="shadow-md rounded-lg p-6 sm:p-12 mt-8 w-full max-w-7xl space-y-6 overflow-y-auto mb-15 md:mb-0">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            {mode === "edit" ? "Edit Product" : "View Product"}
          </h3>
          <div className="space-y-6">
            {/* Image Upload Section */}
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4">
              {product.image ? (
                <>
                  <div className="relative">
                    <img
                      src={product.image}
                      alt="Uploaded"
                      className="w-50 h-50 object-cover rounded-full border-5 border-gray-400"
                    />
                    <div
                      onClick={() =>
                        setProduct((prev) => ({ ...prev, image: "" }))
                      }
                      className="absolute cursor-pointer top-[10px] right-[2px]"
                    >
                      <MdDelete size={20} className="text-red-500" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="dark:bg-blue-500 bg-gray-500 text-gray-400 dark:text-white p-6 rounded-full mb-4 sm:mb-0">
                  <FaCamera size={70} />
                </div>
              )}
              {mode === "edit" && (
                <ImageUploader
                  onUpload={(url) => setProduct({ ...product, image: url })}
                  defaultImage={product.image}
                />
              )}
            </div>

            {/* Form Fields */}
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 sm:p-8">
                {/* Name */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 outline-none text-black rounded-lg"
                    placeholder="Enter product name"
                    readOnly={mode !== "edit"}
                  />
                </div>

                {/* Category */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg outline-none"
                    placeholder="Enter category"
                    readOnly={mode !== "edit"}
                  />
                </div>

                {/* Price */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg outline-none"
                    placeholder="Enter price"
                    readOnly={mode !== "edit"}
                  />
                </div>

                {/* Stock */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg outline-none"
                    placeholder="Enter stock"
                    readOnly={mode !== "edit"}
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg outline-none"
                    placeholder="Enter description"
                    readOnly={mode !== "edit"}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 mb-14 flex justify-end space-x-4">
              <button
                onClick={() => navigate("/dashboard/product")}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              {mode === "edit" && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditProduct;
