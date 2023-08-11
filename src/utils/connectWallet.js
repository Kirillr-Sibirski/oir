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

export const Network = async function(network) {
    if (window.ethereum) {
        let params;

        switch (network) {
            case 'Optimism':
                params = {
                    chainId: '0x1a4',
                    rpcUrls: ['https://optimism-goerli.publicnode.com'],
                    chainName: 'Optimism Goerli Testnet',
                    nativeCurrency: {
                        name: 'ETH',
                        symbol: 'ETH',
                        decimals: 18
                    },
                    blockExplorerUrls: ['https://goerli-optimism.etherscan.io/']
                };
                break;
            case 'Base':
                params = {
                    chainId: '0x14a33',
                    rpcUrls: ['https://goerli.base.org'],
                    chainName: 'Base Goerli Testnet',
                    nativeCurrency: {
                        name: 'ETH',
                        symbol: 'ETH',
                        decimals: 18
                    },
                    blockExplorerUrls: ['https://goerli.basescan.org/']
                };
                break;
            default:
                // Default to Optimism
                params = {
                    chainId: '0x1a4',
                    rpcUrls: ['https://optimism-goerli.publicnode.com'],
                    chainName: 'Optimism Goerli Testnet',
                    nativeCurrency: {
                        name: 'ETH',
                        symbol: 'ETH',
                        decimals: 18
                    },
                    blockExplorerUrls: ['https://goerli-optimism.etherscan.io/']
                };
                break;
        }

        window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [params]
        });
    } else {
        alert('Connect wallet!');
    }
};



export const getSigner = function() {
    return provider.getSigner()
}
