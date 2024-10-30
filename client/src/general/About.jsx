import React from "react";

export default function AboutTem({ title, description }) {
  return (
    <div className="w-[100%] h-[80vh] flex flex-row justify-between ">
      <div className="w-[50%] flex items-center justify-center">image</div>
      <div className="w-[50%] m-2 p-5 flex flex-col items-center justify-center space-y-4">
        <h1 className="about-head">{title}</h1>
        <p className="description-about">{description}</p>
      </div>
    </div>
  );
}
