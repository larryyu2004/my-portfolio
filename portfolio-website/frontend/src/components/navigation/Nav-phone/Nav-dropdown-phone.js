import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { setPhonedropdownVisible } from '../../../store/modules/nav/nav-phone/phonedropdownSlice';
import { setPhonedropupVisible } from '../../../store/modules/nav/nav-phone/phonedropupSlice';
import { connect } from 'react-redux';

import HomeItems from './Nav-phone-home';
import ProjectsItems from './Nav-phone-projects';
import ContactItems from './Nav-phone-contact';


class NavDropdownPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSection: null,
        }
    }
    
    handleSectionClick = (section) => {
        this.setState(prevState => {
            // before updating
            if(prevState.activeSection !== section) {
                return { activeSection: section };
            } else {
                return { activeSection: null };
            }
        }, () => {
            // after updating
            const { activeSection } = this.state;
            if(activeSection == null) {
                this.handlePhoneDropUp();
            }
        })
    }
    handlePhoneDropUp = () => {
        this.props.setPhonedropupVisible(!this.props.PhoneDropUp)
        setTimeout(() => {
          this.props.setPhonedropdownVisible(false);
          this.props.setPhonedropupVisible(false);
        }, 500);
    }

    componentDidUpdate(prevProps) {
        // PhoneDropDown (change from true to false)
        if(prevProps.PhoneDropDown && !this.props.PhoneDropDown) {
            this.props.setPhonedropdownVisible(false);
            this.props.setPhonedropupVisible(false);
            this.setState({ activeSection: null });
        }
    }

    render() {
        const { PhoneDropDown, PhoneDropUp} = this.props;
        const { activeSection } = this.state;
        return (
            PhoneDropDown && (
                <>
                <div 
                    className={`fixed left-0 top-[60px] w-full h-[calc(100vh-60px)] flex flex-col 
                    bg-[rgb(244,244,246)] dark:bg-[rgb(9,9,10)] 
                    pl-[35px] justify-start pt-20 gap-8 z-[15]
                    ${PhoneDropUp ? 'animate-phoneDropUp' : 'animate-phoneDropDown'}
                    overflow-hidden`}>
    
                    <div className='flex flex-col gap-3 min-w-[115.59px]'>
                    <Link to="/" className="nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.3s_forwards] dark:text-white"
                    onClick={() => this.handleSectionClick('home')}>Home</Link>
                    {(activeSection === 'home') && (<HomeItems />)}
                    </div>
                    
                    <div className='flex flex-col gap-3 min-w-[115.59px]'>
                    <Link to="/projects" className={`nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.5s_forwards] dark:text-white`}
                    onClick={() => this.handleSectionClick('projects')}>Projects</Link>
                    {(activeSection === 'projects') && <ProjectsItems />}
                    </div>
    
                    <div className='flex flex-col gap-3 min-w-[115.59px]'>
                    <Link to="/contact" className={`nav-dropdown-phone-item animate-[fadeIn_0.3s_ease-in-out_0.7s_forwards] dark:text-white`}
                    onClick={() => this.handleSectionClick('contact')}>Contact</Link>
                    {(activeSection === 'contact') && <ContactItems />}
                    </div>
                </div>
                </>
            )
        );
    }
}

// To read data from the Redux store
const mapStateToProps = (state) => ({
    PhoneDropDown: state.phonedropdown.isVisible,
    PhoneDropUp: state.phonedropup.isVisible,
});
// To send updates to the Redux store
const mapDispatchToProps = {
    setPhonedropdownVisible,
    setPhonedropupVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavDropdownPhone);