import React, { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Block() {
    const [blockNumber, setBlockNumber] = useState(null);
    const [blocks, setBlocks] = useState([]);

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            async function fetchLastFiveBlocks() {
                try {
                    const latestBlockNumber = await alchemy.core.getBlockNumber();
                    const blocks = [];

                    for (let i = 0; i < 5; i++) {
                        const block = await alchemy.core.getBlock(latestBlockNumber - i);
                        blocks.push(block);
                        await delay(500); // wait 500ms before next request
                    }

                    setBlocks(blocks);
                } catch (error) {
                    console.error("Error fetching blocks:", error);
                }
            }

            fetchLastFiveBlocks();
        }, 50000); // runs every 60 seconds

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="border-4 border-indigo-600 rounded-lg mt-4 p-4 bg-white dark:bg-gray-800 shadow-lg">
            <div className="grid grid-cols-3 gap-4 mb-2 border-b border-indigo-300 pb-2">
                <div className="font-bold text-indigo-900 dark:text-indigo-300">Block Number</div>
                <div className="font-bold text-indigo-900 dark:text-indigo-300">Miner</div>
                <div className="font-bold text-indigo-900 dark:text-indigo-300">Gas Used</div>
            </div>
            {blocks.map((block) => (
                <div
                    key={block.number}
                    className="grid grid-cols-3 gap-4 mb-2 bg-indigo-50 dark:bg-gray-700 rounded p-2"
                >
                    <div className="truncate font-mono text-indigo-800 dark:text-indigo-200">{block.number}</div>
                    <div className="truncate font-mono text-indigo-800 dark:text-indigo-200">{block.miner}</div>
                    <div className="truncate font-mono text-indigo-800 dark:text-indigo-200">{parseInt(block.gasUsed)}</div>
                </div>
            ))}
        </div>
    );
}

export default Block;
