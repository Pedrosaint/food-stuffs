import { createBrowserRouter } from "react-router-dom";
import LandingPageView from "../domain/landing-page/view/landing-page-view";


export default function appRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <LandingPageView />,
    },
  ]);
}
