import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddTask({ jwtToken }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jwtToken) {
      toast.error("Authentication token is missing.");
      return;
    }
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/create",
        {
          title,
          description,
          detailedDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      // Show success notification and reset form
      setTitle("");
      setDescription("");
      setDetailedDescription("");
      navigate("/dashboard");
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center p-6 md:p-8 lg:p-12">
      <Toaster />
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">
        Add New Task
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md dark:bg-gray-800 rounded-lg p-8 w-full max-w-lg"
      >
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Task Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-gray-200"
        />

        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Task Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-gray-200"
        />

        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Detailed Description
        </label>
        <textarea
          value={detailedDescription}
          onChange={(e) => setDetailedDescription(e.target.value)}
          required
          rows="4"
          className="w-full p-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-gray-200"
        />

        <button
          type="submit"
          className={`w-full py-2 rounded-md text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}
