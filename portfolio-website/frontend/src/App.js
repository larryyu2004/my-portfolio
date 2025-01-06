import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { store }  from './store/store';
import { Provider } from 'react-redux';


const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <div className="bg-[rgb(244,244,246)]">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
};

export default App;
