import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ClipLoader from "react-spinners/ClipLoader";

const DailyOrders = () => {
  const [dailyOrdersData, setDailyOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace with API call if needed
        const mockOrders = [
          { date: "6/1/2025", status: "Delivered" },
          { date: "6/1/2025", status: "Pending" },
          { date: "6/2/2025", status: "Delivered" },
          { date: "6/3/2025", status: "Delivered" },
        ];

        const ordersByDate = {};

        mockOrders.forEach((order) => {
          const orderDate = new Date(order.date).toLocaleDateString("en-US");
          if (!ordersByDate[orderDate]) {
            ordersByDate[orderDate] = 0;
          }
          ordersByDate[orderDate] += 1;
        });

        const formattedData = Object.keys(ordersByDate).map((date) => ({
          date,
          orders: ordersByDate[date],
        }));

        setDailyOrdersData(formattedData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <motion.div
      className="bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-4">Daily Orders</h2>
      <div className="h-[320px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#6366f1" size={50} />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyOrdersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#374151" />
              <YAxis stroke="#374151" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderColor: "#e5e7eb",
                }}
                itemStyle={{ color: "#374151" }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default DailyOrders;
