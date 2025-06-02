import foodIcon from "../../../../assets/icon/food-icon.png";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f0fff4] text-gray-800 py-4 px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 mt-5">
          <div className="mb-6">
            <div className="flex items-center">
              <img src={foodIcon} alt="Logo" className="h-9 w-16" />
              <h1 className="text-[#3b8021] font-bold text-lg">
                dozyfood<span className="text-[#d4a029] font-semibold">ltd</span>
              </h1>
            </div>
            <p className="text-md mt-4">
              ODS Seeds leads to a significant contribution for the vegetable
              value chain and meets the present and future needs of the
              customers. ODS Seeds brings expertise.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Information</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Quick Contact</h2>
            <address className="not-italic space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" />
                <a
                  href="https://www.google.com/maps/search/Newtonhof+2d+Zoetermeer+2723+BR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Newtonhof 2d, Zoetermeer, 2723 BR
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-green-600" />
                <a href="tel:+31616760064" className="hover:underline">
                  +31 616760064
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 text-center text-sm">
          <p>© {new Date().getFullYear()} dozyfoodltd</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
