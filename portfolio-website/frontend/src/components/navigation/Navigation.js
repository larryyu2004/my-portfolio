import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import homelogo from '../../assets/svg/device_hub_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';
import sun from '../../assets/svg/sun-2-svgrepo-com.svg';
import moon from '../../assets/svg/moon-svgrepo-com.svg';
import phoneMenu from '../../assets/svg/align-right-svgrepo-com.svg';
import cross from '../../assets/svg/cross-svgrepo-com.svg';

import HomeDropdown from './Nav-dropdown-home';
import NavDropdownPhone from './Nav-phone/Nav-dropdown-phone';
import ProjectDropdown from './Nav-dropdown-projects';
import ContactDropdown from './Nav-dropdown-contact';
import { toggleDarkMode } from '../../store/modules/nav/themeSlice';
import { setPhonedropdownVisible } from '../../store/modules/nav/nav-phone/phonedropdownSlice';
import { setProjectsDropdownVisible } from '../../store/modules/nav/nav/projectsdropdownSlice';
import { setHomeDropdownVisible } from '../../store/modules/nav/nav/homedropdownSlice';
import { setPhonedropupVisible } from '../../store/modules/nav/nav-phone/phonedropupSlice';
import { setContactDropdownVisible } from '../../store/modules/nav/nav/contactdropdownSlice';

const Navigation = () => {
  const dispatch = useDispatch();
  
  const handleHomeMouseEnter = () => dispatch(setHomeDropdownVisible(true));
  const handleHomeMouseLeave = () => dispatch(setHomeDropdownVisible(false));

  const handleProjectsMouseEnter = () => dispatch(setProjectsDropdownVisible(true));
  const handleProjectsMouseLeave = () => dispatch(setProjectsDropdownVisible(false));

  const handleContactMouseEnter = () => dispatch(setContactDropdownVisible(true));
  const handleContactMouseLeave = () => dispatch(setContactDropdownVisible(false));

  const darkMode = useSelector((state) => state.theme.darkMode);
  const PhoneDropDown = useSelector((state) => state.phonedropdown.isVisible);
  const PhoneDropUp = useSelector((state) => state.phonedropup.isVisible);

  const HomeDropdownVisible = useSelector((state) => state.Homedropdown.isVisible);
  const ProjectDropdownVisible = useSelector((state) => state.Projectsdropdown.isVisible);
  const ContactDropdownVisible = useSelector((state) => state.Contactdropdown.isVisible);
  const isAnyDropdownOpen = HomeDropdownVisible || ProjectDropdownVisible || ContactDropdownVisible;

  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };
  
  const handlePhoneDropDown = () => {
    dispatch(setPhonedropdownVisible(!PhoneDropDown));
  };

  const handlePhoneDropUp = () => {
    dispatch(setPhonedropupVisible(!PhoneDropUp));
    setTimeout(() => {
      dispatch(setPhonedropdownVisible(false));
      dispatch(setPhonedropupVisible(false));
    }, 500);
  }
  
  return (
    <nav className={`fixed top-0 left-0 w-full flex justify-center items-center gap-4 p-1 z-[20] pb-10
      ${isAnyDropdownOpen ? "bg-[rgba(244,244,246,1)] dark:bg-[rgba(9,9,10,1)]" 
                          : "bg-[rgba(244,244,246,0.3)] dark:bg-[rgba(9,9,10,0.3)] backdrop-blur-[8px]"}`}>
      
      <ul className="flex gap-4 items-center ">
        <Link to="/">
          <div className="text-2xl font-bold">
            <img 
              src={homelogo} 
              alt="home logo" 
              className="w-88 h-8 transition-all duration-500 md:l-0
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
          onMouseEnter={handleHomeMouseEnter}                                                                                
          onMouseLeave={handleHomeMouseLeave}
        >
          <li className="nav-item hidden md:block">
            <Link to="/">Home</Link>
          </li>
          <HomeDropdown/>
        </div>

        <div 
          className="relative"
          onMouseEnter={handleProjectsMouseEnter}                                                                                
          onMouseLeave={handleProjectsMouseLeave}
        >
        <li className="nav-item hidden md:block">
          <Link to="/projects">Projects</Link>
        </li>
        <ProjectDropdown/>
        </div>

        <div 
          className="relative"
          onMouseEnter={handleContactMouseEnter}                                                                                
          onMouseLeave={handleContactMouseLeave}
        >
        <li className="nav-item hidden md:block">
          <Link to="/contact">Contact</Link>
        </li>
        <ContactDropdown />
        </div>

        <button
          onClick={handleDarkMode}
          className="absolute right-10 p-2 rounded-full transition-colors duration-300">
          {darkMode ? <img src={sun} alt='sun logo' className='w-6 h-6 [filter:invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(100%)_contrast(100%)]'/> : <img src={moon} alt='sun logo' className='w-6 h-6'/>}
        </button>

        {!PhoneDropDown ? 
        (<img 
          src={phoneMenu} 
          alt='phone menu' 
          className='w-6 h-6 absolute right-4 cursor-pointer 
          dark:[filter:invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(100%)_contrast(100%)] block md:hidden
          '
          onClick={handlePhoneDropDown}
        />)
        :
        (<img 
          src={cross} 
          alt='cross' 
          className='w-6 h-6 absolute right-4 cursor-pointer 
          dark:[filter:invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(0deg)_brightness(100%)_contrast(100%)] block md:hidden
          '
          onClick={handlePhoneDropUp}
        />)}
        
        
      </ul>
    </nav>
  );
};

export default Navigation;
