import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { store }  from './store/store';
import { Provider } from 'react-redux';
import Courses from './components/home/cources/Courses';


const App = () => {
  return (
    
    <Provider store={store}>
    <Router basename="/my-portfolio">
      <div className="bg-[rgb(244,244,246)]">
        <Navigation />
        <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      
    </Router>
    </Provider>
    
  );
};

export default App;
