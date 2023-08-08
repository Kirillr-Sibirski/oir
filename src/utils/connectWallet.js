import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum)

export const Connect = async function() {
        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);
        window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "0x1a4",
                rpcUrls: ["https://optimism-goerli.publicnode.com"],
                chainName: "Optimism Goerli Testnet",
                nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18
                },
                blockExplorerUrls: ["https://goerli-optimism.etherscan.io/"]
            }]
        });
}

export const getSigner = function() {
    return provider.getSigner()
}
