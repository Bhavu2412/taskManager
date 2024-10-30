"use client";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import image from "../general/image.png";

export default function About({ darkMode }) {
  return (
    <div
      className={`p-5 ${
        darkMode ? "bg-black text-white" : "bg-white text-xl cursive text-black"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
        <WobbleCard
          containerClassName={`col-span-1 lg:col-span-2 h-full ${
            darkMode ? "bg-blue-600" : "bg-blue-500"
          } min-h-[500px] lg:min-h-[300px]`}
          className="flex flex-col lg:flex-row justify-between items-center" // Change made here
        >
          <div className="max-w-xs">
            <h2 className="cursive text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              About Company
            </h2>
            <p className="text mt-4 text-left text-base/6 text-neutral-200">
              With over 100,000 monthly active users, Bhavu is the most popular
              WebDev platform for developers.
            </p>
          </div>
          <img
            className="h-32 rounded-lg"
            src="https://signature.freefire-name.com/img.php?f=3&t=Bhavu"
            alt="Bhavu"
          />
        </WobbleCard>

        <WobbleCard
          containerClassName={`col-span-1 min-h-[300px] ${
            darkMode ? "bg-pink-600" : "bg-pink-500"
          }`}
        >
          <h2 className="text max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black dark:text-white">
            TaskTrail
          </h2>
          <p className="heading mt-4 max-w-[26rem] text-left text-base/6 text-black dark:text-neutral-200">
            A clear path for managing your tasks effectively. Take control of
            your tasks with ease. Streamline your workflow and enhance
            productivity.
          </p>
        </WobbleCard>

        <WobbleCard
          containerClassName={`col-span-1 lg:col-span-3 ${
            darkMode ? "bg-green-600" : "bg-green-500"
          } min-h-[300px] lg:min-h-[200px] xl:min-h-[100px]`}
        >
          <div className="flex flex-col lg:flex-row w-full items-center justify-between">
            <div className="max-w-sm text-black dark:text-white">
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white dark:text-neutral-200 heading2">
                Sign up for Bhavu's cutting-edge WebDev Wrapper today and
                experience blazing-fast performance and state-of-the-art
                technology!
              </h2>
              <div className="box-1">
                <div className="btn btn-one my-4 p-4 flex items-center justify-center heading font-bold text-xl w-24 h-8">
                  <span>Signup</span>
                </div>
              </div>
            </div>
            <img
              src={image}
              alt="logo"
              className="h-32 lg:h-64 rounded-lg" // Change made here
            />
          </div>
        </WobbleCard>
      </div>
    </div>
  );
}
