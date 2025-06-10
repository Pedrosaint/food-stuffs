import { sidebarLinks } from "../../utils/sidebar-link";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "../common/header";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import foodIcon from "../../assets/icon/food-icon.png";
import LogoutModal from "../../domain/admin/logout/modal/logout.modal";

const DashboardLayout = () => {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second with cleanup
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const { formattedDate, formattedTime } = (() => {
    const options = {
      date: {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      time: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      },
    };

    return {
      formattedDate: currentTime.toLocaleDateString("en-US", options.date),
      formattedTime: currentTime.toLocaleTimeString("en-US", options.time),
    };
  })();

  useEffect(() => {
    const current =
      sidebarLinks.find((link) => location.pathname === link.path) ||
      sidebarLinks
        .filter((link) => location.pathname.startsWith(link.path))
        .sort((a, b) => b.path.length - a.path.length)[0];

    setTitle(current ? current.name : "Dashboard");
  }, [location.pathname]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    setShowLogoutModal(false);
    // your logout logic here (e.g. clear token, redirect)
    console.log("Logging out...");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Overlay (for mobile) */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 bg-opacity-40 z-30 md:hidden"
        />
      )}

      {/* Sidebar for desktop */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#3f7d29] text-white p-4 transform transition-transform duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block`}
      >
        <div className="flex justify-between items-center border-b-2 border-[#2d661a] pb-4">
          <div className="flex items-center">
            <img src={foodIcon} alt="Logo" className="h-9 w-16" />
            <h1 className="text-[#fff] font-bold text-lg">
              dozyfood<span className="text-[#d4a029] font-semibold">ltd</span>
            </h1>
          </div>
          {/* Close button (mobile only) */}
          <div className="flex justify-between items-center md:hidden">
            <button onClick={toggleSidebar}>
              <AiOutlineClose size={24} />
            </button>
          </div>
        </div>

        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.id} className="mb-4 mt-5">
              {link.name === "Logout" ? (
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-red-700 w-full text-left"
                >
                  <link.icon size={20} style={{ color: link.color }} />
                  <span>{link.name}</span>
                </button>
              ) : (
                <NavLink
                  to={link.path}
                  end={link.path === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 p-2 rounded hover:bg-[#2d661a] ${
                      isActive ? "bg-[#2d5f1c]" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <link.icon size={20} style={{ color: link.color }} />
                  <span>{link.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#f0fff4] p-6 overflow-y-auto w-full">
        {/* Mobile Topbar */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button onClick={toggleSidebar} className="text-gray-800">
            <AiOutlineMenu size={24} />
          </button>
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-3 text-sm text-gray-600 min-w-fit">
              <time
                dateTime={currentTime.toISOString()}
                className="text-xs text-gray-600 whitespace-nowrap"
              >
                {formattedDate} {formattedTime}
              </time>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block">
          <Header title={title} />
        </div>

        <Outlet />
      </main>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default DashboardLayout;
