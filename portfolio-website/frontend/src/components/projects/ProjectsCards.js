import { Link } from "react-router-dom";
import React, { Component } from "react";

import OS from "../../assets/img/OS.jpg";
import myPortfolio from "../../assets/img/myPortfolio.jpg";
import ML from "../../assets/img/ML.jpg";
import portfolio from "../../assets/img/portfolio.jpg"
import webFundamental from "../../assets/img/webFundamental.jpg"
import react from "../../assets/img/react.jpeg"
import leetcode from "../../assets/img/leetcode.jpeg"

export default class ProjectsCards extends Component {
  render() {
    const projects = [
        {
            name: 'Operating System Engineering',
            bgImage: OS,
            to: '/projects/os',
            color: 'blue',
        },

        {
            name: 'My Portfolio',
            bgImage: myPortfolio,
            to: '/',
            color: 'indigo1',
        },

        {
            name: 'Machine Learning',
            bgImage: ML,
            to: '/projects/ml',
            color: 'white',
        },

        {
            name: 'Leetcode',
            bgImage: leetcode,
            to: '/projects/leetcode',
            color: 'orange2',
        },

        {
            name: 'Portfolio',
            bgImage: portfolio,
            to: '/projects/portfolio',
            color: 'gray',
        },

        {
            name: 'React Fundamental',
            bgImage: react,
            to: '/projects/react-fundamental',
            color: 'indigo3',
        },

        {
            name: 'Web Fundamental',
            bgImage: webFundamental,
            to: '/projects/web-fundamental',
            color: 'orange1',
        },
    ]

    const colorStyles = {
        'red': "bg-gradient-to-br from-red-800 to-red-600",
        'orange1': "bg-gradient-to-r from-orange-600 to-orange-200",
        'orange2': "bg-gradient-to-r from-orange-200 to-orange-600",
        'yellow': "bg-gradient-to-br from-yellow-500 to-yellow-300",
        'green': "bg-gradient-to-r from-green-200 to-green-500",
        'blue': "bg-gradient-to-br from-blue-200 to-blue-500",
        'indigo1': "bg-gradient-to-br from-indigo-500 to-indigo-200",
        'indigo2': "bg-gradient-to-br from-indigo-200 to-indigo-600",
        'indigo3': "bg-gradient-to-br from-indigo-300 to-indigo-600",
        'purple': "bg-gradient-to-r from-purple-300 to-purple-600",
        'pink': "bg-gradient-to-br from-pink-700 to-pink-300",
        'gray': "bg-gradient-to-br from-gray-100 to-gray-900",
        'black': "bg-gradient-to-br from-black to-gray-800",
        'white': "bg-gradient-to-r from-white to-gray-300",
    

        
      };
    return (
        <>
            <div>
                {projects.map((project, index) => (
                    <Link to={project.to} key={index} className="block w-full h-full">
                        <div
                        className="relative max-w-[100vw] min-h-[80vh] flex justify-center items-center cursor-pointer overflow-hidden mb-[5px]">
                            <div
                            className="absolute w-full h-full bg-cover bg-center overflow-hidden transition-transform duration-300 hover:scale-110"
                            style={{ backgroundImage: `url(${project.bgImage})` }}
                            >
                            </div>

                            <h1 className={`relative ${colorStyles[project.color]}
                            text-transparent bg-clip-text text-5xl font-bold z-10`}>{project.name}</h1>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
  }
}
