import React, { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Transaction() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            async function fetchTransactions() {
                try {
                    const latestBlockNumber = await alchemy.core.getBlockNumber();
                    const latestBlock = await alchemy.core.getBlockWithTransactions(latestBlockNumber);
                    const latestTransactions = latestBlock.transactions.slice(0, 10);
                    setTransactions(latestTransactions);
                } catch (error) {
                    console.error("Error fetching transactions: ", error);
                }
            }

            fetchTransactions();
        }, 24000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="border-r-4 border-indigo-600 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-lg">
            <div className="grid grid-cols-4 gap-4 mb-2 border-b border-indigo-300 pb-2">
                <div className="font-bold text-indigo-900 dark:text-indigo-300 truncate">Transaction Hash</div>
                <div className="font-bold text-indigo-900 dark:text-indigo-300 truncate">From</div>
                <div className="font-bold text-indigo-900 dark:text-indigo-300 truncate">To</div>
                <div className="font-bold text-indigo-900 dark:text-indigo-300 truncate">Value</div>
            </div>

            {transactions.map((tx, index) => (
                <div
                    key={index}
                    className="grid grid-cols-4 gap-4 mb-2 p-2 bg-indigo-50 dark:bg-gray-700 rounded"
                >
                    <div className="truncate font-mono text-indigo-800 dark:text-indigo-200">{tx.hash}</div>
                    <div className="truncate font-mono text-indigo-800 dark:text-indigo-200">{tx.from}</div>
                    <div className="truncate font-mono text-indigo-800 dark:text-indigo-200">{tx.to}</div>
                    <div className="truncate font-mono text-indigo-800 dark:text-indigo-200">{tx.value.toString()}</div>
                </div>
            ))}
        </div>
    );
}

export default Transaction;
