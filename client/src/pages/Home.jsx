import React, { useState, useEffect } from "react";
import { FlipWords } from "../ui/flip-words";
import { Modal, Button, Input, Message, useToaster } from "rsuite";
import image1 from "../assets/9959436.jpg";
import image2 from "../assets/6909.jpg";
import image3 from "../assets/486539-PH7BQV-226.jpg";
import image4 from "../assets/5364326.jpg";
export default function Home({ darkMode }) {
  const toaster = useToaster();
  const words = [
    "Efficiency",
    "Organization",
    "Collaboration",
    "Production",
    "Focus",
    "Streamline",
    "Power",
    "Reliability",
    "Smart",
    "Agility",
  ];

  const [open, setOpen] = useState(false);
  const redirectTo = (url) => {
    window.location.href = url;
  };

  const handleClose = () => setOpen(false);

  function handleSignup() {
    redirectTo("/signup");
  }
  function handleDashboard() {
    redirectTo("/dashboard");
  }
  function handleTasks() {
    if (localStorage.getItem("token")) {
      redirectTo("/addtask");
    } else {
      toaster.push(
        <Message type="error" header="A problem occurred" showIcon closable>
          <strong>Error!</strong> Please login to manage tasks.
        </Message>,
        {
          placement: "topCenter",
          duration: 5000,
        }
      );

      redirectTo("/login");
    }
  }

  function handleJoin() {
    setOpen(true);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const elementsToAnimate = document.querySelectorAll(
          ".move-from-top, .move-from-left"
        );
        elementsToAnimate.forEach((element) => {
          const elementTop =
            element.getBoundingClientRect().top + window.pageYOffset;
          if (elementTop < scrollTop + window.innerHeight) {
            element.classList.add("animate");
          } else {
            element.classList.remove("animate");
          }
        });
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div
      className={`body_main ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="bg-grid-black/[0.1] relative flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between m-4 md:m-10 p-4 md:p-10">
          <div className="space-y-4 md:space-y-8 w-full md:w-1/2 p-4 md:p-8 move-from-top">
            <h1 className="heading2  font-serif text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              Maximize Your Team's <FlipWords words={words} /> with Our Task
              Manager!
            </h1>

            <h2 className="heading text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl animate-pulse">
              Stay on top of tasks, deadlines, and collaboration effortlessly.
            </h2>
            <div ontouchstart="">
              <div className="button h-10 w-32 heading " onClick={handleSignup}>
                <p href="#">Get started</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 md:p-8">
            <img src={image1} alt="" />
          </div>
        </div>
      </div>

      <div className="flex flex-col m-5 p-5 md:flex-row items-center justify-between md:m-10 md:p-10">
        <div className="w-full md:w-1/3 lg:w-1/2 p-4 md:p-8">
          <img src={image2} alt="" />
        </div>
        <div className="space-y-4 w-full md:space-y-8 md:w-2/3 lg:w-1/2 p-4 md:p-8">
          <h1 className="heading2 font-serif text-xl md:text-2xl lg:text-3xl animation-typing animate-typing">
            Collaborate with your team and manage tasks effortlessly.
          </h1>
          <p className="text text-lg md:text-md lg:text-xl">
            Our task manager fosters team collaboration by providing a
            centralized platform where tasks, projects, and deadlines are easily
            accessible. Empower your team to stay on track and enhance
            productivity.
          </p>
          <div ontouchstart="">
            <div
              className="button h-10 w-32 heading "
              onClick={handleDashboard}
            >
              <p href="#">Dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  dark:bg-dot-black/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between m-4 md:m-10 p-4 md:p-10">
          <div className="space-y-4 md:space-y-8 w-full md:w-1/2 p-4 md:p-8 move-from-left">
            <h1 className="heading2 font-serif text-2xl sm:text-3xl md:text-4xl animate-slide-in-bottom">
              Stay productive with our task automation and tracking system.
            </h1>
            <p className="text font-General text-base sm:text-lg md:text-xl">
              With automated task tracking, notifications, and progress updates,
              our platform ensures that nothing falls through the cracks, and
              you can focus on getting things done.
            </p>
            <div ontouchstart="">
              <div className="button h-10 w-32 heading " onClick={handleTasks}>
                <p>Manage Tasks</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 md:p-8">
            <img src={image3} alt="" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between m-4 md:m-10 p-4 md:p-10">
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <img src={image4} alt="" />
        </div>
        <div className="flex flex-col items-center md:items-start p-4 md:p-8 space-y-4 md:space-y-8 w-full md:w-1/2">
          <h1 className="heading2 font-General text-xl sm:text-2xl md:text-3xl animate-slide-in-bottom text-center md:text-left">
            Join our platform today and revolutionize the way you manage tasks!
          </h1>
          <div ontouchstart="">
            <div className="button h-10 w-32 heading " onClick={handleJoin}>
              <p href="#">Join Us</p>
            </div>
          </div>

          <Modal open={open} onClose={handleClose} className="p-4 md:p-8">
            <Modal.Header>
              <h3>Join Us!</h3>
            </Modal.Header>
            <Modal.Body>
              <p>Enter your email to join our community!</p>
              <Input type="email" placeholder="Email" />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose} appearance="primary">
                Join
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
