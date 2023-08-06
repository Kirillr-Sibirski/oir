import "./index.css";
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages/Homepage.js';
import Attestation from './pages/Attestation.js'; 
import Finish from './pages/Finish.js';


function App() {
  return (
    <Router>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/attestation' element={<Attestation />} />
            <Route path='/finish' element={<Finish />} />
        </Routes>
    </Router>
  );
}

export default App;