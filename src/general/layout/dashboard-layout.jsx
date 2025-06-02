import { sidebarLinks } from "../../utils/sidebar-link";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../common/header";
import { useEffect, useState } from "react";


const DashboardLayout = () => {
    const [title, setTitle] = useState(""); 

  useEffect(() => {
    const current = sidebarLinks.find((link) =>
      location.pathname.startsWith(link.path)
    );
    setTitle(current ? current.name : "Dashboard");
  }, [location.pathname]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.id} className="mb-4">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <link.icon
                  size={20}
                  style={{ color: link.color, minWidth: "20px" }}
                />
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Header title={ title } />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
