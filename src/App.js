import "./index.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages/Homepage.js';
import Attestation from './pages/Attestation.js'; 
import Work from './pages/Work.js';
import Navbar from './Navigation/Navbar.js'; // Import the Navbar component

function App() {
  const [selectedNetwork, setSelectedNetwork] = useState('Optimism'); // Default network selection

  const handleNetworkChange = (network) => {
    setSelectedNetwork(network);
  };

  return (
    <Router>
      {/* Pass selectedNetwork and handleNetworkChange to Navbar */}
      <Navbar selectedNetwork={selectedNetwork} onNetworkChange={handleNetworkChange} />

      <Routes>
        <Route exact path='/' element={<Home />} />
        {/* Pass selectedNetwork to Attestation */}
        <Route path='/attestation' element={<Attestation selectedNetwork={selectedNetwork} />} />
        <Route path='/work' element={<Work />} />
      </Routes>
    </Router>
  );
}

export default App;
