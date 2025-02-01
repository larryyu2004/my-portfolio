import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { setPhonedropdownVisible } from '../../../store/modules/nav/nav-phone/phonedropdownSlice';
import { setPhonedropupVisible } from '../../../store/modules/nav/nav-phone/phonedropupSlice';
import { connect } from 'react-redux';

class HomeItems extends Component {
    constructor(props) {
        super(props);
    }
    handlePhoneDropUp = () => {
        this.props.setPhonedropupVisible(!this.props.PhoneDropUp)
        setTimeout(() => {
            this.props.setPhonedropdownVisible(false);
            this.props.setPhonedropupVisible(false);
        }, 500);
    }

    render () {
        const items = [
            { label: 'Introduction', delay: 0.1 },
            { label: 'Education', delay: 0.15 },
            { label: 'Skills', delay: 0.20 },
        ];
        return (
            <>
                <div className='flex flex-col gap-3 min-w-[115.59px]'>
                    {items.map((item, index) => (
                        <Link 
                        key={index}
                        to="/" 
                        className={`nav-dropdown-phone-sub-item opacity-0`}
                        style={{animation: `fadeIn 0.3s ease-in-out ${item.delay}s forwards`}}
                        onClick={this.handlePhoneDropUp}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeItems);
