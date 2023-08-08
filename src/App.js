import "./index.css";
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages/Homepage.js';
import Attestation from './pages/Attestation.js'; 
import Work from './pages/Work.js';


function App() {
  return (
    <Router>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/attestation' element={<Attestation />} />
            <Route path='/work' element={<Work />} />
        </Routes>
    </Router>
  );
}

export default App;