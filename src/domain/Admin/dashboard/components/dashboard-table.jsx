import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Search, Trash2, Eye } from "lucide-react";
import SkeletonCard from "../../../../general/common/skeleton-card";

const DashboardTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [delayed, setDelayed] = useState(true);

  // Simulated fetch data without Firebase
  useEffect(() => {
    // Replace this mock data with actual data source or props
    const mockProducts = [
      {
        id: "1",
        name: "Plantain",
        category: "Food",
        price: "₦2000",
        stock: 10,
        description: "Fresh plantain",
        image:""
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

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    setLoading(false);
    setTimeout(() => setDelayed(false), 2000);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  return (
    <motion.div
      className="bg-opacity-50 backdrop-blur-md shadow-md rounded-xl p-6 border border-gray-200 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl font-semibold">Reacent Purchases</h2>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 my-4 sm:my-2 w-full max-w-md bg-white">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search Product..."
            className="flex-1 bg-transparent outline-none text-black"
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
      </div>

      <div className="overflow-y-auto h-96 border border-gray-300 rounded-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="sticky top-0 z-10 bg-gray-200 text-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {loading || delayed
              ? Array.from({ length: 8 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={6}>
                      <SkeletonCard />
                    </td>
                  </tr>
                ))
              : filteredProducts.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          className="md:h-10 md:w-10 w-5 h-5 rounded-full object-cover bg-orange-600"
                        />
                        <div className="ml-4 text-sm font-medium">
                          {product.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-2">
                      <button className="text-blue-500">
                        <Eye size={18} />
                      </button>
                      <button className="text-yellow-500">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default DashboardTable;
