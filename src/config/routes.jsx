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
import LogoutView from "../domain/admin/logout/view/logout.view";

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
          ],
        },
        {
          path: "orders",
          element: <OrdersView />,
        },
        // {
        //   path: "logout",
        //   element: <Logout />,
        // },
      ],
    },
  ]);
}
