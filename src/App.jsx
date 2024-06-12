import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HandleCarList from './components/HandleCarList';
import LFCarPage from './components/LFCarPage'; 

function App() {
  return (
    <Router>
    <div className="App">
      <div className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cars" element={<LFCarPage />} />
          <Route path="/admin" element={<HandleCarList />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;