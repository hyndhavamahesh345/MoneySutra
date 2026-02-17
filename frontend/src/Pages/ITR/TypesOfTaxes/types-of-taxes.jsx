import React from "react";
import { Button } from "@/components/ui/button"; // Assuming shadcn Button component
import data from "./tables/types-of-taxes.json"; // Import JSON data
import TaxBar from "../TaxBar";
function TypesOfTaxes() {
  return (
    <><TaxBar/>
    <section className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Blog Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Dollar_sign_in_circle_cleaned_%28PD_version%29.green.svg"
            alt="moneymitra"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg font-semibold">moneymitra</span>
        </div>
        <div className="text-sm text-gray-500">12 July, 2023</div>
      </div>
      <hr className="my-4 border-gray-200" />

      {/* Blog Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Types Of Taxes</h1>
      <hr className="my-4 border-gray-200" />

      {/* Blog Content */}
      <div className="space-y-6">
        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  {data[0].type}
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  {data[0].description}
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  {data[0].keyFeatures}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.slice(1).map((taxData) => (
                <tr key={taxData.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {taxData.type}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {taxData.description}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {taxData.keyFeatures}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Conclusion Paragraph */}
        <div className="text-gray-700">
          Each of these taxes has its unique characteristics, objectives, and
          administrative procedures. They collectively contribute to the
          government's revenue and play a critical role in India's fiscal system
          and economic policies.
        </div>
      </div>

      {/* Blog Footer */}
      <hr className="my-6 border-gray-200" />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Dollar_sign_in_circle_cleaned_%28PD_version%29.green.svg"
            alt="moneymitra"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg font-semibold">moneymitra</span>
        </div>
        <Button variant="outline">Next</Button>
      </div>
    </section>
    </>
  );
}

export default TypesOfTaxes;