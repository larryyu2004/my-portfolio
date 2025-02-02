import React, { Component } from "react";
import OS from "../../assets/img/OS.jpg";

export default class ProjectsCards extends Component {
  handleClick = () => {
    window.location.href = "/os"; // Navigate to /os
  };

  render() {
    return (
      <div
        className="relative w-[100vw] h-[100vh] flex justify-center items-center cursor-pointer overflow-hidden 
                   transition-transform duration-300 hover:scale-105"
        onClick={this.handleClick}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
          style={{
            backgroundImage: `url(${OS})`,
            transform: "scale(1)", // Default scale
          }}
        ></div>

        {/* Text Overlay */}
        <h1 className="relative text-white text-5xl font-bold z-10">OS Engineer</h1>

        {/* Hover Effect - Scale Image */}
        <style>
          {`
            div:hover > div {
              transform: scale(1.1); /* Enlarge background on hover */
            }
          `}
        </style>
      </div>
    );
  }
}