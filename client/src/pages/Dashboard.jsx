import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for fetching tasks
  const [deletingTaskId, setDeletingTaskId] = useState(null); // Loading state for deleting tasks
  const [updatingTaskId, setUpdatingTaskId] = useState(null); // Loading state for updating tasks
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get("process.env.HOST_URL/home", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.data.tasks.length === 0) {
            toast.error("No tasks found! Redirecting to home page...");
            setTimeout(() => navigate("/home"), 2000);
          } else {
            setTasks(res.data.tasks);
          }
        } else {
          toast.error("JWT token not found.");
        }
      } catch (error) {
        toast.error("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      setDeletingTaskId(id); // Set the task being deleted
      const response = await axios.delete(`process.env.HOST_URL/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setTasks(tasks.filter((task) => task._id !== id));
        toast.success("Task deleted successfully.");
      } else {
        toast.error("Failed to delete task.");
      }
    } catch (error) {
      toast.error("Error deleting task.");
    } finally {
      setDeletingTaskId(null); // Clear the loading state
    }
  };

  const handleComplete = async (id) => {
    const taskToUpdate = tasks.find((task) => task._id === id);
    if (!taskToUpdate) return;

    const updatedStatus = !taskToUpdate.completed;
    setUpdatingTaskId(id); // Set the task being updated

    try {
      const response = await axios.put(`process.env.HOST_URL/update/${id}`, {
        completed: updatedStatus,
      });

      if (response.status === 200) {
        setTasks(
          tasks.map((task) =>
            task._id === id ? { ...task, completed: updatedStatus } : task
          )
        );
      } else {
        toast.error("Failed to update task status.");
      }
    } catch (error) {
      toast.error("Error updating task status.");
    } finally {
      setUpdatingTaskId(null); // Clear the loading state
    }
  };

  const toggleTaskOverview = (id) => {
    setOpenTaskId(openTaskId === id ? null : id);
  };

  return (
    <div className="flex flex-col items-center p-6 md:p-8 lg:p-12">
      <Toaster />
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">
        My Tasks
      </h1>

      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <svg
            className="animate-spin h-10 w-10 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0H4z"
            />
          </svg>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`bg-white shadow-md dark:bg-gray-800 rounded-lg p-6 border ${
                  task.completed ? "border-green-500" : "border-gray-200"
                }`}
              >
                <h2
                  className="text-lg font-semibold text-gray-700 dark:text-gray-200 cursor-pointer"
                  onClick={() => toggleTaskOverview(task._id)}
                >
                  {task.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {task.description}
                </p>

                {openTaskId === task._id && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <h3 className="font-semibold heading text-lg">Overview:</h3>
                    <p className="text-gray-700">{task.detailedDescription}</p>
                  </div>
                )}

                <div className="flex justify-between items-center mt-4 space-x-2">
                  <button
                    onClick={() => handleComplete(task._id)}
                    className={`text-xs font-semibold py-1 px-3 rounded ${
                      task.completed
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                    }`}
                    disabled={updatingTaskId === task._id} // Disable button when updating
                  >
                    {updatingTaskId === task._id
                      ? "Updating..."
                      : task.completed
                      ? "Completed"
                      : "Mark Complete"}
                    {/* Change text based on loading state */}
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-xs font-semibold bg-red-500 text-white py-1 px-3 rounded"
                    disabled={deletingTaskId === task._id} // Disable button when deleting
                  >
                    {deletingTaskId === task._id ? "Deleting..." : "Delete"}
                    {/* Change text based on loading state */}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-6">
              <img
                src={"https://cdn-icons-png.flaticon.com/512/5058/5058446.png"}
                alt="No tasks available"
                className="w-1/2 max-w-xs rounded-lg"
              />
              <p className="text-center text-lg text-gray-900 dark:text-gray-500 mt-4">
                No tasks available. Please add a new task!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
