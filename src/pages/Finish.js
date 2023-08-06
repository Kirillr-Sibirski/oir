import ".././index.css";
import Navbar from ".././Navigation/Navbar.js";
import Footer from ".././Navigation/Footer.js";
import React, { useEffect, useState } from 'react';

function Finish() {
    async function displayUID(uid) {
        console.log("Your uid: ",uid)
    }
    return (
        <div class="bg-[#050401]">
            <Navbar />
                <p class="text-base text-gray-900 dark:text-white">Your attestation UID is: </p>
                <p class="text-base text-gray-900 dark:text-white">Calculating the impact rank... This will take some time.</p>

                <p class="text-base text-gray-900 dark:text-white">Your project impact rank is: </p>
                <p class="text-base text-gray-900 dark:text-white">Your project is now displayed on the dashboard.</p>
            <Footer />
        </div>
    );
}

export default Finish;