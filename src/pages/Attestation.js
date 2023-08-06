import ".././index.css";
import Navbar from ".././Navigation/Navbar.js";
import Footer from ".././Navigation/Footer.js";
import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { getSigner } from '.././connectWallet.js';

function Attestation() {
    const [name, setName] = React.useState("");
    const onChangeName = ({ target }) => setName(target.value);
    const [contracts, setContracts] = React.useState("");
    const onChangeContracts = ({ target }) => setContracts(target.value);
    const [checkbox, setCheckbox] = React.useState("");
    const onChangeCheckbox = ({ target }) => setCheckbox(!target.value);


    const EASContractAddress = "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84" // Optimism Goerli //"0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
    const eas = new EAS(EASContractAddress); // Initialize the sdk with the address of the EAS Schema contract address

    async function createAttestation() {
        console.log("createAttestation test passed");
        try {
            if(checkbox) {
            console.log("Checkbox test passed");
                if(typeof name === 'string' || name instanceof String) {
                    console.log("Name verification test passed");
                    eas.connect(getSigner());
                    
                    // String manipulations
                    let contractsNoSpace = contracts.replace(/ /g,''); // Delete all spaces
                    let contractsArray = contractsNoSpace.split(","); // Turn it into an array

                    console.log("Name: ", name)
                    console.log("Contracts: ", contractsArray);

                    let state = true;
                    for (let i = 0; i < contractsArray.length; i++) {
                        if(!ethers.utils.isAddress(contractsArray[i])) state = false; // Check if it a legit contract address
                    }
                    if (state) {
                        console.log("Address verification test passed");

                        // Initialize SchemaEncoder with the schema string
                        const schemaEncoder = new SchemaEncoder("string projectName, address[] smartContracts");
                        console.log("Schema encoder test passed: ",schemaEncoder);

                        const encodedData = schemaEncoder.encodeData([
                        { name: "projectName", value: name, type: "string" }, //for some reason param "value" doesn't
                        { name: "smartContracts", value: contractsArray, type: "address[]" },
                        ]);
                        console.log("encodedData test passed: ",encodedData)

                        const schemaUID = "0x1bda524d814243905d395a50456796a5e08cb87e4d72eb434146a5081a1431a5"; // schema on Optimism Goerli
                        
                        const tx = await eas.attest({
                        schema: schemaUID,
                        data: {
                            recipient: "",
                            expirationTime: 0,
                            revocable: false,
                            data: encodedData,
                        },
                        });
                
                        console.log("TX test passed: ",tx); // Transaction has been created
                        const newAttestationUID = await tx.wait();
                        
                        console.log("New attestation UID:", newAttestationUID);
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
                        <button type="button" class="text-white bg-[#30bced] hover:bg-[#30bced] focus:ring-4 focus:outline-none focus:ring-[#30bced] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#30bced] dark:hover:bg-[#30bced] dark:focus:ring-[#30bced]" onClick={createAttestation}>Submit</button>
                    </form>

                </div>
            <Footer />
        </div>
    );
}

export default Attestation;