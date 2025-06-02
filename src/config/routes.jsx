import { createBrowserRouter } from "react-router-dom";
import LandingPageView from "../domain/landing-page/view/landing-page-view";
import ProductsView from "../domain/products/view/products-view";
import Login from "../general/auth/login";
import DashboardLayout from "../general/layout/dashboard-layout";
import DashboardView from "../domain/Admin/dashboard/view/dashboard-view";


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
        // {
        //   path: "products",
        //   element: <ProductsView />,
        // },
        // {
        //   path: "orders",
        //   element: <OrdersView />,
        // },
        // {
        //   path: "logout",
        //   element: <LogoutView />,
        // },
      ],
    },
  ]);
}
