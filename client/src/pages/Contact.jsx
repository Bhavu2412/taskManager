"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { AuroraBackground } from "../ui/aurora-background";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions");
    } else {
      console.log("Form Data:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 w-[100vw]"
      >
        <div className="max-w-lg mx-auto mt-8 p-4 bg-transparent rounded-lg shadow-md w-[100vw]">
          <h2 className="heading text-2xl font-semibold mb-4 text-center text-gray-700 dark:text-white">
            Contact Us
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="col-span-1 sm:col-span-2">
              <label
                htmlFor="name"
                className="heading2 block font-medium text-gray-700 dark:text-white mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded-md bg-transparent text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label
                htmlFor="email"
                className="heading2 block font-medium text-gray-700 dark:text-white mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded-md bg-transparent text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label
                htmlFor="issue"
                className="heading2 block font-medium text-gray-700 dark:text-white mb-1"
              >
                Issue
              </label>
              <textarea
                id="issue"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded-md bg-transparent text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div className="col-span-1 sm:col-span-2 flex items-center">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="termsAccepted"
                className="heading2 ml-2 text-sm text-gray-700 dark:text-white"
              >
                I accept the{" "}
                <a href="/terms" className="text-blue-500 underline">
                  terms and conditions
                </a>
              </label>
            </div>

            <div className="box-1 ">
              <div
                className="btn rounded-lg btn-one my-4 p-4 flex items-center justify-center heading font-bold text-xl w-24 h-8 text-gray-700 dark:text-white"
                onClick={handleSubmit}
              >
                <span className="text-gray-700 dark:text-white">Submit</span>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
