import { createBrowserRouter } from "react-router-dom";
import LandingPageView from "../domain/landing-page/view/landing-page-view";
import ProductsView from "../domain/products/view/products-view";
import Login from "../general/auth/login";


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
  ]);
}
