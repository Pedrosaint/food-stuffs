import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy static data (you can fetch from a local file or custom API)
  useEffect(() => {
    const dummySales = [
      { name: "Jan", sales: 12000 },
      { name: "Feb", sales: 15000 },
      { name: "Mar", sales: 18000 },
      { name: "Apr", sales: 10000 },
      { name: "May", sales: 22000 },
    ];

    setTimeout(() => {
      setSalesData(dummySales);
      setIsLoading(false);
    }, 1000); // Simulate loading delay
  }, []);

  return (
    <motion.div
      className="p-6 shadow-lg rounded-md border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-bold mb-4">Sales Overview</h2>
      <div className="h-80">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#6366f1" size={50} />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: "#6366f1", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default SalesChart;