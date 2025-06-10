import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Package, TrendingUp } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";

import StatCard from "../../../../general/common/stat-card";
import ProductsTable from "../../products/components/product-table";

export const DashboardProductView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({
    totalProducts: 120, // mock data
    topSelling: 40,
    lowStock: 12,
    totalRevenue: "₦2,340,000",
  });

  // Simulate loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleAddNewProduct = () => {
    navigate("/dashboard/product/new-product");
  };

  return (
    <div className="flex-1 relative z-10">
      <main className="mx-auto">
        {location.pathname === "/ProductView/newProduct" ? (
          <Outlet />
        ) : (
          <>
            {/* STATS */}
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <StatCard
                name="Total Products"
                icon={Package}
                value={stats.totalProducts.toLocaleString()}
                color="#6366f1"
                isLoading={isLoading}
              />
              <StatCard
                name="Top Selling"
                icon={TrendingUp}
                value={stats.topSelling.toLocaleString()}
                color="#6366f1"
                isLoading={isLoading}
              />
              <StatCard
                name="Low Stock"
                icon={AlertTriangle}
                value={stats.lowStock.toLocaleString()}
                color="#ec4899"
                isLoading={isLoading}
              />
              <StatCard
                name="Total Revenue"
                icon={TbCurrencyNaira}
                value={isLoading ? "Loading..." : stats.totalRevenue}
                color="#10b981"
                isLoading={isLoading}
              />
            </motion.div>

            <motion.div
              className="flex justify-end items-center mb-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 2 }}
              transition={{ delay: 0.1 }}
            >
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 cursor-pointer"
                onClick={handleAddNewProduct}
              >
                Add new Product
              </button>
            </motion.div>

            {/* Table */}
            <ProductsTable />
            

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            </div>
          </>
        )}
      </main>
    </div>
  );
};
