import "./index.css";
import Navbar from "./Navigation/Navbar.js";
import Footer from "./Navigation/Footer.js";
import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { getSigner } from './connectWallet.js';

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
const eas = new EAS(EASContractAddress); // Initialize the sdk with the address of the EAS Schema contract address

function App() {

  async function createAttestation() {
    try {
      eas.connect(getSigner());

      // Initialize SchemaEncoder with the schema string

      // const schemaEncoder = new SchemaEncoder("string ProjectName,address[] SmartContracts");
      // const encodedData = schemaEncoder.encodeData([
      //   { name: "ProjectName", value: "OIR", type: "string" },
      //   { name: "SmartContracts", value: ["0xc0ffee254729296a45a3885639AC7E10F9d54979", "0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E"], type: "address[]" }, // custom made attestation
      // ]);
      
      // const schemaUID = "0xf66413fd6e398c38767ac38ce1ec2da4ddf3fb2a823cb552c38fad302e32af95";
      
      // const tx = await eas.attest({
      //   schema: schemaUID,
      //   data: {
      //     recipient: "0x8BF7314a19A4e66D0bfAd235f3422464292a948D",
      //     expirationTime: 0,
      //     revocable: false,
      //     data: encodedData,
      //   },
      // });

      const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
      const encodedData = schemaEncoder.encodeData([
        { name: "eventId", value: 1, type: "uint256" },
        { name: "voteIndex", value: 1, type: "uint8" },
      ]);
      
      const schemaUID = "0x424041413f6893c2f2e3e0e91ce9e26763840795b9c7fbb3866502e8d5c94677";
      
      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: "0x8BF7314a19A4e66D0bfAd235f3422464292a948D",
          expirationTime: 0,
          revocable: true,
          data: encodedData,
        },
      });

      console.log("TX: ",tx);
      const newAttestationUID = await tx.wait();
      
      console.log("New attestation UID:", newAttestationUID);
    } catch (error) {
      console.log("createAttestation Error: ", error);
    }

  }

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

export default App;