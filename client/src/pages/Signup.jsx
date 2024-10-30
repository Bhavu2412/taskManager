import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, InputGroup } from "rsuite";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import VisibleIcon from "@rsuite/icons/Visible";
import toast, { Toaster } from "react-hot-toast";
import { Meteors } from "../ui/meteor";

export default function Signup() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    name: "",
    date: "",
  });

  const handleInputChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleChange = () => {
    setVisible(!visible);
  };

  const handleClick = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minPasswordLength = 8;

    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (data.password.length < minPasswordLength) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    sendData(data);
  };

  const sendData = async (d) => {
    try {
      const resp = await axios.post("process.env.HOST_URL/signup", d);
      toast.success(resp.data.message);

      // Store the token in local storage
      localStorage.setItem("token", resp.data.token); // Assuming the token is returned in resp.data.token

      // Navigate to the home page
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      const errMsg = err.response?.data?.message || "Signup failed.";
      toast.error(errMsg);
    }
  };

  return (
    <div className="dark:bg-gray-800 bg-gray-100 w-full min-h-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative flex items-center justify-center max-w-lg w-full px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 transform scale-90 rounded-full blur-xl shadow-lg opacity-70" />

        <div className="relative bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-6 py-8 rounded-2xl shadow-lg text-gray-800 dark:text-gray-200 w-full">
          <h1 className="heading2 text-2xl sm:text-3xl font-bold text-center mb-6">
            Signup to TrackTrial
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="heading text-sm font-medium mb-1">
                    Name
                  </label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={(value) => handleInputChange("name", value)}
                      required
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none"
                    />
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <label className="heading text-sm font-medium mb-1">
                    Username
                  </label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="username"
                      value={data.username}
                      onChange={(value) => handleInputChange("username", value)}
                      required
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none"
                    />
                  </InputGroup>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="heading text-sm font-medium mb-1">
                    Email
                  </label>
                  <InputGroup>
                    <Input
                      value={data.email}
                      onChange={(value) => handleInputChange("email", value)}
                      type="email"
                      name="email"
                      required
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none"
                    />
                    <InputGroup.Addon>.com</InputGroup.Addon>
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <label className="heading text-sm font-medium mb-1">
                    Date
                  </label>
                  <InputGroup>
                    <Input
                      type="date"
                      name="date"
                      value={data.date}
                      onChange={(value) => handleInputChange("date", value)}
                      required
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none"
                    />
                  </InputGroup>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="heading text-sm font-medium mb-1">
                    Password
                  </label>
                  <InputGroup inside>
                    <Input
                      type={visible ? "text" : "password"}
                      value={data.password}
                      onChange={(value) => handleInputChange("password", value)}
                      required
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none"
                    />
                    <InputGroup.Button onClick={handleChange}>
                      {visible ? <VisibleIcon /> : <EyeCloseIcon />}
                    </InputGroup.Button>
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <label className="heading text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <InputGroup inside>
                    <Input
                      type={visible ? "text" : "password"}
                      value={data.confirmPassword}
                      onChange={(value) =>
                        handleInputChange("confirmPassword", value)
                      }
                      required
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none"
                    />
                    <InputGroup.Button onClick={handleChange}>
                      {visible ? <VisibleIcon /> : <EyeCloseIcon />}
                    </InputGroup.Button>
                  </InputGroup>
                </div>
              </div>
            </div>

            <button className="w-full py-3 mt-4 bg-red-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition duration-300 ease-in-out">
              Signup
            </button>
          </form>

          <hr className="my-6 border-gray-300 dark:border-gray-700" />

          <p className="text-center">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline dark:text-blue-400"
              onClick={handleClick}
            >
              Login
            </span>
          </p>
        </div>

        <Meteors number={20} />
      </div>
    </div>
  );
}
