import react from "react";
import { Link } from 'react-router-dom';

const HomeItems = () => {
    return (
        <div className='flex flex-col gap-3 min-w-[115.59px]'>
            <div className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards]'>
                Introduction
            </div>
            <div className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.15s_forwards]'>
                Education
            </div>
            <div className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.20s_forwards]'>
                Skills
            </div>
        </div>
    )
}

export default HomeItems;