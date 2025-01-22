import react from "react";
import { Link } from 'react-router-dom';

const ProjectsItems = () => {
    return (
        <div className='flex flex-col gap-3'>
            <Link to="/project1" className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards]'>
                Operating System Engineering
            </Link>
            <Link to="/project1" className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.15s_forwards]'>
                My Portfolio
            </Link>
            <Link to="/project1" className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.20s_forwards]'>
                Machine Learning
            </Link>
            <Link to="/project1" className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.25s_forwards]'>
                Portfolio
            </Link>
            <Link to="/project1" className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.30s_forwards]'>
                Web Fundamental
            </Link>
            <Link to="/project1" className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.35s_forwards]'>
                React Fundamental
            </Link>
            <Link to="/project1" className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.40s_forwards]'>
                My Leetcode
            </Link>
        </div>
    )
}

export default ProjectsItems;