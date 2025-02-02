import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React from 'react';
import ProjectsCards from './ProjectsCards';

const Projects = () => {
  const dispatch = useDispatch();
  
  const ProjectsdropDownIsVisible = useSelector((state) => state.Projectsdropdown.isVisible);
  const HomedropDownIsVisible = useSelector((state) => state.Homedropdown.isVisible);
  const ContactDropdownIsVisible = useSelector((state) => state.Contactdropdown.isVisible);
  const blurBackground = `bg-black/20`;
  
  return (
    <div className={`min-h-screen mt-[60px]  
      ${ProjectsdropDownIsVisible ? blurBackground : ''} 
      ${HomedropDownIsVisible ? blurBackground : ''}
      ${ContactDropdownIsVisible ? blurBackground : ''}
      dark:bg-[rgb(9,9,10)] duration-200`}>
      <div className="mt-[80px]">
        <ProjectsCards />
      </div>
    </div>
  );
};

export default Projects;