import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userIcon from "../icons/userIcon.svg";
import logo from "../icons/WebLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

function Header({ user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goContactPage = () => {
    navigate("AddContacts");
    setIsSidebarOpen(false);
  };

  const handleDelete = () => {
    axios
      .get("http://localhost:8081/logout")
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const navItems = [
    { name: "Home", to: "" },
    { name: "Contact Us", to: "contact" },
    { name: "About", to: "about" },
  ];

  return (
    <header className="shadow-lg rounded-lg sticky z-50 top-0 w-full bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950">
      <nav className="bg-transparent px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex flex-wrap justify-between items-center">
          <Link to="" className="flex items-center">
            <img src={logo} className="h-10 sm:h-12 lg:h-14 mr-2" alt="Logo" />
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              Profile<strong className="text-cyan-400">Pro</strong>
            </span>
          </Link>

          <div className="flex items-center lg:order-2">
            <button
              onClick={toggleMenu}
              className="lg:hidden mr-2 text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>

            <button
              onClick={toggleSidebar}
              className="flex items-center bg-gray-700 text-white rounded-full pr-3 h-10 sm:h-11 py-2 hover:bg-cyan-400 transition-all duration-200 ease-in-out"
            >
              <div className="bg-cyan-400 p-2 rounded-full">
                <img
                  src={userIcon}
                  alt="User Icon"
                  className="h-5 sm:h-6 w-5 sm:w-6"
                />
              </div>
              <span className="ml-2 text-sm sm:text-base font-semibold">
                User
              </span>
            </button>
          </div>

          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-cyan-400"
                          : "text-white hover:text-cyan-400"
                      } py-2 pr-4 pl-3 text-lg font-semibold transition-all duration-200`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 right-4 bg-white shadow-lg p-4 rounded-lg">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className="text-gray-900 hover:text-cyan-400 font-semibold text-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        className={`fixed top-26 right-0 bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } w-48 sm:w-64 lg:w-80 max-h-[85vh] overflow-y-auto sm:max-h-[80vh] p-4 sm:p-6`}
        style={{ zIndex: 1000 }}
      >
        <h2 className="text-lg text-center font-semibold mb-4 text-gray-800">
          Profile
        </h2>
        <p className="text-gray-700 mb-2 flex">Name: <span className="truncate"> {user.name}</span></p>
        <p className="text-gray-700 mb-6  flex">Email: <span className="truncate"> {user.email}</span></p>
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors mb-4"
        >
          Log Out
        </button>
        <button
          onClick={goContactPage}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Contacts
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </header>
  );
}

export default Header;
