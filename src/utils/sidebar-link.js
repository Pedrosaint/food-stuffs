import {
  BarChart2,
  ShoppingBag,
  ShoppingCart,
  LogOut,
} from "lucide-react";

export const sidebarLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    icon: BarChart2,
    color: "#6366f1",
  },
  {
    id: 2,
    name: "Products",
    path: "/dashboard/product",
    icon: ShoppingBag,
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "Orders",
    path: "/dashboard/orders",
    icon: ShoppingCart,
    color: "#f59e0b",
  },
  {
    id: 4,
    name: "Logout",
    path: "/logout",
    icon: LogOut,
    color: "red",
  },
];
