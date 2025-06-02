import { useState } from "react";
import { navLinks } from "../../utils/nav-link";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import foodIcon from "../../../src/assets/icon/food-icon.png";
import { HashLink } from "react-router-hash-link";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#f0fff4] py-4 px-4 md:px-8 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={foodIcon} alt="Logo" className="h-9 w-16" />
          <span className="text-[#3b8021] font-bold text-lg">Dutch</span>
          <span className="text-[#d4a029] font-semibold text-lg">Seeds</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <HashLink
                to={link.path}
                className={`text-sm font-semibold ${
                  location.pathname === link.path
                    ? "text-[#3b8021]"
                    : "text-black hover:text-[#3b8021]"
                }`}
              >
                {link.name}
              </HashLink>
            </li>
          ))}
        </ul>

        {/* Search bar */}
        <div className="flex items-center justify-between">
          <div className="md:flex items-center border border-gray-400 rounded-lg px-2 py-1 w-full max-w-md hidden">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none w-full"
            />
          </div>

          {/* Icons */}
          <div className="md:flex items-center space-x-4 ml-6 hidden">
            <button>
              <FiShoppingCart className="text-xl cursor-pointer hover:text-orange-500" />
            </button>
            <button onClick={() => navigate("/login")}>
              <FiUser className="text-xl cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button>
            <FiShoppingCart className="text-xl cursor-pointer hover:text-orange-500" />
          </button>
          <button onClick={() => navigate("/login")}>
            <FiUser className="text-xl cursor-pointer" />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#3b8021] text-2xl focus:outline-none"
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      <div className="flex items-center border border-gray-400 rounded-lg px-2 py-1 w-full md:hidden mt-3">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-full"
        />
      </div>

      {/* Mobile Dropdown Nav */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col mt-4 px-4 space-y-3">
          {navLinks.map((link) => (
            <li key={link.id}>
              <HashLink
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-semibold ${
                  location.pathname === link.path
                    ? "text-[#3b8021]"
                    : "text-black hover:text-[#3b8021]"
                }`}
              >
                {link.name}
              </HashLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

