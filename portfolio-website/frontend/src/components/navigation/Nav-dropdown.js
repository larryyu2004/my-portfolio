import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const HomeDropdown = () => {
    const dropDownIsVisible = useSelector((state) => state.dropdown.isVisible);
    return (
        dropDownIsVisible && (
            <>
                <div className={`fixed inset backdrop-blur-md pointer-events-none z-[-1]
                    animate-[fadeIn_0.3s_ease-in-out_forwards]`} />
                <div className="fixed left-0 top-[32px] w-full flex flex-col bg-[rgb(244,244,246)] pl-12
                    overflow-hidden max-h-0 pointer-events-none z-[2]
                    animate-[extendHeight_0.3s_ease-in-out_forwards]">
                    <Link to="/about" className="pb-3 pt-12 text-black font-bold pointer-events-auto opacity-0
                        animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards]">Introduction</Link>
                    <Link to="/education" className="pb-3 text-black font-bold pointer-events-auto opacity-0
                        animate-[fadeIn_0.3s_ease-in-out_0.15s_forwards]">Education</Link>
                    <Link to="/skills" className="pb-3 pb-12 text-black font-bold pointer-events-auto opacity-0
                        animate-[fadeIn_0.3s_ease-in-out_0.20s_forwards]">Skills</Link>
                </div>
            </>
        )
    );
};

export default HomeDropdown;
