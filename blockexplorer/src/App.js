import React from "react";
import Header from "./Assets/components/Header";
import Block from "./Assets/components/Block";
import Transaction from "./Assets/components/Transaction";
import NFTs from "./Assets/components/NFTs";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <section className="border-4 border-indigo-600 rounded-lg p-6 shadow-lg">
          <h1 className="text-center text-3xl font-bold border-t-4 border-l-4 border-r-4 border-indigo-600 py-2 mb-6">
            Block Box
          </h1>
          <Block />
        </section>

        <section className="flex flex-col md:flex-row border-4 border-indigo-600 rounded-lg shadow-lg overflow-hidden">
          <div className="md:w-1/2 border-r-0 md:border-r-4 border-indigo-600 p-6">
            <h2 className="text-center text-2xl font-semibold mb-4">Transaction Box</h2>
            <Transaction />
          </div>

          <div className="md:w-1/2 p-6">
            <h2 className="text-center text-2xl font-semibold mb-4">NFTs Box</h2>
            <NFTs />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
