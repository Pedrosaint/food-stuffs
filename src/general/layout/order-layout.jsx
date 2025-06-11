import { Outlet } from "react-router-dom";

const OrderLayout = () => {
  return (
    <div className="flex-1 relative z-10">
      <main className="mx-auto py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default OrderLayout;
