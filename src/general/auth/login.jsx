import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../redux/authSlice";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { FaRegEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Outlet, useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password }).unwrap();
      localStorage.setItem("user", JSON.stringify(res));
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser({ email, password, fname, lname }).unwrap();
      toast.success("Registration successful");
      setIsLogin(true);
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    }
  };
  //-------------------- Reset Password ------------------------>
  const resetPassword = () => {
    navigate("/reset");
  };

  // ----Toggle between Login and Signup forms---->
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // -----Toggle the visibility of the password----->
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-4">
          <img
            src=""
            alt=""
            className="w-24 mx-auto mb-4 md:w-32 md:absolute md:-top-4 md:left-4"
          />

          <div className="bg-white text-black p-5 m-2 rounded-lg shadow-2xl ">
            <h2 className="text-2xl font-bold mb-2 text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <h3 className="text-center text-2xl font-medium mb-6 text-gray-400">
              {isLogin ? "Welcome back!" : ""}
            </h3>
            {isLogin ? (
              // Login Form=------------------->
              <form
                className="space-y-4 p-4"
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent form reload
                  handleLogin();
                }}
              >
                <div className="main mt-5">
                  <div className="flex items-center relative">
                    <FaRegEnvelope
                      color="gray"
                      size={17}
                      className="absolute left-2 top-1/2 transform -translate-y-[45%]"
                    />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder=""
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="block text-sm font-medium mb-1">
                      Email address*
                    </label>
                  </div>
                </div>

                <div className="relative password-field main">
                  <div className="flex items-center relative mt-8">
                    <FiLock
                      color="gray"
                      size={17}
                      className="absolute left-2"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="text"
                      id="password"
                      required
                      placeholder=" "
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <button
                      type="button"
                      className="absolute right-2 text-gray-400"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors font-semibold cursor-pointer"
                >
                  Login
                </button>
                <button
                  className="text-gray-900 sm:ml-48 ml-36 cursor-pointer"
                  onClick={resetPassword}
                >
                  Forgot passwod?
                </button>
              </form>
            ) : (
              // Signup Form------------------------->
              <form
                className="space-y-4 p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
              >
                <div className="flex flex-col sm:flex-row sm:gap-x-4 mt-6">
                  <label className="block text-sm font-medium mb-2 sm:mb-0 sm:flex-1 fname">
                    <input
                      type="text"
                      id="text"
                      name="text"
                      placeholder=" "
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                    <span className="block text-sm font-medium mb-1">
                      First Name
                    </span>
                  </label>

                  <label className="block text-sm font-medium mb-1 sm:flex-1 lname">
                    <input
                      type="text"
                      name="text"
                      id="text"
                      placeholder=" "
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />
                    <span className="block text-sm font-medium mb-1">
                      Last Name
                    </span>
                  </label>
                </div>
                <div className="main">
                  <div className="flex items-center relative mt-6">
                    <FaRegEnvelope
                      color="gray"
                      size={17}
                      className="absolute left-2 top-1/2 transform -translate-y-[45%]"
                    />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder=" "
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="block text-sm font-medium mb-1">
                      Email address*
                    </label>
                  </div>
                </div>

                <div className="relative password-field main">
                  <div className="flex items-center relative mt-6">
                    <FiLock
                      color="gray"
                      size={17}
                      className="absolute left-2"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="text"
                      id="password"
                      placeholder=" "
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <button
                      type="button"
                      className="absolute right-2 text-gray-400"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                >
                  Sign Up
                </button>
              </form>
            )}

            <p className="text-sm mt-6 text-center text-gray-500 cursor-pointer">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="text-blue-500 ml-2 hover:underline cursor-pointer"
                onClick={toggleForm}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Login;
