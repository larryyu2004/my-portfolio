import { Link } from "react-router-dom";
import React, { Component } from "react";
import OS from "../../assets/img/OS.jpg";

export default class ProjectsCards extends Component {
  render() {
    return (
      <Link to="/my-portfolio/projects/os" className="block w-full h-full">
        <div
          className="relative max-w-[100vw] min-h-[80vh] flex justify-center items-center cursor-pointer overflow-hidden"
        >
          {/* Background Image */}
          <div
            className="absolute w-full h-full bg-cover bg-center overflow-hidden transition-transform duration-300 hover:scale-105"
            style={{ backgroundImage: `url(${OS})` }}
          ></div>

          {/* Text Overlay */}
          <h1 className="relative bg-gradient-to-r from-yellow-600 to-yellow-200
                    dark:from-orange-600 dark:to-yellow-300 text-transparent bg-clip-text text-5xl font-bold z-10">Operating System Engineering</h1>
        </div>
      </Link>
    );
  }
}