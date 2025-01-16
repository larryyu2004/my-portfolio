import react from "react";
import { Link } from 'react-router-dom';

const ProjectsItems = () => {
    return (
        <div className='flex flex-col gap-3'>
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
    )
}

export default ProjectsItems;