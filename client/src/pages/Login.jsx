import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, InputGroup } from "rsuite";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import VisibleIcon from "@rsuite/icons/Visible";
import toast, { Toaster } from "react-hot-toast";
import { Meteors } from "../ui/meteor";

export default function Login() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleChange = () => {
    setVisible(!visible);
  };

  const handleClick = () => {
    navigate("/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    sendData(data);
  };

  const sendData = async (d) => {
    try {
      const resp = await axios.post("process.env.HOST_URL/login", d);
      localStorage.setItem("token", resp.data.token);
      console.log(resp);
      toast.success(resp.data.message);
      window.location.replace("/dashboard");
    } catch (err) {
      // const errMsg = err.response.data.message || "Login failed.";
      console.log(err);
      // toast.error(errMsg);
    }
  };

  return (
    <div className="dark:bg-gray-300 w-full min-h-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="m-4 sm:m-10 flex items-center justify-center relative max-w-lg mx-auto">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl shadow-lg" />
        <div className="relative shadow-xl dark:text-white bg-white dark:bg-gray-900 border border-gray-800 px-4 py-8 overflow-hidden rounded-2xl flex flex-col justify-between items-center">
          <h1 className="heading2 text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
            Login to TrackTrial
          </h1>
          <hr className="border-t border-gray-300 dark:border-gray-600 my-4 w-3/4 mx-auto" />

          <div className="p-4 rounded shadow-md bg-gray-200 dark:bg-transparent w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="w-full">
                  <label className="heading text-sm md:text-base font-medium mb-1">
                    Email
                  </label>
                  <InputGroup>
                    <Input
                      value={data.email}
                      onChange={(value) => handleInputChange("email", value)}
                      type="email"
                      name="email"
                      required
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-700 dark:text-gray-800 focus:outline-none shadow-md text-sm md:text-base"
                    />
                    <InputGroup.Addon>.com</InputGroup.Addon>
                  </InputGroup>
                </div>

                <div className="w-full">
                  <label className="heading text-sm md:text-base font-medium mb-1">
                    Password
                  </label>
                  <InputGroup inside>
                    <Input
                      type={visible ? "text" : "password"}
                      value={data.password}
                      onChange={(value) => handleInputChange("password", value)}
                      required
                      className="shadow-md p-2 text-sm md:text-base"
                    />
                    <InputGroup.Button onClick={handleChange}>
                      {visible ? <VisibleIcon /> : <EyeCloseIcon />}
                    </InputGroup.Button>
                  </InputGroup>
                  <div className="heading text-start mt-1">
                    <a href="/forpass">Forget Password</a>
                  </div>
                </div>
              </div>

              <div className="box-1">
                <button
                  type="submit"
                  className="heading w-full py-3 mt-4 bg-red-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition duration-300 ease-in-out"
                >
                  Login
                </button>
              </div>
            </form>

            <hr className="border-t border-gray-300 dark:border-gray-600 my-6 w-3/4 mx-auto" />

            <div className="text-center">
              <p className="heading text-sm md:text-base font-medium">
                Don't have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer underline dark:text-blue-400"
                  onClick={handleClick}
                >
                  Signup
                </span>
              </p>
            </div>
          </div>

          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
