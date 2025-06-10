import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
import SkeletonCard from "../../../../general/common/skeleton-card";
import { toast } from "sonner";


const orders = [
  {
    id: "ORD12345",
    userName: "John Doe",
    totalAmount: "$120.00",
    status: "Delivered",
    date: "2025-06-01",
    cartItems: [
      {
        name: "Blue Shirt",
        color: "Blue",
        size: "L",
        price: "$40",
        quantity: 1,
      },
      {
        name: "Black Jeans",
        color: "Black",
        size: "32",
        price: "$80",
        quantity: 1,
      },
    ],
    shippingAddress: {
      fullName: "John Doe",
      address: "123 Market Street",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
    },
  },
  {
    id: "ORD67890",
    userName: "Jane Smith",
    totalAmount: "$75.00",
    status: "Processing",
    date: "2025-06-02",
    cartItems: [
      { name: "Red Dress", color: "Red", size: "M", price: "$75", quantity: 1 },
    ],
    shippingAddress: {
      fullName: "Jane Smith",
      address: "456 Broad Avenue",
      city: "Abuja",
      state: "FCT",
      country: "Nigeria",
    },
  },
];
  

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [viewOrder, setViewOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [delayed, setDelayed] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);


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

  const handleDelete = async (orderId) => {
    try {
      // Replace with your delete API call
      await fetch(`/api/orders/${orderId}`, { method: "DELETE" });

      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      setFilteredOrders((prev) => prev.filter((o) => o.id !== orderId));
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting order");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    if (!newStatus) return toast.error("Status is undefined");
    try {
      // Replace with your update API call
      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating status");
    }
  };

  return (
    <>
      <>
        <motion.div
          className="bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <h2 className="text-xl font-semibold">Orders List</h2>

            <div className="flex items-center border border-gray-200 bg-white rounded-lg px-3 py-2 my-4 sm:my-2">
              <Search
                className="text-gray-500 mr-2"
                size={18}
              />
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
            <table className="min-w-full divide-y divide-gray-700">
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

              <tbody className="divide-y divide-gray-700">
                {loading || delayed
                  ? Array.from({ length: 0 }).map((_, index) => (
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
                                : order.status === "Shipped"
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

                        <td className=" py-4 whitespace-nowrap text-sm text-gray-300 flex space-x-1">
                          <div className="relative group">
                            <button
                              onClick={() => setViewOrder(order)}
                              className="p-2 text-blue-500  hover:text-blue-600"
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
                              className="p-2 text-yellow-500 hover:text-yellow-600"
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
                              className="p-2 text-red-500  hover:text-red-600"
                            >
                              <Trash2 size={20} />
                            </button>
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700  rounded opacity-0 group-hover:opacity-100">
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

        {/*--------------------View Product (modal)----------------------------------*/}

        {viewOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-300 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Order Details
              </h3>
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <p className="text-gray-800 dark:text-white p-3">
                    {viewOrder.cartItems && viewOrder.cartItems.length > 0 && (
                      <div className="text-xl text-gray-800 dark:text-gray-200">
                        <h3 className="font-medium">Items Purchased:</h3>
                        <ul className="list-disc pl-5">
                          {viewOrder.cartItems.map((item, index) => (
                            <li key={index} className="mb-2">
                              <span className="font-semibold">{item.name}</span>
                              <span> - Color: {item.color}</span>
                              <span> - Size: {item.size}</span>
                              <span> - Price: {item.price}</span>
                              <span>
                                {" "}
                                - Quantity/size: {item.quantity || item.size}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-800 dark:text-white p-3">
                    <span className="font-bold p-1">Order ID:</span>{" "}
                    {viewOrder.id}
                  </p>
                  <p className="text-gray-800 dark:text-white p-3">
                    <span className="font-bold p-1">Name:</span>{" "}
                    {viewOrder.userName}
                  </p>
                  <p className="text-gray-800 dark:text-white p-3">
                    <span className="font-bold p-1">Total:</span>
                    {viewOrder.totalAmount}
                  </p>
                  <p className="text-gray-800 dark:text-white p-3">
                    <span className="font-bold p-1">Status:</span>{" "}
                    {viewOrder.status || orderStatus}
                  </p>
                  <p className="text-gray-800 dark:text-white p-3">
                    <span className="font-bold p-1">Date:</span>{" "}
                    {viewOrder.date}
                  </p>
                  <p className="text-gray-800 dark:text-white p-3">
                    <span className="font-bold p-1">Shipping Address:</span>{" "}
                    {viewOrder.shippingAddress && (
                      <span className="text-xl text-gray-800 dark:text-gray-200">
                        {`${viewOrder.shippingAddress.fullName}, ${viewOrder.shippingAddress.address}, ${viewOrder.shippingAddress.city}, ${viewOrder.shippingAddress.state}, ${viewOrder.shippingAddress.country}`}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-3">
                <button
                  className="px-4 py-2 bg-green-800 text-gray-200 rounded-lg hover:bg-green-600"
                  onClick={() => updateOrderStatus(viewOrder.id, "Delivered")}
                >
                  Mark as Delivered
                </button>
                <button
                  className="px-4 py-2 bg-blue-800 text-gray-200 rounded-lg hover:bg-blue-600"
                  onClick={() => updateOrderStatus(viewOrder.id, "Processing")}
                >
                  Mark as Processing
                </button>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewOrder(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
    
};

export default OrdersTable;
