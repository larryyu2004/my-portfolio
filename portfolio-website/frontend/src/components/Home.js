// src/components/About.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();

  const dropDownIsVisible = useSelector((state) => state.dropdown.isVisible);
  const blurBackground = `bg-black/50`

  return (
    <div className={` mt-[60px] p-6 ${ dropDownIsVisible ? blurBackground : '' } dark:bg-[rgb(9,9,10)] duration-200 `}>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold dark:text-[rgb(244,244,246)] transition-colors duration-200">Welcome to My Portfolio</h1>
      <p className="mt-4 dark:text-[rgb(244,244,246)] transition-colors duration-200">Frontend Developer | React Specialist</p>
    </div>

    
  );
};

export default Home;