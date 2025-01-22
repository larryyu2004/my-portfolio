import react from "react";
import { Link } from 'react-router-dom';

const ContactItems = () => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.1s_forwards]'>
                Email
            </div>
            <div className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.15s_forwards]'>
                Phone Number
            </div>
            <div className='nav-dropdown-phone-sub-item animate-[fadeIn_0.3s_ease-in-out_0.20s_forwards]'>
                Address
            </div>
        </div>
    )
}

export default ContactItems;