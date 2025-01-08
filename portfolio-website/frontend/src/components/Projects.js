import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React from 'react';

const Projects = () => {
  const dispatch = useDispatch();
  
  const ProjectsdropDownIsVisible = useSelector((state) => state.Projectsdropdown.isVisible);
  const HomedropDownIsVisible = useSelector((state) => state.Homedropdown.isVisible);
  const ContactDropdownIsVisible = useSelector((state) => state.Contactdropdown.isVisible);
  const blurBackground = `bg-black/20`;
  
  return (
    <div className={`min-h-screen mt-[60px] p-6 
      ${ProjectsdropDownIsVisible ? blurBackground : ''} 
      ${HomedropDownIsVisible ? blurBackground : ''}
      ${ContactDropdownIsVisible ? blurBackground : ''}
      dark:bg-[rgb(9,9,10)] duration-200`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 dark:text-white">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project cards will go here */}
        </div>
      </div>
    </div>
  );
};

export default Projects;