import React, { useState } from "react";
import ExpertlyLogoLogin from "../../../Assets/logo/ExpertlyLogoLogin.png";
import { Link } from "react-router-dom";
import { useCartContext } from "../../../context/cart_context";
import { useAuth } from "../../../context/AuthProvider";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profilePNG from "../../../Assets/profilePNG.png";

function Header() {
  const { total_items } = useCartContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logOut } = useAuth();
  const FullName = localStorage.getItem("username");

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logOut();
    // toast.success("You have successfully logged out");
  };

  const getMenuClassNames = () => {
    return `lg:flex lg:items-center ${
      isMenuOpen ? "block" : "hidden"
    } max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50`;
  };

  return (
    <header className="border-b bg-gradient-to-r from-[#e0f7fa] via-[#fce4ec] to-[#f3e5f5] min-h-[60px] px-10 py-3 relative tracking-wide z-50">
      <div className="flex flex-wrap items-center justify-between max-lg:gap-y-6 max-sm:gap-x-4">
        <div id="collapseMenu" className={getMenuClassNames()}>
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            onClick={handleToggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>

          <ul className="lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            {" "}
            <li className="max-lg:border-b max-lg:py-3">
              <Link
                to="/"
                className="hover:text-[#007bff] text-[15px] text-[#007bff] block font-bold"
              >
                Home
              </Link>
            </li>
            <li className="group max-lg:border-b max-lg:py-3 relative">
              <Link
                to="/training"
                className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] lg:hover:fill-[#007bff] block"
              >
                Workshops
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3">
              <Link
                to="/archive"
                className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] block"
              >
                Records
              </Link>
            </li>
          </ul>
        </div>

        <Link to="/" className="mx-auto">
          {" "}
          {/* Centered logo */}
          <img
            src={ExpertlyLogoLogin}
            alt="Expertlylogo"
            className="w-21 h-10"
          />
        </Link>

        <div
          className={`flex items-center ml-auto space-x-5 ${
            isMenuOpen ? "hidden" : ""
          }`}
        >
          <Link to="/cart" className="mt-0 sm:mt-4">
            <span className="relative mr-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                className="cursor-pointer fill-[#000] hover:fill-[#007bff] inline-block"
                viewBox="0 0 512 512"
              >
                <path
                  d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.271 0-15-6.73-15-15s6.73-15 15-15zm312.28-210-51.429 180H171.525l-40-180H477.24z"
                  data-original="#000000"
                ></path>
                <path
                  d="M150.967 407.375c-24.813 0-45 20.187-45 45s20.187 45 45 45 45-20.187 45-45-20.187-45-45-45zm0 60c-8.271 0-15-6.73-15-15s6.729-15 15-15 15 6.73 15 15-6.729 15-15 15zm211-60c-24.813 0-45 20.187-45 45s20.187 45 45 45 45-20.187 45-45-20.187-45-45-45zm0 60c-8.271 0-15-6.73-15-15s6.729-15 15-15 15 6.73 15 15-6.729 15-15 15zm0 0"
                  data-original="#000000"
                ></path>
              </svg>
              <span className="absolute left-auto -ml-1 -top-1 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
                {total_items}
              </span>
            </span>
          </Link>
          {user ? (
            <>
              {" "}
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Hello
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {FullName ? FullName : ""}
                </span>
              </div>
              <div className="relative">
                <button onClick={handleUserMenuToggle}>
                  <img src={profilePNG} alt="png profile" className="h-9 w-9" />
                </button>
                {isUserMenuOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/myOrders"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-700  hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 text-sm rounded-full font-bold text-white border-2  bg-gradient-to-r from-blue-500 to-green-500 transition-all ease-in-out duration-300 hover:bg-orange-300 hover:text-[#007bff]"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 text-sm rounded-full font-bold text-white border-2 bg-gradient-to-r from-blue-500 to-green-500 transition-all ease-in-out duration-300 hover:bg-orange-300 hover:text-[#007bff]"
              >
                Sign up
              </Link>
            </>
          )}

          <button id="toggleOpen" className="lg:hidden" onClick={handleToggle}>
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>{" "}
    </header>
  );
}

export default Header;
