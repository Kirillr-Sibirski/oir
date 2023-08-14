import ".././index.css";
import Footer from "../Navigation/Footer.js";
import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { useParams } from 'react-router-dom';
import { getSigner } from '../utils/connectWallet.js';
import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import { ISuccessResult } from "@worldcoin/idkit";
import { VerifyReply } from "./api/verify";
import { addValidation } from '../utils/polybase.js';

interface ISuccessResultWithHash extends ISuccessResult {
    nullifier_hash: string;
}

function Validation(): JSX.Element {
    const [validation, setValidation] = useState<boolean>(true);
    const [isLoadingAttestation, setIsLoadingAttestation] = useState<boolean>(false);
    const [isLoadingWorldcoin, setIsLoadingWorldcoin] = useState<boolean>(false);
    const [attestationUID, setAttestationUID] = useState<string>("");
    const [attestationLoaded, setAttestationLoaded] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>(); // Assuming useParams takes a generic type
    console.log('Received projectUID: ', id)

    const EASContractAddress = "0x4200000000000000000000000000000000000021"; // Optimism Goerli

    const eas = new EAS(EASContractAddress); // Initialize the sdk with the address of the EAS Schema contract address

    function createValidation() {
        console.log("CreateValidation called");
        setIsLoadingWorldcoin(true);
    }

	const onSuccess = (result: ISuccessResultWithHash) => {
		// This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
		console.log("onSuccess called");
        createAttestation();
        setIsLoadingWorldcoin(false);
        window.alert("Successfully verified with World ID! Your nullifier hash is: " + result.nullifier_hash);
	};

	const handleProof = async (result: ISuccessResultWithHash) => {
		console.log("Proof received from IDKit:\n", JSON.stringify(result)); // Log the proof from IDKit to the console for visibility
		const reqBody = {
			merkle_root: result.merkle_root,
			nullifier_hash: result.nullifier_hash,
			proof: result.proof,
			credential_type: result.credential_type,
			action: process.env.REACT_APP_WLD_ACTION_NAME,
			signal: "",
		};
		console.log("Sending proof to backend for verification:\n", JSON.stringify(reqBody)) // Log the proof being sent to our backend for visibility
		const res: Response = await fetch("/api/verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reqBody),
		})
        console.log("Res: ", res);
		const data: VerifyReply = await res.json()
		if (res.status == 200) {
			console.log("Successful response from backend:\n", data); // Log the response from our backend for visibility
		} else {
			throw new Error(`Error code ${res.status} (${data.code}): ${data.detail}` ?? "Unknown error."); // Throw an error if verification fails
		}
	};

    async function createAttestation() { // call once worldcoin is verified
        console.log("createAttestation called")
        try {
            setIsLoadingWorldcoin(false);
            setIsLoadingAttestation(true);
            eas.connect(getSigner());
            // Initialize SchemaEncoder with the schema string
            const schemaEncoder = new SchemaEncoder("bool Validate");
            console.log("Schema encoder test passed: ",schemaEncoder);

            const encodedData = schemaEncoder.encodeData([
            { name: "Validate", value: validation, type: "bool"},
            ]);

            const schemaUID = "0xf6858a71cbe54522f87bee028dd6be165c464135628c8a0f565b8dbf8c2c62fe"; // Optimism Goerli
            const tx = await eas.attest({
                schema: schemaUID,
                data: {
                    recipient: "0xbD2245353f27CA2F1915443d922eD4a8d25c45a6",
                    expirationTime: 0,
                    revocable: false,
                    refUID: id,
                    data: encodedData,
                },
            });

            console.log("TX test passed: ",tx); // Transaction has been created
            const newAttestationUID = await tx.wait();

            addValidation(id, newAttestationUID); // Add a new two-way attestation to Polybase db
            console.log("New attestation UID:", newAttestationUID);
            setAttestationUID(newAttestationUID);
            setAttestationLoaded(true);
        } catch (error) {
            console.log("worldcoinValidation Error: ", error);
        }
    }

    return (
        <div className="bg-[#050401] h-screen">
        <div className={`space-y-4 overflow-x-hidden overflow-y-auto`}>
            <form>
            <div className={`inline-block`}>
                <button 
                    className={`mb-0 text-white bg-[#30bced] hover:bg-[#30bced] focus:ring-4 focus:outline-none focus:ring-[#30bced] font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#30bced] dark:hover:bg-[#30bced] dark:focus:ring-[#30bced]`}
                    onClick={() => setValidation(true)}
                >     
                    Validate
                </button>
                <button 
                    className={`mb-0 text-white bg-[#fc5130] hover:bg-[#fc5130] focus:ring-4 focus:outline-none focus:ring-[#fc5130] font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#fc5130] dark:hover:bg-[#fc5130] dark:focus:ring-[#fc5130]`}
                    onClick={() => setValidation(false)}
                >
                    Invalidate
                </button>

            </div>
            <div className={`flex items-start mb-6 overflow-x-hidden overflow-y-auto ${attestationLoaded ? '' : 'hidden'}`}>
                <p className="text-base text-[#fffaff] dark:text-white">We have recorder your action. Your attestation UID is: {attestationUID}</p>
            </div>
            <div
                role="status"
                id="status"
                tabIndex={-1}
                className={`overflow-x-hidden overflow-y-auto ${!isLoadingAttestation? '' : 'hidden'}`}
            >
                <button
                    type="button"
                    data-modal-toggle="status"
                    className={`text-white bg-[#30bced] hover:bg-[#30bced] focus:ring-4 focus:outline-none focus:ring-[#30bced] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#30bced] dark:hover:bg-[#30bced] dark:focus:ring-[#30bced]}`}
                    onClick={createValidation}
                >
                    Submit
                </button>
            </div>
            <div className={`overflow-x-hidden overflow-y-auto ${isLoadingWorldcoin ? '' : 'hidden'}`}>
            <IDKitWidget
                app_id="app_4218684bc0d4cc097377bc6f54a3fd82" // obtained from the Developer Portal
                action="validate-attestation" // this is your action name from the Developer Portal
                onSuccess={onSuccess} // callback when the modal is closed
                handleVerify={handleProof}
                credential_types={[CredentialType.Phone]} // optional, defaults to ['orb']
                enableTelemetry // optional, defaults to false
            >
                {({ open }) => <button 
                    type="button"
                    data-modal-toggle="status"
                    className={`text-white bg-[#30bced] hover:bg-[#30bced] focus:ring-4 focus:outline-none focus:ring-[#30bced] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#30bced] dark:hover:bg-[#30bced] dark:focus:ring-[#30bced]}`}
                    onClick={open}>Verify with World ID</button>}
            </IDKitWidget>
            </div>
            <div
                role="status"
                id="status"
                tabIndex={-1}
                className={`overflow-x-hidden overflow-y-auto ${isLoadingAttestation && !attestationLoaded && !isLoadingWorldcoin ? '' : 'hidden'}`}
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
            </form>
        </div>
        <Footer />
    </div>
    );
}

export default Validation;
