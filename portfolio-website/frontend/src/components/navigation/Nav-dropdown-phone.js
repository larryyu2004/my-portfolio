import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPhonedropdownVisible } from '../../store/modules/phonedropdownSlice';
import { setPhonedropupVisible } from '../../store/modules/phonedropupSlice';
import { setProjectsDropdownVisible } from '../../store/modules/projectsdropdownSlice';

const NavDropdownPhone = () => {
    const dispatch = useDispatch();
    const PhoneDropDown = useSelector((state) => state.phonedropdown.isVisible);
    const PhoneDropUp = useSelector((state) => state.phonedropup.isVisible);
    
    const handlePhoneDropUp = () => {
        dispatch(setPhonedropupVisible(!PhoneDropUp));
        setTimeout(() => {
          dispatch(setPhonedropdownVisible(false));
          dispatch(setPhonedropupVisible(false));
        }, 500);
      }

    return (
        PhoneDropDown && (
            <>
            <div 
                className={`fixed left-0 top-[60px] w-full h-[calc(100vh-60px)] flex flex-col 
                bg-[rgb(244,244,246)] dark:bg-[rgb(9,9,10)] 
                items-center justify-start pt-20 gap-8 z-[15]
                ${PhoneDropUp ? 'animate-phoneDropUp' : 'animate-phoneDropDown'}
                overflow-hidden`}>

                <div className='flex flex-col gap-3'>
                <Link to="/" className="nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.3s_forwards] dark:text-white"
                onClick={handlePhoneDropUp}>Home</Link>
                    <div className='nav-dropdown-phone-sub-item'>
                        Introduction
                    </div>
                    <div className='nav-dropdown-phone-sub-item'>
                        Education
                    </div>
                    <div className='nav-dropdown-phone-sub-item'>
                        Skills
                    </div>
                </div>
                
                <div className='flex flex-col gap-3'>
                <Link to="/projects" className="nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.4s_forwards] dark:text-white"
                onClick={handlePhoneDropUp}>Projects</Link>
                <div className='nav-dropdown-phone-sub-item'>
                        Project1
                    </div>
                    <div className='nav-dropdown-phone-sub-item'>
                        Project2
                    </div>
                    <div className='nav-dropdown-phone-sub-item'>
                        Project3
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                <Link to="/contact" className="nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.5s_forwards] dark:text-white"
                onClick={handlePhoneDropUp}>Contact</Link>
                <div className='nav-dropdown-phone-sub-item'>
                        Email
                    </div>
                    <div className='nav-dropdown-phone-sub-item'>
                        Phone Number
                    </div>
                    <div className='nav-dropdown-phone-sub-item'>
                        Address
                    </div>
                </div>
            </div>
            </>
        )
    );
}

export default NavDropdownPhone;
