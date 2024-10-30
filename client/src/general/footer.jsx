import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer({ darkMode }) {
  return (
    <footer
      className={`py-8 px-4 transition-all w-[100%] ${
        darkMode ? "bg-gray-900 text-white" : "bg-red-400 text-white"
      }`}
    >
      <div className="container mx-auto flex flex-col items-center md:flex-row justify-between">
        {/* Logo */}
        <div className="text-center md:text-left">
          <h1 className="heading2 text-5xl font-bold">TrackTrial</h1>
          <p className="heading mt-2 text-white-400">
            Simplifying task management for everyone.
          </p>
        </div>

        {/* Office Address */}
        <div className="mt-4 md:mt-0">
          <h2 className="heading text-xl font-bold">Our Office</h2>
          <p className="text mt-1 text-gray-100">123 Task St.</p>
          <p className="text text-gray-100">Cityville, ST 12345</p>
          <p className="text text-gray-100">Email: info@taskmanager.com</p>
          <p className="text text-gray-100">Phone: (123) 456-7890</p>
        </div>

        {/* Social Media Links */}
        <div className="mt-4 md:mt-0">
          <h2 className="heading text-xl font-semibold">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                size="2x"
                className="text-gray-200 hover:text-white"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                size="2x"
                className="text-gray-200 hover:text-white"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size="2x"
                className="text-gray-200 hover:text-white"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                size="2x"
                className="text-gray-200 hover:text-white"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 text-center">
        <p className="text text-gray-200">
          © {new Date().getFullYear()} Task Manager. All rights reserved.
        </p>
        <p className="text text-gray-200 cursor-pointer">
          Privacy Policy | Terms of Service
        </p>
      </div>
    </footer>
  );
}

export default Footer;
