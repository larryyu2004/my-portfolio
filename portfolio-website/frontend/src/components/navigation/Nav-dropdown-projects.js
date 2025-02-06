import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Projects from "../projects/Projects";

class ProjectDropdown extends Component {
  render() {
    const { ProjectsdropDownIsVisible, darkMode } = this.props;

    const projects = [
      { label: "Operating System Engineering", 
        link: "https://github.com/larryyu2004/XV-6-Lab", 
        delay: 0.1 },

      { label: "My Portfolio", 
        link: "https://github.com/larryyu2004/my-portfolio", 
        delay: 0.15 },

      { label: "Machine Learning", 
        link: "/", 
        delay: 0.2 },

      { label: "Portfolio", 
        link: "https://github.com/larryyu2004/portfolio-website", 
        delay: 0.25 },

      { label: "Web Fundamental", 
        link: "https://github.com/larryyu2004/Web-Fundamental", 
        delay: 0.3 },

      { label: "React Fundamental", 
        link: "https://github.com/larryyu2004/react-fundamental", 
        delay: 0.35 },

      { label: "My Leetcode", 
        link: "/projects/leetcode", 
        delay: 0.4 },
    ];

    if (!ProjectsdropDownIsVisible) return null; // If dropdown is not visible, return nothing

    return (
      <>
        <div
          className={`fixed inset-0 backdrop-blur-md pointer-events-none z-[-1]
                      animate-[fadeIn_0.3s_ease-in-out_forwards]`}
        />
        
        <div className="nav-dropDown-page animate-[extendHeight_0.3s_ease-in-out_forwards]">
          {projects.map((project, index) => (
            <Link
              key={index}
              to={project.link}
              className={`nav-dropDown-item ${
                index === 0 ? "pt-12" : index === projects.length - 1 ? "pb-12" : ""
              } animate-fadeIn`}
              style={{ animationDelay: `${project.delay}s` }}
            >
              {project.label}
            </Link>
          ))}
        </div>
      </>
    );
  }
}

// Map Redux state to component props
const mapStateToProps = (state) => ({
  ProjectsdropDownIsVisible: state.Projectsdropdown.isVisible,
  darkMode: state.theme.darkMode,
});

// Connect the component to Redux
export default connect(mapStateToProps)(ProjectDropdown);