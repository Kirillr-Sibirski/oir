import ".././index.css";
import Navbar from ".././Navigation/Navbar.js";
import Footer from ".././Navigation/Footer.js";
import React, { useEffect, useState } from 'react';

function Attestation() {
  return (
    <div class="bg-[#050401]">
        <Navbar />
            <div>
                {/* 
                We need:
                - A field to input project name
                - A field to input all the smart contracts addresses
                - A button that triggers 'createAttestation' event
                - Some kind of feedback from the chain to display to the user
                */}
                <form>
                    <div class="mb-6">
                        <label for="default-input" class="block mb-2 text-sm font-medium text-[#fffaff] dark:text-[#fffaff]">Project name</label>
                        <input type="text" id="default-input" class="bg-[#303036] text-gray-900 text-sm rounded-lg focus:ring-[#30bced] focus:border-[#30bced] block w-full p-2.5 dark:bg-[#303036] dark:border-[#30bced] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#30bced] dark:focus:border-[#30bced]" />
                    </div>
                    <div class="mb-6">
                        <label for="large-input" class="block mb-2 text-sm font-medium text-[#fffaff] dark:text-[#fffaff]">Enter all of the project's smart contract addresses separated by comma (,)</label>
                        <input type="text" id="large-input" class="block w-full p-4 text-gray-900 rounded-lg bg-[#303036] sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-[#303036] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div class="flex items-start mb-6">
                        <div class="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-[#303036] rounded bg-[#fffaff] focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-[#fffaff]">I understood how this <a href="#" class="text-[#30bced] hover:underline dark:text-[#30bced]">works</a>.</label>
                    </div>
                    <button type="submit" class="text-white bg-[#30bced] hover:bg-[#30bced] focus:ring-4 focus:outline-none focus:ring-[#30bced] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#30bced] dark:hover:bg-[#30bced] dark:focus:ring-[#30bced]">Submit</button>
                </form>

            </div>
        <Footer />
    </div>
  );
}

export default Attestation;