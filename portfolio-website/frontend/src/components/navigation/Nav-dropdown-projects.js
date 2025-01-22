import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProjectDropdown = () => {
    
    const ProjectsdropDownIsVisible = useSelector((state) => state.Projectsdropdown.isVisible);
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        ProjectsdropDownIsVisible && (
            <>
                <div className={`fixed inset-0 backdrop-blur-md pointer-events-none z-[-1]
                    animate-[fadeIn_0.3s_ease-in-out_forwards]`} />
                <div className="nav-dropDown-page animate-[extendHeight_0.3s_ease-in-out_forwards]">
                    <Link to="/project1" className="nav-dropDown-item pt-12 animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards]">Operating System Engineering</Link>
                    <Link to="/project2" className="nav-dropDown-item animate-[fadeIn_0.3s_ease-in-out_0.15s_forwards]">My Portfolio</Link>
                    <Link to="/project3" className="nav-dropDown-item pb-12 animate-[fadeIn_0.3s_ease-in-out_0.20s_forwards]">Machine Learning</Link>
                </div>
            </>
        )
    );
};

export default ProjectDropdown;
