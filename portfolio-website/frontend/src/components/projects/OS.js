// src/components/About.js
import { useSelector } from 'react-redux';
import React from 'react';
  
const OS = () => {
  
  const ProjectsdropDownIsVisible = useSelector((state) => state.Projectsdropdown.isVisible);
  const HomedropDownIsVisible = useSelector((state) => state.Homedropdown.isVisible);
  const ContactDropdownIsVisible = useSelector((state) => state.Contactdropdown.isVisible);
  const blurBackground = `bg-black/20`
  return (
    <div className={`min-h-screen mt-[60px] p-6 
    ${ ProjectsdropDownIsVisible ? blurBackground : '' } 
    ${ HomedropDownIsVisible ? blurBackground : '' }
    ${ ContactDropdownIsVisible ? blurBackground : '' }
    dark:bg-[rgb(9,9,10)] duration-200 `}>
      <h2 className="text-2xl font-bold">About Me</h2>
      <p>
        Hi, I'm [Your Name], a passionate software developer focused on web technologies.
      </p>
    </div>
  );
};

export default OS;
