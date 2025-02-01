import React, { Component } from 'react';
import { connect } from 'react-redux';

import CoursesName from './content/CoursesName';
import CoursesIntroduction from './content/CoursesIntroduction';

import { setHomeDropdownVisible } from "../../../store/modules/nav/nav/homedropdownSlice";
import { setProjectsDropdownVisible } from "../../../store/modules/nav/nav/projectsdropdownSlice";
import { setContactDropdownVisible } from "../../../store/modules/nav/nav/contactdropdownSlice";

class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LocalPageIsVisible: false,
        };
    }

    render() {
        const { HomeDropDownVisible, ProjectsDropDownVisible, ContactDropDownVisible, darkMode } = this.props;
        const blurBackground = `bg-black/20`;

        return (
            <>
            <div className={`min-h-screen mt-[60px] bg-[rgb(244,244,246)] dark:bg-[rgb(9,9,10)] p-6 duration-200 
            ${(HomeDropDownVisible || ProjectsDropDownVisible || ContactDropDownVisible) ? blurBackground : ''}
            `}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 dark:text-white">Courses</h2>
                    <div className='flex gap-[4px] min-w-[350px] md:min-w-[400px]'>
                        <CoursesName />
                    </div>

                    <div className="border-b-2 border-gray-300 dark:border-gray-700 mb-8">
                    </div>

                    <h2 className="text-4xl font-bold mb-8 dark:text-white">Introduction</h2>
                    <CoursesIntroduction />
                </div>
            </div>
            </>
        );
    }
}

// To read data from the Redux store
const mapStateToProps = (state) => ({
    HomeDropDownVisible: state.Homedropdown.isVisible,
    ProjectsDropDownVisible: state.Projectsdropdown.isVisible,
    ContactDropDownVisible: state.Contactdropdown.isVisible,
});

// To send updates to the Redux store
const mapDispatchToProps = {
    setHomeDropdownVisible,
    setProjectsDropdownVisible,
    setContactDropdownVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);