import "./App.css";
import React, { useState } from "react";
import "rsuite/dist/rsuite.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./general/navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import AddTask from "./pages/AddTask";
import Forgetpass from "./pages/ForgetPass";
import Profile from "./pages/Profile";
import TaskDetail from "./general/taskDetail";
import Home from "./pages/Home";
import Footer from "./general/footer";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const jwtToken = localStorage.getItem("token");
  const [taskId, setTaskId] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
      <Router>
        <NavBar
          jwtToken={jwtToken}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <Routes>
          <Route exact path="/" element={<Home darkMode={darkMode} />} />
          <Route exact path="/forpass" element={<Forgetpass />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route
            exact
            path="/addtask"
            element={<AddTask jwtToken={jwtToken} setTaskId={setTaskId} />}
          />
          <Route exact path="/about" element={<About darkMode={darkMode} />} />
          <Route
            exact
            path="/contactUs"
            element={<Contact darkMode={darkMode} />}
          />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/profile"
            element={<Profile jwtToken={jwtToken} />}
          />
          <Route exact path="/task" element={<TaskDetail taskId={taskId} />} />
          <Route
            exact
            path="/taskdetail"
            element={<TaskDetail jwtToken={jwtToken} taskId={taskId} />}
          />
        </Routes>
        <Footer darkMode={darkMode} />
      </Router>
    </>
  );
}
