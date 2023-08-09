import ".././index.css";
import Navbar from ".././Navigation/Navbar.js";
import Footer from ".././Navigation/Footer.js";
import React, { useEffect, useState } from 'react';
import { getAllRecords } from '../utils/polybase.js';
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { _getAttestation } from './Attestation.js';


function Homepage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const records = await getAllRecords();
        // Sort recods in accending rank order before pushing them to the hook
        for(let i = 0; i < data.length; i++) {
            const projectName = _getAttestation(data[i].data.id);
            setName(projectName);
        }
        setData(records);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-[#050401]">
      <Navbar />
      <div className={`overflow-x-hidden overflow-y-auto ${isLoading ? '' : 'hidden'}`}>
        <p class="text-base text-gray-900 dark:text-white">Loading the leaderboard...</p>
        <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-[#303036] fill-[#30bced]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
      <div className={`overflow-x-hidden overflow-y-auto ${!isLoading ? '' : 'hidden'}`}>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#303036] dark:text-[#fffaff]">
                <tr class="border-b dark:border-gray-700">
                    <th scope="col" class="px-6 py-3">
                        Rank
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Project
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Attestation address
                    </th>
                </tr>
            </thead>
            <tbody>
              {data.map((rowData, index) => (
                <tr
                  key={index}
                  className={`bg-${index % 2 === 0 ? 'white' : '[#303036]'} border-b dark:bg-[#303036] dark:border-gray-700`}
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {rowData.data.rank}
                  </th>
                  <td className="px-6 py-4">{name[index]}</td>
                  <td className="px-6 py-4">{rowData.data.id}</td>
                </tr>
              ))}
            </tbody>
        </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;