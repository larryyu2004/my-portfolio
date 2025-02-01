import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProjectDropdown = () => {
    
    const ProjectsdropDownIsVisible = useSelector((state) => state.Projectsdropdown.isVisible);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const items = [
        { label: 'Operating System Engineering', delay: 0.1 },
        { label: 'My Portfolio', delay: 0.15 },
        { label: 'Machine Learning', delay: 0.20 },
        { label: 'Portfolio', delay: 0.25 },
        { label: 'Web Fundamental', delay: 0.30 },
        { label: 'React Fundamental', delay: 0.35 },
        { label: 'My Leetcode', delay: 0.40 }
    ];
    return (
        ProjectsdropDownIsVisible && (
            <>
                <div className={`fixed inset-0 backdrop-blur-md pointer-events-none z-[-1]
                    animate-[fadeIn_0.3s_ease-in-out_forwards]`} />
                
                <div className="nav-dropDown-page animate-[extendHeight_0.3s_ease-in-out_forwards]">
                    <Link to="/project1" className="nav-dropDown-item pt-12 animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards]">Operating System Engineering</Link>
                    <Link to="/project2" className="nav-dropDown-item animate-[fadeIn_0.3s_ease-in-out_0.15s_forwards]">My Portfolio</Link>
                    <Link to="/project3" className="nav-dropDown-item animate-[fadeIn_0.3s_ease-in-out_0.20s_forwards]">Machine Learning</Link>
                    <Link to="/project4" className="nav-dropDown-item animate-[fadeIn_0.3s_ease-in-out_0.25s_forwards]">Portfolio</Link>
                    <Link to="/project5" className="nav-dropDown-item animate-[fadeIn_0.3s_ease-in-out_0.30s_forwards]">Web Fundamental</Link>
                    <Link to="/project6" className="nav-dropDown-item animate-[fadeIn_0.3s_ease-in-out_0.35s_forwards]">React Fundamental</Link>
                    <Link to="/project7" className="nav-dropDown-item pb-12 animate-[fadeIn_0.3s_ease-in-out_0.40s_forwards]">My Leetcode</Link>
                </div>
            </>
        )
    );
};

export default ProjectDropdown;
