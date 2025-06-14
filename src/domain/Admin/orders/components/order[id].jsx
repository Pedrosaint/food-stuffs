import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  AiOutlineArrowLeft,
  AiOutlineUser,
  AiOutlineEnvironment,
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../general/ui/card";
import { Button } from "../../../../general/ui/button";
import { Spinner } from "../../../../general/common/loading";

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
    ];

    const foundOrder = mockOrders.find((o) => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
    setLoading(false);
  }, [id]);

  const updateOrderStatus = (newStatus) => {
    setOrder((prev) => ({ ...prev, status: newStatus }));
    toast.success(`Order status updated to ${newStatus}`);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateItemTotal = (price, quantity) => {
    return (
      Number.parseInt(price.replace(/,/g, "")) * quantity
    ).toLocaleString();
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <Spinner />
      </div>
    );
  }

  if (!order.id) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <AiOutlineShoppingCart
            size={64}
            className="mx-auto text-gray-400 mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Order not found
          </h3>
          <p className="text-gray-500">
            The order you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate(-1)} className="mt-4" variant="ghost">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className=""
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4 gap-2"
          >
            <AiOutlineArrowLeft size={20} />
            Back to Orders
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {mode === "edit" ? "Edit Order" : "Order Details"}
              </h1>
              <p className="text-gray-500 mt-1">Order #{order.id}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-3">
              <div>
                <span className="font-semibold">Status:</span>
                <span
                  className={`ml-2 px-3 py-1 font-semibold border rounded-full text-xs ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800 border-green-300"
                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-800 border-blue-300"
                      : "bg-red-100 text-red-800 border-red-300"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Customer & Order Info */}
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AiOutlineUser className="text-blue-600" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Customer Name
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {order.userName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Order Date
                    </p>
                    <p className="text-gray-900 flex items-center gap-2">
                      <AiOutlineCalendar className="text-gray-400" />
                      {formatDate(order.date)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AiOutlineEnvironment className="text-green-600" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">
                      {order.shippingAddress.fullName}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.address}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AiOutlineShoppingCart className="text-purple-600" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Product
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">
                          Price
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">
                          Quantity
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.cartItems.map((item, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">
                              {item.name}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right text-gray-600">
                            ₦{item.price}
                          </td>
                          <td className="py-4 px-4 text-right text-gray-600">
                            {item.quantity}
                          </td>
                          <td className="py-4 px-4 text-right font-semibold text-gray-900">
                            ₦{calculateItemTotal(item.price, item.quantity)}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AiOutlineDollarCircle className="text-green-600" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₦{order.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>₦{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {mode === "edit" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Update Order Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => updateOrderStatus("Processing")}
                    variant="primary"
                    className="w-full border-1 cursor-pointer"
                    disabled={order.status === "Processing"}
                  >
                    Mark as Processing
                  </Button>
                  <Button
                    onClick={() => updateOrderStatus("Delivered")}
                    variant="success"
                    className="w-full border-1 cursor-pointer"
                    disabled={order.status === "Delivered"}
                  >
                    Mark as Delivered
                  </Button>
                  <div className="border-t pt-3">
                    <Button
                      onClick={() => navigate("/dashboard/orders")}
                      variant="secondary"
                      className="w-full"
                    >
                      Back to Orders
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <Button
                    onClick={() => navigate("/dashboard/orders")}
                    variant="secondary"
                    className="w-full"
                  >
                    Back to Orders
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Order;
