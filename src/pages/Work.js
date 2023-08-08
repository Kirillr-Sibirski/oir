import ".././index.css";
import Navbar from ".././Navigation/Navbar.js";
import Footer from ".././Navigation/Footer.js";
import React, { useEffect, useState } from 'react';

function Work() {
  return (
    <div class="bg-[#050401]">
        <Navbar />
            <p class="mb-3 text-gray-500 dark:text-gray-400">Optimism Impact Ranking (OIR) is a platform for evaluating project impact on-chain within the Optimism ecosystem. This process involves the following key steps:</p>
            <p class="text-gray-500 dark:text-gray-400">1. Attestation Creation: Projects generate an EAS attestation containing their project name and related smart contracts. Once created, this attestation becomes a permanent on-chain record.</p>
            <p class="text-gray-500 dark:text-gray-400">2. Smart Contract Analysis: The addresses of smart contracts are extracted, and Covalent APIs is employed to retrieve essential data like user engagement, transaction activities, and contract specifics etc.</p>
            <p class="text-gray-500 dark:text-gray-400">3. Statistical Compilation: The gathered data is subjected to meticulous analysis and processed through a specialized formula designed to calculate an impact rank for each project.</p>
            <p class="text-gray-500 dark:text-gray-400">4. Rank Assignment: Projects are assigned impact ranks based on the formula's outcomes, indicating their significance within the Optimism ecosystem.</p>
            <p class="mb-3 text-gray-500 dark:text-gray-400">5. Storage and Presentation: Both the impact rank and project attestation are securely stored within Moralis DB. The platform's dashboard showcases projects in a dynamic leaderboard format, with their impact ranks determining their ordering.</p>
            <p class="text-gray-500 dark:text-gray-400">OIR stands out by highlighting smaller Optimism ecosystem projects, offering a space to recognize their contributions and present their impact rankings. Similar in concept to DappRadar.com, OIR offers a focused lens on smaller Optimism projects.</p>
        <Footer />
    </div>
  );
}

export default Work;