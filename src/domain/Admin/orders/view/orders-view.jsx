import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, ShoppingBag } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";

import StatCard from "../../../../general/common/stat-card";
import DailyOrders from "../../orders/components/daily-orders";
import OrdersTable from "../../orders/components/orders-table";
import OrderDistribution from "../../orders/components/order-distribution";


const OrdersView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: "0",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let totalOrders = 0;
        let pendingOrders = 0;
        let completedOrders = 0;
        let totalRevenue = 0;

        orders.forEach((order) => {
          totalOrders += 1;

          if (order.status === "Pending") pendingOrders += 1;
          if (order.status === "Delivered") completedOrders += 1;

          if (order.totalAmount) {
            const amount = parseFloat(
              String(order.totalAmount).replace(/[^0-9.-]+/g, "")
            );
            if (!isNaN(amount)) {
              totalRevenue += amount;
            }
          }
        });

        setOrderStats({
          totalOrders,
          pendingOrders,
          completedOrders,
          totalRevenue: totalRevenue.toLocaleString("en-US", {
            style: "currency",
            currency: "NGN",
          }),
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex-1 relative z-10">
      <main className="mx-auto py-6">
        {/* ORDERS STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Orders"
            icon={ShoppingBag}
            value={
              isLoading ? "Loading..." : orderStats.totalOrders.toLocaleString()
            }
            color="#6366f1"
            isLoading={isLoading}
          />
          <StatCard
            name="Pending Orders"
            icon={Clock}
            value={
              isLoading
                ? "Loading..."
                : orderStats.pendingOrders.toLocaleString()
            }
            color="#10b981"
            isLoading={isLoading}
          />
          <StatCard
            name="Completed Orders"
            icon={CheckCircle}
            value={
              isLoading
                ? "Loading..."
                : orderStats.completedOrders.toLocaleString()
            }
            color="#f59e0b"
            isLoading={isLoading}
          />
          <StatCard
            name="Total Revenue"
            icon={TbCurrencyNaira}
            value={isLoading ? "Loading..." : orderStats.totalRevenue}
            color="#ef4444"
            isLoading={isLoading}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DailyOrders />
          <OrderDistribution />
        </div>

        <OrdersTable />
      </main>
    </div>
  );
};

export default OrdersView;
