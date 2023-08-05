import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum)

export const Connect = async function() {
        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);
}

export const getSigner = function() {
    return provider.getSigner()
}
