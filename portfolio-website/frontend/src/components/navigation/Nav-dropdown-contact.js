import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ContactDropdown = () => {
    const dropDownIsVisible = useSelector((state) => state.Contactdropdown.isVisible);
    
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        dropDownIsVisible && (
            <>
                <div className={`fixed inset-0 backdrop-blur-md pointer-events-none z-[-1]
                    animate-[fadeIn_0.3s_ease-in-out_forwards]`} />
                <div className="nav-dropDown-page animate-[extendHeight_0.3s_ease-in-out_forwards]">
                    <Link to="/email" className="nav-dropDown-item pt-12 animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards]">Email</Link>
                    <Link to="/phoneMumber" className="nav-dropDown-item animate-[fadeIn_0.3s_ease-in-out_0.15s_forwards]">Phone Number</Link>
                    <Link to="/address" className="nav-dropDown-item pb-12 animate-[fadeIn_0.3s_ease-in-out_0.20s_forwards]">Address</Link>
                </div>
            </>
        )
    );
};

export default ContactDropdown;
