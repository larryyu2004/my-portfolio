import react from "react";
import { Link } from 'react-router-dom';

const HomeItems = () => {
    return (
        <div className='flex flex-col gap-3 min-w-[115.59px]'>
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
    )
}

export default HomeItems;