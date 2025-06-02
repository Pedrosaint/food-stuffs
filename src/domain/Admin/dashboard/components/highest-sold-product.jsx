import React, { useState } from "react";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

 
const data = [
  { name: "Bananas", sales: 400 },
  { name: "Plantain", sales: 300 },
  { name: "Apples", sales: 250 },
  { name: "Grapes", sales: 200 },
];

const HighestSoldProductsPie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const categoryData = data;

  return (
    <motion.div
      className="bg-opacity-50 backdrop-blur-md shadow-lg rounded-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4">Highest Sold Products</h2>
      <div className="h-80">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#6366f1" size={50} />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="sales"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((entry, index) => (
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

export default HighestSoldProductsPie;
