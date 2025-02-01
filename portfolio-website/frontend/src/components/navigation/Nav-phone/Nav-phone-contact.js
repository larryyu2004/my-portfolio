import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { setPhonedropdownVisible } from '../../../store/modules/nav/nav-phone/phonedropdownSlice';
import { setPhonedropupVisible } from '../../../store/modules/nav/nav-phone/phonedropupSlice';
import { connect } from 'react-redux';

class ContactItems extends Component {
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
            { label: 'Email', delay: 0.1 },
            { label: 'Phone Number', delay: 0.15 },
            { label: 'Address', delay: 0.2 },
        ];
        return (
            <>
                <div className='flex flex-col gap-3 min-w-[115.59px]'>
                    {items.map((item, index) => (
                        <Link 
                        key={index}
                        to="/contact" 
                        className={`nav-dropdown-phone-sub-item`}
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactItems);
