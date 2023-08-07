import ".././index.css";
import Navbar from ".././Navigation/Navbar.js";
import Footer from ".././Navigation/Footer.js";
import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { getSigner } from '../utils/connectWallet.js';

const provider = ethers.providers.getDefaultProvider(
    "sepolia"
  );
// Get MetaMask - RPC Error: Internal JSON-RPC error. {code: -32603, message: 'Internal JSON-RPC error.' TRY CHANGING NETWORK TO SEPOLIA
// When changed to Sepolia - Error: Unable to process attestation events
const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26 // "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84" // Optimism Goerli
const eas = new EAS(EASContractAddress); // Initialize the sdk with the address of the EAS Schema contract address

function Attestation() {
    const [name, setName] = React.useState("");
    const onChangeName = ({ target }) => setName(target.value);
    const [contracts, setContracts] = React.useState("");
    const onChangeContracts = ({ target }) => setContracts(target.value);
    const [checkbox, setCheckbox] = React.useState("");
    const onChangeCheckbox = ({ target }) => setCheckbox(!target.value);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingImpact, setIsLoadingImpact] = useState(true);
    const [attestationUID, setAttestationUID] = useState("");
    const [projectRank, setProjectRank] = useState("");

    async function createAttestation() {
        console.log("createAttestation test passed");
        try {
            if(checkbox) {
            console.log("Checkbox test passed");
                if(typeof name === 'string' || name instanceof String) {
                    console.log("Name verification test passed");
                    eas.connect(getSigner());
                    // String manipulations
                    const contractsNoSpace = contracts.replace(/ /g,''); // Delete all spaces
                    const contractsArray = contractsNoSpace.split(","); // Turn it into an array

                    console.log("Name: ", name)
                    console.log("Contracts: ", contractsArray);

                    let state = true;
                    for (let i = 0; i < contractsArray.length; i++) {
                        if(!ethers.utils.isAddress(contractsArray[i])) state = false; // Check if it a legit contract address
                    }
                    if (state) {
                        console.log("Address verification test passed");

                        setIsLoading(true); // show loading icon
                        // Initialize SchemaEncoder with the schema string
                        const schemaEncoder = new SchemaEncoder("string projectName, address[] smartContracts");
                        console.log("Schema encoder test passed: ",schemaEncoder);

                        const encodedData = schemaEncoder.encodeData([
                        { name: "projectName", value: name, type: "string"}, //for some reason param "value" doesn't show up
                        { name: "smartContracts", value: contractsArray, type: "address[]" },
                        ]);
                        console.log("encodedData test passed: ",encodedData)

                        const schemaUID = "0x1bda524d814243905d395a50456796a5e08cb87e4d72eb434146a5081a1431a5"; // Sepolia schema //"0x1bda524d814243905d395a50456796a5e08cb87e4d72eb434146a5081a1431a5"; // schema on Optimism Goerli
                        const tx = await eas.attest({
                            schema: schemaUID,
                            data: {
                                recipient: "0xbD2245353f27CA2F1915443d922eD4a8d25c45a6",
                                expirationTime: 0,
                                revocable: false,
                                data: encodedData,
                            },
                        });

                        console.log("TX test passed: ",tx); // Transaction has been created
                        const newAttestationUID = await tx.wait();

                        // const newAttestationUID = 1; //temporary
                        console.log("New attestation UID:", newAttestationUID);
                        setAttestationUID(newAttestationUID);
                        getRank(newAttestationUID);

                    } else {
                        console.log("createAttestation Error: invalid smart contracts array input");
                        alert("Invalid smart contract(s) address");
                    }
                } else console.log("Invalid project name");
            } else console.log("Checkbox is false");
        } catch (error) {
            console.log("createAttestation Error: ", error);
        }
    }

    async function getRank(uid) {
        try {
            const attestation = await eas.getAttestation(uid);
            const schemaEncoder = new SchemaEncoder("string projectName, address[] smartContracts");
            const decodedData = schemaEncoder.decodeData(attestation.data);
            const contractArray = decodedData[1];
            // Get through each contract one by one (for loop)
            // Get data for it using Covalent or other service
            // Save this data somewhere
            // Get all that data and put it into some formula to calculate the impact rank

            for(let i = 0; i < contractArray.length; i++) {
                // START HERE!!!
            }

            setProjectRank(1);
            setIsLoadingImpact(false);
        } catch (error) {
            console.log("getRank Error: ", error);
        }
    }

    return (
        <div class="bg-[#050401]">
            <Navbar />
                <div className={`overflow-x-hidden overflow-y-auto ${isLoading ? '' : 'hidden'}`} id="staticModal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div
                        role="status"
                        id="status"
                        tabIndex="-1"
                        className={`overflow-x-hidden overflow-y-auto ${isLoadingImpact ? '' : 'hidden'}`}
                    >
                        <p class="text-base text-gray-900 dark:text-white">Your attestation UID is: {attestationUID}</p>
                        <p class="text-base text-gray-900 dark:text-white">Calculating the impact rank... This will take some time.</p>
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
                    <div className={`overflow-x-hidden overflow-y-auto ${!isLoadingImpact ? '' : 'hidden'}`}>
                        <p class="text-base text-gray-900 dark:text-white">Your project impact rank is: {projectRank}</p>
                        <p class="text-base text-gray-900 dark:text-white">Your project is now displayed on the dashboard.</p>
                    </div>
                </div>
                <div className={`overflow-x-hidden overflow-y-auto ${!isLoading ? '' : 'hidden'}`}>
                    <form>
                        <div class="mb-6">
                            <label for="default-input" class="block mb-2 text-sm font-medium text-[#fffaff] dark:text-[#fffaff]">Project name</label>
                            <input
                                type="text"
                                id="default-input"
                                class="bg-[#303036] text-gray-900 text-sm rounded-lg focus:ring-[#30bced] focus:border-[#30bced] block w-full p-2.5 dark:bg-[#303036] dark:border-[#30bced] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#30bced] dark:focus:border-[#30bced]"
                                value={name}
                                onChange={onChangeName}
                            />
                        </div>
                        <div class="mb-6">
                            <label for="large-input" class="block mb-2 text-sm font-medium text-[#fffaff] dark:text-[#fffaff]">Enter all of the project's smart contract addresses separated by comma (,)</label>
                            <input
                                type="text"
                                id="large-input"
                                class="block w-full p-4 text-gray-900 rounded-lg bg-[#303036] sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-[#303036] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={contracts}
                                onChange={onChangeContracts}
                            />
                        </div>
                        <div class="flex items-start mb-6">
                            <div class="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                value={checkbox}
                                onChange={onChangeCheckbox}
                                class="w-4 h-4 border border-[#303036] rounded bg-[#fffaff] focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required
                            />
                            </div>
                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-[#fffaff]">I understood how this <a href="#" class="text-[#30bced] hover:underline dark:text-[#30bced]">works</a>.</label>
                        </div>
                        {/* Change type to "button" if want to see tests on console */}
                        <div>
                        {/* Step 4: Update JSX based on the isLoading state */}
                        <button
                            type="button"
                            data-modal-toggle="status"
                            className={`text-white bg-[#30bced] hover:bg-[#30bced] focus:ring-4 focus:outline-none focus:ring-[#30bced] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#30bced] dark:hover:bg-[#30bced] dark:focus:ring-[#30bced] ${isLoading ? 'hidden' : ''}`}
                            onClick={createAttestation}
                        >
                            Submit
                        </button>
                        <div
                            role="status"
                            id="status"
                            tabIndex="-1"
                            className={`overflow-x-hidden overflow-y-auto ${isLoading ? '' : 'hidden'}`}
                        >
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
    </div>
                    </form>

                </div>
            <Footer />
        </div>
    );
}

export default Attestation;
