import { Link } from 'react-router-dom';
import homelogo from '../../assets/svg/device_hub_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';
import HomeDropdown from './Nav-dropdown';
import { useDispatch } from 'react-redux';
import { setDropdownVisible } from '../../store/dropdownSlice';

const Navigation = () => {
  const dispatch = useDispatch();

  const handleMouseEnter = () => dispatch(setDropdownVisible(true));
  const handleMouseLeave = () => dispatch(setDropdownVisible(false));
  
  return (
    <nav className="w-[100vw] flex justify-center items-center gap-4 p-1 relative z-[20] pb-10">
      <ul className="flex gap-4 items-center">
        <Link to="/">
          <div className="text-2xl font-bold">
            <img 
              src={homelogo} 
              alt="home logo" 
              className="w-8 h-8 transition-all duration-500 
                [filter:invert(54%)_sepia(11%)_saturate(1641%)_hue-rotate(197deg)_brightness(87%)_contrast(87%)]
                hover:[filter:invert(100%)_sepia(50%)_saturate(2000%)_hue-rotate(280deg)_brightness(100%)_contrast(100%)]"
            />
          </div>
        </Link>


        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <li className="font-bold px-2 transform translate-y-[2px]">
            <Link to="/">Home</Link>
          </li>
          <HomeDropdown/>
        </div>


        <li className="font-bold px-2 transform translate-y-[2px]">
          <Link to="/projects">Projects</Link>
        </li>
        <li className="font-bold px-2 transform translate-y-[2px]">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
