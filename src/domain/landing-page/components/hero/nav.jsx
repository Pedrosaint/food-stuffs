// import { navLinks } from "../../../../utils/nav-link";
// import { Link, useLocation } from "react-router-dom";
// import foodIcon from "../../../../assets/icon/food-icon.png";

// const Nav = () => {
//   const location = useLocation();

//   return (
//     <nav className="bg-[#f0fff4] py-4 px-8 flex justify-between items-center">
//       {/* Logo Section */}
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <img src={foodIcon} alt="Logo" className="h-9 w-16" />
//           {/* Replace with your actual logo path */}
//           <span className="text-[#3b8021] font-bold text-lg">Dutch</span>
//           <span className="text-[#d4a029] font-semibold text-lg">Seeds</span>
//         </div>

//         {/* Navigation Links */}
//         <ul className="flex space-x-8">
//           {navLinks.map((link) => (
//             <li key={link.id}>
//               <Link
//                 to={link.path}
//                 className={`text-sm font-semibold ${
//                   location.pathname === link.path
//                     ? "text-[#3b8021]"
//                     : "text-black hover:text-[#3b8021]"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Nav;




import { useState } from "react";
import { navLinks } from "../../../../utils/nav-link";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger + Close icons
import foodIcon from "../../../../assets/icon/food-icon.png";

const Nav = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#f0fff4] py-4 px-4 md:px-8">
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
              <Link
                to={link.path}
                className={`text-sm font-semibold ${
                  location.pathname === link.path
                    ? "text-[#3b8021]"
                    : "text-black hover:text-[#3b8021]"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#3b8021] text-2xl focus:outline-none"
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col mt-4 px-4 space-y-3">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-semibold ${
                  location.pathname === link.path
                    ? "text-[#3b8021]"
                    : "text-black hover:text-[#3b8021]"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Nav;
