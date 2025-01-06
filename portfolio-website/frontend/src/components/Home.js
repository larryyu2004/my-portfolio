// src/components/About.js
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const dropDownIsVisible = useSelector((state) => state.dropdown.isVisible);
  const blurBackground = `bg-black/50`
  return (
    <div className={`p-6 ${ dropDownIsVisible ? blurBackground : '' }`}>
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-4">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold">Welcome to o</h1>
      <p className="mt-4">Frontend Developer | Rst</p>
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-4">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-4">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-4">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-4">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-4">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-4">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-4">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-4">Frontend Developer | React Specialist</p>
      <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
      <p className="mt-4">Frontend Developer | React Specialist</p>
    </div>

    
  );
};

export default Home;