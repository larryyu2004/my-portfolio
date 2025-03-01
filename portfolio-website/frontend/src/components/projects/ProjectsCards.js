import { Link } from "react-router-dom";
import React, { Component, useState } from "react";

import OS from "../../assets/img/OS.jpg";
import myPortfolio from "../../assets/img/myPortfolio.jpg";
import ML from "../../assets/img/ML.jpg";
import portfolio from "../../assets/img/portfolio.jpg"
import webFundamental from "../../assets/img/webFundamental.jpg"
import react from "../../assets/img/react.jpeg"
import leetcode from "../../assets/img/leetcode.jpeg"
import riscv from "../../assets/img/riscv.jpg"

export default class ProjectsCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            isPaused: false,
        }
        this.OperatingSystem = [
            {
                name: 'Operating System Engineering',
                bgImage: OS,
                to: 'https://github.com/larryyu2004/XV-6-Lab',
                color: 'red',
                delay: 0.3,
            },
    
            {
                name: 'Operating System Engineering Note',
                bgImage: riscv,
                to: 'https://github.com/larryyu2004/XV-6-Note',
                color: 'purple',
                delay: 0.3,
            }
        ]
    }

    
    componentDidMount () {
        this.startCarousel();
    }
    componentWillUnmount () {
        this.stopCarousel();
    }
    
    startCarousel () {
        this.carouselInterval = setInterval(() => {
            if(!this.state.isPaused) {
                this.setState((prevState) => ({
                    activeIndex: (prevState.activeIndex + 1) % this.OperatingSystem.length,
                }));
            }
        }, 1500);
    };
    stopCarousel () {
        clearInterval(this.carouselInterval);
    }
    handleMouseEnter = () => {
        this.setState({ isPaused: true});
    };
    handleMouseLeave = () => {
        this.setState({ isPaused: false});
    }
    
      


  render() {
    const { activeIndex } = this.state;
    console.log(activeIndex);
    const projects = [

        {
            name: 'My Portfolio',
            bgImage: myPortfolio,
            to: 'https://github.com/larryyu2004/my-portfolio',
            color: 'indigo1',
            delay: 0.6,
        },

        {
            name: 'Machine Learning',
            bgImage: ML,
            to: '/',
            color: 'white',
            delay: 0.9,
        },

        {
            name: 'Leetcode',
            bgImage: leetcode,
            to: '/projects/leetcode',
            color: 'orange2',
            delay: 1.2,
        },

        {
            name: 'Portfolio',
            bgImage: portfolio,
            to: 'https://github.com/larryyu2004/portfolio-website',
            color: 'gray',
            delay: 1.5,
        },

        {
            name: 'React Fundamental',
            bgImage: react,
            to: 'https://github.com/larryyu2004/react-fundamental',
            color: 'indigo3',
            delay: 1.8,
        },

        {
            name: 'Web Fundamental',
            bgImage: webFundamental,
            to: 'https://github.com/larryyu2004/Web-Fundamental',
            color: 'orange1',
            delay: 2.1,
        },
    ]

    const colorStyles = {
        'red': "bg-gradient-to-br from-red-300 to-red-600",
        'orange1': "bg-gradient-to-r from-orange-600 to-orange-200",
        'orange2': "bg-gradient-to-r from-orange-200 to-orange-600",
        'yellow': "bg-gradient-to-br from-yellow-500 to-yellow-300",
        'green': "bg-gradient-to-r from-green-200 to-green-500",
        'blue': "bg-gradient-to-br from-blue-200 to-blue-500",
        'indigo1': "bg-gradient-to-br from-indigo-500 to-indigo-200",
        'indigo2': "bg-gradient-to-br from-indigo-200 to-indigo-600",
        'indigo3': "bg-gradient-to-br from-indigo-300 to-indigo-600",
        'purple': "bg-gradient-to-r from-purple-400 to-purple-600",
        'pink': "bg-gradient-to-br from-pink-700 to-pink-300",
        'gray': "bg-gradient-to-br from-gray-100 to-gray-900",
        'black': "bg-gradient-to-br from-black to-gray-800",
        'white': "bg-gradient-to-r from-white to-gray-300",
        
      };
    return (
        <>
            
            <Link to={this.OperatingSystem[this.state.activeIndex].to} className="block w-full h-full">
                <div className="opacity-0 animate-staggerFadeUp">
                    <div
                        className="relative max-w-[100vw] min-h-[80vh] flex justify-center items-center cursor-pointer overflow-hidden mb-[5px]"
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                    >
                        <div className="absolute w-full h-full bg-cover bg-center overflow-hidden transition-transform duration-300 hover:scale-110">
                            <div
                                key={this.OperatingSystem[this.state.activeIndex].name} // Ensures animation runs on change
                                className="w-full h-full transition-opacity duration-1000 opacity-0 animate-fadeIn"
                                style={{ backgroundImage: `url(${this.OperatingSystem[this.state.activeIndex].bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
                            ></div>
                        </div>

                        <h1 
                            key={this.OperatingSystem[this.state.activeIndex].name + "-title"}
                            className={`relative ${colorStyles[this.OperatingSystem[this.state.activeIndex].color]}
                            text-transparent bg-clip-text text-5xl font-bold z-10 text-center animate-fadeIn`}
                        >
                            {this.OperatingSystem[this.state.activeIndex].name}
                        </h1>
                    </div>
                </div>
            </Link>
            

            <div>
                {projects.map((project, index) => (
                    <Link to={project.to} key={index} className={`block w-full h-full`}>
                        <div
                        className={`relative max-w-[100vw] min-h-[80vh] flex justify-center items-center cursor-pointer overflow-hidden mb-[5px] opacity-0 animate-staggerFadeUp`}
                        style={{ animationDelay: `${project.delay}s` }}>
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
