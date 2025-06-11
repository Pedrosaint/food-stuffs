import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
import SkeletonCard from "../../../../general/common/skeleton-card";
import { toast } from "sonner";

const OrdersTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delayed, setDelayed] = useState(true);

  useEffect(() => {
    const mockOrders = [
      {
        id: "ORD12345",
        userName: "John Doe",
        totalAmount: "12,000",
        status: "Delivered",
        date: "2025-06-01",
        cartItems: [
          { name: "Beans", price: "4000", quantity: 1 },
          { name: "Carrot", price: "8000", quantity: 1 },
        ],
        shippingAddress: {
          fullName: "John Doe",
          address: "123 Main St",
          city: "Lagos",
          state: "Lagos",
          country: "Nigeria"
        }
      },
      {
        id: "ORD67890",
        userName: "Jane Smith",
        totalAmount: "7,500",
        status: "Pending",
        date: "2025-06-02",
        cartItems: [
          { name: "Mango", price: "7,500", quantity: 10 },
        ],
        shippingAddress: {
          fullName: "Jane Smith",
          address: "456 Oak Ave",
          city: "Abuja",
          state: "FCT",
          country: "Nigeria"
        }
      },
    ];

    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
    setLoading(false);
    setTimeout(() => setDelayed(false), 1000);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = orders.filter(
      (order) =>
        order.id?.toLowerCase().includes(term) ||
        order.userName?.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  const handleView = (order) => {
    navigate(`/dashboard/orders/order/${order.id}`, { 
      state: { mode: 'view' } 
    });
  };

  const handleEdit = (order) => {
    navigate(`/dashboard/orders/order/${order.id}`, { 
      state: { mode: 'edit' } 
    });
  };

  const handleDelete = (orderId) => {
    toast.warning("Delete functionality coming soon");
  };

  return (
    <motion.div
      className="bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-200 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl font-semibold">Orders List</h2>
        <div className="flex items-center border border-gray-200 bg-white rounded-lg px-3 py-2 my-4 sm:my-2">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search Orders..."
            className="bg-transparent outline-none text-black"
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Order Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300">
            {loading || delayed
              ? Array.from({ length: 2 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={6}>
                      <SkeletonCard />
                    </td>
                  </tr>
                ))
              : filteredOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {order.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {order.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {order.date}
                    </td>
                    <td className="py-4 whitespace-nowrap text-sm text-gray-300 flex space-x-1">
                      <div className="relative group">
                        <button
                          onClick={() => handleView(order)}
                          className="p-2 text-blue-500 hover:text-blue-600 cursor-pointer"
                        >
                          <Eye size={20} />
                        </button>
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100">
                          View
                        </span>
                      </div>
                      <div className="relative group">
                        <button
                          onClick={() => handleEdit(order)}
                          className="p-2 text-yellow-500 hover:text-yellow-600 cursor-pointer"
                        >
                          <Edit size={20} />
                        </button>
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100">
                          Edit
                        </span>
                      </div>
                      <div className="relative group">
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="p-2 text-red-500 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 size={20} />
                        </button>
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100">
                          Delete
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrdersTable;