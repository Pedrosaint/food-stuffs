import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ClipLoader from "react-spinners/ClipLoader";

const COLORS = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#fed766", "#2ab7ca"];

const OrderDistribution = () => {
  const [ordersDistributionData, setOrdersDistributionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        // Replace this with API call if needed
        const mockOrders = [
          { status: "Pending" },
          { status: "Processing" },
          { status: "Delivered" },
          { status: "Delivered" },
          { status: "Pending" },
        ];

        const statusCounts = {
          Pending: 0,
          Processing: 0,
          Delivered: 0,
        };

        mockOrders.forEach((order) => {
          if (statusCounts[order.status] !== undefined) {
            statusCounts[order.status] += 1;
          }
        });

        const formattedData = Object.entries(statusCounts).map(
          ([name, value]) => ({ name, value })
        );

        setOrdersDistributionData(formattedData);
      } catch (error) {
        console.error("Error fetching order statuses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMockData();
  }, []);

  return (
    <motion.div
      className="bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4">Order Status Distribution</h2>
      <div style={{ width: "100%", height: 300 }}>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#6366f1" size={50} />
          </div>
        ) : (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={ordersDistributionData}
                cx={"50%"}
                cy={"50%"}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {ordersDistributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default OrderDistribution;
