import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPhonedropdownVisible } from '../../../store/modules/nav/nav-phone/phonedropdownSlice';
import { setPhonedropupVisible } from '../../../store/modules/nav/nav-phone/phonedropupSlice';
import { setProjectsDropdownVisible } from '../../../store/modules/nav/nav/projectsdropdownSlice';

import { setPhoneHomeVisible } from '../../../store/modules/nav/nav-phone/phonehomeSlice'
import { setPhoneProjectsVisible } from '../../../store/modules/nav/nav-phone/phoneprojectsSlice';

import HomeItems from './Nav-phone-home';
import ProjectsItems from './Nav-phone-projects';
import ContactItems from './Nav-phone-contact';


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

    
    const phoneHomeVisible = useSelector((state) => state.phonehome.isVisible);
    const handlePhoneHome = () => {
        dispatch(setPhoneHomeVisible(!phoneHomeVisible));
    }


    const phoneProjectsVisible = useSelector((state) => state.phoneprojects.isVisible);
    const handlePhoneProjects = () => {
        dispatch(setPhoneProjectsVisible(!phoneProjectsVisible));
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

                <div className='flex flex-col gap-3 min-w-[115.59px]'>
                <Link to="/" className="nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.3s_forwards] dark:text-white"
                onClick={handlePhoneHome}>Home</Link>
                {(phoneHomeVisible) && (<HomeItems />)}
                </div>
                
                <div className='flex flex-col gap-3'>
                <Link to="/projects" className="nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.4s_forwards] dark:text-white"
                onClick={handlePhoneProjects}>Projects</Link>
                {(phoneProjectsVisible) && <ProjectsItems />}
                </div>

                <div className='flex flex-col gap-3'>
                <Link to="/contact" className="nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.5s_forwards] dark:text-white"
                onClick={''}>Contact</Link>
                <ContactItems />
                </div>
            </div>
            </>
        )
    );
}

export default NavDropdownPhone;
