import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ImageUploader from "../../../admin/products/components/image-uploader";
import cloudinaryUpload from "../../../../general/common/cloudinary-upload";
import { MdDelete } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { motion } from "framer-motion";
import { FadeLeft } from "../../../../utils/animation";

const AddNewProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    size: "",
    colors: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image before submitting!");
      return;
    }

    const numericStock = Number(formData.stock);
    if (isNaN(numericStock) || numericStock < 0) {
      toast.error("Please enter a valid number for stock!");
      return;
    }

    try {
      const uploadedImageUrl = await cloudinaryUpload(formData.image);
      if (!uploadedImageUrl) {
        toast.error("Image upload failed. Please try again.");
        return;
      }

      const productData = {
        ...formData,
        stock: numericStock,
        image: uploadedImageUrl,
        createdAt: new Date().toISOString(),
      };

      // Replace this with your own API call
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to submit product");

      toast.success("Product added successfully!");

      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        size: "",
        colors: "",
        image: "",
      });

      navigate("/ProductsPage");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product!");
    }
  };

  return (
    <motion.div
      variants={FadeLeft(0.5)}
      initial="hidden"
      whileInView={"visible"}
      className="text-gray-950 h-screen"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <AiOutlineArrowLeft size={20} />
        <span>Back</span>
      </button>
      <div className="flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 shadow-lg rounded-lg p-6 sm:p-12 mt-8 w-full max-w-7xl space-y-6 overflow-y-auto mb-15 md:mb-0"
        >
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
            {/* Image Preview */}
            <div className="flex flex-col items-center justify-center sm:w-1/3 p-4 sm:p-8">
              {formData.image ? (
                <>
                  <div className="relative">
                    <img
                      src={
                        typeof formData.image === "string"
                          ? formData.image
                          : URL.createObjectURL(formData.image)
                      }
                      alt="Uploaded"
                      className="w-50 h-50 object-cover rounded-full border-5 border-gray-400"
                    />
                    <div
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, image: "" }))
                      }
                      className="absolute cursor-pointer top-[10px] right-[-10px]"
                    >
                      <MdDelete size={20} className="text-red-500" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-gray-400 rounded-full p-8 cursor-pointer">
                  <FaCamera size={100} />
                </div>
              )}
            </div>

            {/* Input Fields */}
            <div className="flex-1 grid grid-cols-1 gap-6 p-4 sm:p-8">
              <ImageUploader
                onUpload={(file) => setFormData({ ...formData, image: file })}
              />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border-b-2 border-gray-300 bg-transparen text-black outline-none w-full text-lg"
              />
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="border-b-2 border-gray-300 bg-transparen text-black outline-none w-full text-lg"
              />
              <input
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Size"
                className="border-b-2 border-gray-300 bg-transparen text-black outline-none w-full text-lg"
              />
            </div>
            <div className="flex-1 grid grid-cols-1 gap-6 p-4 sm:p-8">
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="border-b-2 border-gray-300 bg-transparen text-black outline-none w-full text-lg"
              />
              <input
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="border-b-2 border-gray-300 bg-transparen text-black outline-none w-full text-lg"
              />
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border-b-2 border-gray-300 bg-transparen text-black outline-none w-full text-lg"
              />
              <input
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                placeholder="Colors"
                className="border-b-2 border-gray-300 bg-transparen text-black outline-none w-full text-lg"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="bg-blue-500 text-white px-8 py-1 rounded-md hover:bg-blue-600 text-lg cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddNewProduct;
