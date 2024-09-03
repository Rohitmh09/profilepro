import React from "react";
import { Link } from "react-router-dom";
import logo from "../icons/WebLogo.png";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow-md mb-10 ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="" className="flex items-center">
              <img src={logo} className="mr-3 h-16" alt="Logo" />
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
                Profile<strong className="text-orange-400">Pro</strong>
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Resources
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="about" className="hover:underline">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link
                    to="https://github.com/Rohitmh09/"
                    target="_blank"
                    className=" hover:underline"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.linkedin.com/in/rohit-mahadik-mh09"
                    target="_blank"
                    className="hover:underline"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
