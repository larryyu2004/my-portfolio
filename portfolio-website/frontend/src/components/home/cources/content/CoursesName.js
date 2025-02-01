import React, { Component } from 'react'

export default class CoursesName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSection: null,
        }
    }

    handleYearMouseEnter = (section) => {
        this.setState({ activeSection: section });
    }
    handleYearMouseLeave = () => {
        this.setState({ activeSection: 'null' });
    }
  render() {
    const { activeSection } = this.state;

    const allCourses = [
        {
            year: 'Year 1',
            courses: [
                {name: 'Information Technology Fundamentals', delay: 0.1},
                {name: 'Problem Solving and Programming', delay: 0.12},
                {name: 'Network Fundamentals', delay: 0.14},
                {name: 'Design Thinking Studio', delay: 0.16},
        
                {name: 'Object Oriented Programming', delay: 0.18},
                {name: 'Data Driven Web Technologies', delay: 0.20},
                {name: 'Systems Requirements and User Experience', delay: 0.22},
                {name: 'Systems Requirements Studio', delay: 0.24},
            ],
        },
        {       
            year: 'Year 2',
            courses: [
                {name: 'System Design and Realisation', delay: 0.1},
                {name: 'System Design Studio', delay: 0.12},
                {name: 'Design Patterns with C++', delay: 0.14},
                {name: 'Data Structures Essentials', delay: 0.16},
        
                {name: 'Security Foundations', delay: 0.18},
                {name: 'Big Data Concepts', delay: 0.20},
                {name: 'Operating Systems and Tool Chains', delay: 0.22},
                {name: 'IOS Enterprise Development', delay: 0.24},
            ],
        },
        {
            year: 'Year 3',
            courses: [
                {name: 'Agile Development and Governance', delay: 0.1},
                {name: 'Project Studio', delay: 0.12},
                {name: 'Cloud and Concurrent Programming', delay: 0.14},
                {name: 'AI and Machine Learning', delay: 0.16},
        
                {name: 'ICT Capstone Project', delay: 0.18},
                {name: 'STEM Internship 30 Days', delay: 0.20},
            ],
        }
    ];
    

    return (
        <div className='md:flex w-full min-h-[460px]'>
            {allCourses.map(({ year, courses }, index) => (
                <div
                    key={index}
                    className='flex flex-col w-1/3'
                    onMouseEnter={() => this.handleYearMouseEnter(year)}
                    onMouseLeave={() => this.handleYearMouseLeave()}
                >
                    <div className='flex w-1/3 mb-[20px] font-bold text-black dark:text-white text-[20px]'>
                        {year}
                    </div>
                    {activeSection === year && (
                        <div className='flex flex-col'>
                            {courses.map((course, courseIndex) => (
                                <div
                                    key={courseIndex}
                                    className={`font-bold cursor-pointer mb-[10px] text-black dark:text-white text-[20px] opacity-0`}
                                    style={{
                                        animation: `fadeIn 0.3s ease-in-out ${course.delay}s forwards`
                                    }}
                                >
                                    {course.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>

    );
  }
}
