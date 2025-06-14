import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import HighestSoldProducts from "../components/highest-sold-product";
import DashboardTable from "../components/dashboard-table";

import StatCard from "../../../../general/common/stat-card";
import SalesChart from "../../../Admin/dashboard/components/sales-chart";

const DashboardView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalSales, setTotalSales] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);

      try {
        const orders = [
          { totalAmount: 5000 },
          { totalAmount: 12000 },
          { totalAmount: 3000 },
        ];
        const users = [{}, {}, {}, {}, {}]; // 5 users
        const products = new Array(20).fill({}); // 20 products

        const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        const totalOrders = orders.length;

        setTotalSales(totalRevenue);
        setUserCount(users.length);
        setTotalProducts(products.length);

        const calculatedConversionRate =
          users.length > 0 ? (totalOrders / users.length) * 100 : 0;
        setConversionRate(calculatedConversionRate);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        const timeout = setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex-1 relative z-10">
      <main className="mx-auto py-6">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Sales"
            icon={Zap}
            value={`₦${totalSales.toLocaleString()}`}
            color="#6366f1"
            isLoading={isLoading}
          />
          <StatCard
            name="New Users"
            icon={Users}
            value={userCount}
            color="#6366f1"
            isLoading={isLoading}
          />
          <StatCard
            name="Total Products"
            icon={ShoppingBag}
            value={totalProducts}
            color="#ec4899"
            isLoading={isLoading}
          />
          <StatCard
            name="Conversion Rate"
            icon={BarChart2}
            value={`${conversionRate.toFixed(2)}%`}
            color="#10b981"
            isLoading={isLoading}
          />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesChart />
          <HighestSoldProducts />
        </div>
        <div className="mt-8">
          <DashboardTable />
        </div>
      </main>
    </div>
  );
};

export default DashboardView;
