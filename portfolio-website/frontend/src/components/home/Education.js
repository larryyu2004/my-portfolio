import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom'

class Education extends Component {
    render() {
        return (
            
            <div className="max-w-[785px] flex justify-center items-center min-h-[300px] p-[8px] mx-auto">
                
                <div className="w-full relative flex justify-center items-center">
                    
                    <svg 
                        id="au-logo" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 202 48.03"
                        className="w-auto h-auto max-w-full max-h-full "
                        style={{ opacity: 0.4 }}
                    >
                        <path 
                            className="cls-1" 
                            d="M74.92,12.58h.2V.61h-11.74v5.99c4.24.61,8.4,2.51,11.54,5.98Z"
                            style={{ fill: 'blue' }}
                        ></path>
                        <path 
                            className="cls-1" 
                            d="M49.53.61h-15.5L0,42.35v.2h20.79v-.19c-3.35-3.67-3.85-11.22,2.73-19.3l14.28-17.51v18.61c0,13.58,7.29,19,19.47,19s18.32-8.17,17.87-18.91h-.2c-2.33,7.29-7.52,11.94-13.79,11.94-6.86,0-11.62-3.45-11.62-12.27V.61Z"
                            style={{ fill: 'blue' }}
                        ></path>
                    </svg>

                    <div className="absolute z-10 h-full flex flex-col items-end w-full">
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-600 dark:text-white">Adelaide University</h1>
                        <p className="mt-4 font-bold dark:text-gray-300">From a Year 1 student</p>
                        <Link to="/courses">
                        <button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 
                            dark:from-orange-600 dark:to-yellow-300 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                                View Courses
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Education;