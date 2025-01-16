import react from "react";
import { Link } from 'react-router-dom';

const ContactItems = () => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='nav-dropdown-phone-sub-item'>
                Contact1
            </div>
            <div className='nav-dropdown-phone-sub-item'>
                Contact2
            </div>
            <div className='nav-dropdown-phone-sub-item'>
                Contact3
            </div>
        </div>
    )
}

export default ContactItems;