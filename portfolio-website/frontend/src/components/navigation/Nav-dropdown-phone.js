import React from 'react';
import { useSelector } from 'react-redux';

const NavDropdownPhone = () => {
    const PhoneDropDown = useSelector((state) => state.phonedropdown.isVisible);
    
    return (
        PhoneDropDown && (
            <div className="fixed left-0 top-[60px] w-full h-[calc(100vh-60px)] flex flex-col 
                bg-[rgb(244,244,246)] dark:bg-[rgb(9,9,10)] 
                items-center justify-start pt-20 gap-8 z-[15]
                animate-[phoneDropDown_0.5s_ease-in-out_forwards]
                overflow-hidden">
                <a href="#home" className="nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.20s_forwards]">Home</a>
                <a href="#about" className="nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.30s_forwards]">About</a>
                <a href="#projects" className="nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.40s_forwards]">Projects</a>
                <a href="#contact" className="nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.50s_forwards]">Contact</a>
            </div>
        )
    );
}

export default NavDropdownPhone;
