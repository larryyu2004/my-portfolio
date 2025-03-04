import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class projects extends Component {
  render() {
    const projects = [
        {
            name: "Operating System Engineering",
            linkTo: 'https://github.com/larryyu2004/XV-6-Lab',
        },
        {
            name: "Operating System Engineering Note",
            linkTo: 'https://github.com/larryyu2004/XV-6-Note',
        },
        {
            name: "My Portfolio",
            linkTo: 'https://github.com/larryyu2004/my-portfolio',
        },
        {
            name: "Machine Learning",
            linkTo: "/",
        },
        {
            name: "Leetcode",
            linkTo: "/",
        },
        {
            name: "Portfolio",
            linkTo: 'https://github.com/larryyu2004/portfolio-website',
        },
        {
            name: "React Fundamental",
            linkTo: 'https://github.com/larryyu2004/react-fundamental',
        },
        {
            name: "Web Fundamental",
            linkTo: 'https://github.com/larryyu2004/Web-Fundamental',
        }
    ]
    return (
        <>
        <div className='font-bold text-4xl bg-gradient-to-r from-blue-600 to-purple-600
                    dark:from-orange-600 dark:to-yellow-300 text-transparent bg-clip-text p-2'>
            Projects:
        </div>

        <div className="w-full flex flex-col min-h-[500px] p-[8px]">
            {projects.map((project, index) => (
                <div key={index}
                    className='flex w-full '>
                    <div
                        className={`flex w-3/4 text-2xl md:text-3xl font-bold bg-gradient-to-r text-transparent from-gray-600 to-blue-700 dark:from-orange-600 dark:to-yellow-300 bg-clip-text dark:text-white border-r-2 border-gray-500 border-solid `}>
                        {project.name}
                    </div>
                    <div className='flex w-1/4 text-xl md:text-2xl font-bold dark:text-white justify-center  mb-[15px] '>
                        <Link to={project.linkTo}>
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600
                                dark:from-orange-600 dark:to-yellow-300 text-white font-bold py-2 px-10 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                                Link
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
  }
}
