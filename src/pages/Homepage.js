import ".././index.css";
import Navbar from ".././Navigation/Navbar.js";
import Footer from ".././Navigation/Footer.js";
import React, { useEffect, useState } from 'react';
import { getAllRecords } from '../utils/polybase.js';

function Homepage() {
  console.log(getAllRecords);
  return (
    <div class="bg-[#050401]">
            <Navbar />
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#303036] dark:text-[#fffaff]">
                      <tr class="border-b dark:border-gray-700">
                          <th scope="col" class="px-6 py-3">
                              Rank
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Project
                          </th>
                          <th scope="col" class="px-6 py-3">
                              User Statistics
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Transaction Statistics
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Contract Statistics
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Total score
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Attestation address
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b dark:bg-[#303036] dark:border-gray-700">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              #1
                          </th>
                          <td class="px-6 py-4">
                              Silver
                          </td>
                          <td class="px-6 py-4">
                              Laptop
                          </td>
                          <td class="px-6 py-4">
                              $2999
                          </td>
                          <td class="px-6 py-4">
                              Silver
                          </td>
                          <td class="px-6 py-4">
                              Laptop
                          </td>
                          <td class="px-6 py-4">
                              $2999
                          </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-[#303036] dark:border-gray-700">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              #2
                          </th>
                          <td class="px-6 py-4">
                              White
                          </td>
                          <td class="px-6 py-4">
                              Laptop PC
                          </td>
                          <td class="px-6 py-4">
                              $1999
                          </td>
                          <td class="px-6 py-4">
                              White
                          </td>
                          <td class="px-6 py-4">
                              Laptop PC
                          </td>
                          <td class="px-6 py-4">
                              $1999
                          </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-[#303036] dark:border-gray-700">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              #3
                          </th>
                          <td class="px-6 py-4">
                              Black
                          </td>
                          <td class="px-6 py-4">
                              Accessories
                          </td>
                          <td class="px-6 py-4">
                              $99
                          </td>
                          <td class="px-6 py-4">
                              Black
                          </td>
                          <td class="px-6 py-4">
                              Accessories
                          </td>
                          <td class="px-6 py-4">
                              $99
                          </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-[#303036] dark:border-gray-700">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              #4
                          </th>
                          <td class="px-6 py-4">
                              Black
                          </td>
                          <td class="px-6 py-4">
                              Accessories
                          </td>
                          <td class="px-6 py-4">
                              $99
                          </td>
                          <td class="px-6 py-4">
                              Black
                          </td>
                          <td class="px-6 py-4">
                              Accessories
                          </td>
                          <td class="px-6 py-4">
                              $99
                          </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-[#303036] dark:border-gray-700">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              #5
                          </th>
                          <td class="px-6 py-4">
                              Black
                          </td>
                          <td class="px-6 py-4">
                              Accessories
                          </td>
                          <td class="px-6 py-4">
                              $99
                          </td>
                          <td class="px-6 py-4">
                              Black
                          </td>
                          <td class="px-6 py-4">
                              Accessories
                          </td>
                          <td class="px-6 py-4">
                              $99
                          </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-[#303036] dark:border-gray-700">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              #6
                          </th>
                          <td class="px-6 py-4">
                              Black
                          </td>
                          <td class="px-6 py-4">
                              Accessories
                          </td>
                          <td class="px-6 py-4">
                              $99
                          </td>
                          <td class="px-6 py-4">
                              Black
                          </td>
                          <td class="px-6 py-4">
                              Accessories
                          </td>
                          <td class="px-6 py-4">
                              $99
                          </td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-[#303036] dark:border-gray-700">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              #7
                          </th>
                          <td class="px-6 py-4">
                              Black
                          </td>
                          <td class="px-6 py-4">
                              Accessories
                          </td>
                          <td class="px-6 py-4">
                              $99
                          </td>
                          <td class="px-6 py-4">
                              Black
                          </td>
                          <td class="px-6 py-4">
                              Accessories
                          </td>
                          <td class="px-6 py-4">
                              $99
                          </td>
                      </tr>
                      <tr class="bg-white dark:bg-[#303036] dark:border-gray-700">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              #8
                          </th>
                          <td class="px-6 py-4">
                              Black
                          </td>
                          <td class="px-6 py-4">
                              Accessories
                          </td>
                          <td class="px-6 py-4">
                              $99
                          </td>
                          <td class="px-6 py-4">
                              Black
                          </td>
                          <td class="px-6 py-4">
                              Accessories
                          </td>
                          <td class="px-6 py-4">
                              $99
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
        <Footer />
    </div>
  );
}

export default Homepage;