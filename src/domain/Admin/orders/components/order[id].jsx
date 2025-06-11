import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FadeLeft } from "../../../../utils/animation";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "view";

  const [order, setOrder] = useState({
    id: "",
    userName: "",
    status: "",
    date: "",
    totalAmount: "",
    cartItems: [],
    shippingAddress: {
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
    },
  });
  const [loading, setLoading] = useState(true);

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
          country: "Nigeria",
        },
      },
      {
        id: "ORD67890",
        userName: "Jane Smith",
        totalAmount: "7,500",
        status: "Pending",
        date: "2025-06-02",
        cartItems: [{ name: "Mango", price: "7500", quantity: 10 }],
        shippingAddress: {
          fullName: "Jane Smith",
          address: "456 Oak Ave",
          city: "Abuja",
          state: "FCT",
          country: "Nigeria",
        },
      },
    ];

    const foundOrder = mockOrders.find((o) => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
    setLoading(false);
  }, [id]);

  const updateOrderStatus = (newStatus) => {
    setOrder((prev) => ({ ...prev, status: newStatus }));
    toast.success(`Order status updated successfully`);
  };

  if (loading) {
    return <div className="p-4">Loading order details...</div>;
  }

  if (!order) {
    return <div className="p-4">Order not found</div>;
  }

  return (
    <motion.div
      variants={FadeLeft(0.5)}
      initial="hidden"
      whileInView={"visible"}
      className="text-gray-950"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer mb-4"
      >
        <AiOutlineArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className="dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-1 border-[#68766c] pb-2">
          {mode === "edit" ? "Edit Order" : "Order Details"} #{order.id}
        </h2>
        <div>
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Name:</span> {order.userName}
                  </p>
                  <p>
                    <span className="font-medium">Order Date:</span>{" "}
                    {order.date}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  Shipping Address
                </h3>
                <div className="space-y-2">
                  <p>{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Order Items
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.cartItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {item.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">
                <span className="text-gray-600">Total Amount:</span>
                <span className="ml-2 text-gray-900">₦{order.totalAmount}</span>
              </div>

              {mode === "edit" ? (
                <div className="space-x-4">
                  <button
                    onClick={() => updateOrderStatus("Processing")}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Mark as Processing
                  </button>
                  <button
                    onClick={() => updateOrderStatus("Delivered")}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                  >
                    Mark as Delivered
                  </button>
                  <button
                    onClick={() => navigate("/dashboard/orders")}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer"
                  >
                    Back to Orders
                  </button>
                </div>
              ) : (
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/dashboard/orders`)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </motion.div>
  );
};

export default Order;