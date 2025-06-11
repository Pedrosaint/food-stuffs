// src/routes/app-router.tsx

import { createBrowserRouter } from "react-router-dom";
import LandingPageView from "../domain/landing-page/view/landing-page-view";
import Login from "../general/auth/login";
import DashboardLayout from "../general/layout/dashboard-layout";
import DashboardView from "../domain/admin/dashboard/view/dashboard-view";
import ProductsView from "../domain/products/view/products-view";
import { DashboardProductView } from "../domain/admin/products/view/dashboard-product-view";
import AddNewProduct from "../domain/admin/products/components/add-new-product";
import ProductLayout from "../general/layout/product-layout";
import OrdersView from "../domain/admin/orders/view/orders-view";
import EditProduct from "../domain/admin/products/components/product[id]";
import OrdersLayout from "../general/layout/order-layout";
import Order from "../domain/admin/orders/components/order[id]";

export default function appRouter() {
  return createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <LandingPageView />,
    },
    {
      path: "/products",
      element: <ProductsView />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <DashboardView />,
        },
        {
          path: "product",
          element: <ProductLayout />,
          children: [
            {
              index: true,
              element: <DashboardProductView />,
            },
            {
              path: "new-product",
              element: <AddNewProduct />,
            },
            {
              path: "product/:id",
              element: <EditProduct />,
            },
          ],
        },
        {
         path: "orders",
          element: <OrdersLayout />,
          children: [
            {
              index: true,
              element: <OrdersView />,
            },
            {
              path: "order/:id",
              element: <Order />,
            },
          ],
        },
      ],
    },
  ]);
}
