import React, { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function NFT() {
    const [nftSales, setNftSales] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            async function fetchNftSales() {
                try {
                    const response = await alchemy.nft.getNftSales();
                    setNftSales(response.nftSales.slice(0, 10));
                } catch (error) {
                    console.error("Error fetching NFT sales data: ", error);
                }
            }

            fetchNftSales();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="border-l-4 border-indigo-600 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-lg">
            <div className="grid grid-cols-4 gap-4 mb-2 border-b border-indigo-300 pb-2">
                <div className="font-bold text-indigo-900 dark:text-indigo-300 truncate">Seller Address</div>
                <div className="font-bold text-indigo-900 dark:text-indigo-300 truncate">Contract Address</div>
                <div className="font-bold text-indigo-900 dark:text-indigo-300 truncate">Buyer Address</div>
                <div className="font-bold text-indigo-900 dark:text-indigo-300 truncate">Token ID</div>
            </div>

            {nftSales.map((sale, index) => (
                <div
                    key={index}
                    className="grid grid-cols-4 gap-4 mb-2 p-2 bg-indigo-50 dark:bg-gray-700 rounded"
                >
                    <div className="truncate font-mono text-indigo-800 dark:text-indigo-200">{sale.sellerAddress}</div>
                    <div className="truncate font-mono text-indigo-800 dark:text-indigo-200">{sale.contractAddress}</div>
                    <div className="truncate font-mono text-indigo-800 dark:text-indigo-200">{sale.buyerAddress}</div>
                    <div className="truncate font-mono text-indigo-800 dark:text-indigo-200">{sale.tokenId}</div>
                </div>
            ))}
        </div>
    );
}

export default NFT;
