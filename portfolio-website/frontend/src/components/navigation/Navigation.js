import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDropdownVisible } from '../../store/modules/dropdownSlice';

import homelogo from '../../assets/svg/device_hub_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';
import sun from '../../assets/svg/sun-2-svgrepo-com.svg';
import moon from '../../assets/svg/moon-svgrepo-com.svg';
import phoneMenu from '../../assets/svg/align-right-svgrepo-com.svg';

import HomeDropdown from './Nav-dropdown-home';
import NavDropdownPhone from './Nav-dropdown-phone';
import ProjectDropdown from './Nav-dropdown-projects';
import { toggleDarkMode } from '../../store/modules/themeSlice';
import { setPhonedropdownVisible } from '../../store/modules/phonedropdownSlice'


const Navigation = () => {
  const dispatch = useDispatch();
  
  const handleMouseEnter = () => dispatch(setDropdownVisible(true));
  const handleMouseLeave = () => dispatch(setDropdownVisible(false));

  const darkMode = useSelector((state) => state.theme.darkMode);
  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  }

  const PhoneDropDown = useSelector((state) => state.phonedropdown.isVisible);
  const handlePhoneDropDown = () => dispatch(setPhonedropdownVisible(!PhoneDropDown));
  
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center items-center gap-4 p-1 z-[20] pb-10 bg-[rgb(244,244,246)] dark:bg-[rgb(9,9,10)] duration-200">
      <ul className="flex gap-4 items-center">
        <Link to="/">
          <div className="text-2xl font-bold">
            <img 
              src={homelogo} 
              alt="home logo" 
              className="w-8 h-8 transition-all duration-500 md:l-0
                [filter:invert(54%)_sepia(11%)_saturate(1641%)_hue-rotate(197deg)_brightness(87%)_contrast(87%)]
                hover:[filter:invert(100%)_sepia(50%)_saturate(2000%)_hue-rotate(280deg)_brightness(100%)_contrast(100%)]
                dark:[filter:invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(1000%)_contrast(100%)]
                dark:hover:[filter:invert(100%)_sepia(50%)_saturate(2000%)_hue-rotate(280deg)_brightness(1500%)_contrast(100%)]"
            />
          </div>
        </Link>

        <NavDropdownPhone />

        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}                                                                                
          onMouseLeave={handleMouseLeave}
        >
          <li className="nav-item hidden md:block">
            <Link to="/">Home</Link>
          </li>
          <HomeDropdown/>
        </div>

        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}                                                                                
          onMouseLeave={handleMouseLeave}
        >
        <li className="nav-item hidden md:block">
          <Link to="/projects">Projects</Link>
        </li>
        <ProjectDropdown/>
        </div>


        <li className="nav-item hidden md:block">
          <Link to="/contact">Contact</Link>
        </li>

        <button
          onClick={handleDarkMode}
          className="absolute right-10 p-2 rounded-full transition-colors duration-300">
          {darkMode ? <img src={sun} alt='sun logo' className='w-6 h-6 [filter:invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(100%)_contrast(100%)]'/> : <img src={moon} alt='sun logo' className='w-6 h-6'/>}
        </button>

        <img 
          src={phoneMenu} 
          alt='phone menu' 
          className='w-6 h-6 absolute right-4 cursor-pointer dark:[filter:invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(100%)_contrast(100%)] block md:hidden'
          onClick={handlePhoneDropDown}
        />
        
        
      </ul>
    </nav>
  );
};

export default Navigation;
