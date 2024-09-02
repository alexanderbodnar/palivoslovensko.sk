// src/components/GasPricingTable.jsx

import React from "react";

export default function YearlyPricingTable() {
  // Example data for monthly gas pricing
  const gasPricingData = [
    { month: "January", price: "$2.50" },
    { month: "February", price: "$2.55" },
    { month: "March", price: "$2.60" },
    { month: "April", price: "$2.45" },
    { month: "May", price: "$2.70" },
    { month: "June", price: "$2.80" },
    { month: "July", price: "$2.90" },
    { month: "August", price: "$2.85" },
    { month: "September", price: "$2.75" },
    { month: "October", price: "$2.65" },
    { month: "November", price: "$2.60" },
    { month: "December", price: "$2.55" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Monthly Gas Pricing</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border-b">Month</th>
            <th className="py-2 px-4 border-b">Price</th>
          </tr>
        </thead>
        <tbody>
          {gasPricingData.map((data, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{data.month}</td>
              <td className="py-2 px-4 border-b">{data.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
