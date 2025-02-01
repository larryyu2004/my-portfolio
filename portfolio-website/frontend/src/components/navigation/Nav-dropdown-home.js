import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const HomeDropdown = () => {
    
    const HomedropDownIsVisible = useSelector((state) => state.Homedropdown.isVisible);

    return (
        HomedropDownIsVisible && (
            <>
                <div className={`fixed inset-0 backdrop-blur-md pointer-events-none z-[-1]
                    animate-[fadeIn_0.3s_ease-in-out_forwards]`} />
                <div className="nav-dropDown-page animate-[extendHeight_0.3s_ease-in-out_forwards]">
                    <Link to="/" 
                    className="nav-dropDown-item pt-12 animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards]"
                        >Introduction</Link>
                    <Link to="/" className="nav-dropDown-item       animate-[fadeIn_0.3s_ease-in-out_0.15s_forwards]">Education</Link>
                    <Link to="/" className="nav-dropDown-item pb-12 animate-[fadeIn_0.3s_ease-in-out_0.20s_forwards]">Skills</Link>
                </div>
            </>
        )
    );
};

export default HomeDropdown;
