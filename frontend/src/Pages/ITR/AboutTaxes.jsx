import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TaxBar from "../ITR/TaxBar";

function AboutTaxes() {

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
      <h1 className="text-3xl font-bold text-center mb-6">
        A Beginner's Guide to Taxes
      </h1>
      <hr className="my-4 border-gray-200" />

      {/* Blog Content */}
      <div className="space-y-6">
        {/* Section 1: What are taxes? */}
        <div>
          <h2 className="text-xl font-semibold mb-2">What are taxes?</h2>
          <p className="text-gray-700">
            Taxes are an integral part of our lives, shaping economies and
            funding public services. But for many, they remain a daunting and
            often confusing subject. Fear not! We're here to break it down for
            you. In this introductory post, we'll cover the basics. First and
            foremost, what are taxes? Taxes are compulsory financial
            contributions imposed by governments on individuals and businesses
            to fund public expenditures. These expenditures can range from
            infrastructure development to social welfare programs, education,
            healthcare, and more.
          </p>
        </div>

        {/* Section 2: Types of Taxes */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Types of Taxes</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              <strong>Income Tax:</strong> Perhaps the most familiar form of
              taxation, income tax is levied on the earnings of individuals and
              businesses. The amount you pay typically depends on your income
              level, with different tax brackets applying to different income
              ranges.
            </li>
            <li>
              <strong>Sales Tax:</strong> Also known as consumption tax, sales
              tax is imposed on the sale of goods and services. It's usually a
              percentage of the purchase price and is collected by the seller
              at the point of sale.
            </li>
            <li>
              <strong>Property Tax:</strong> Property tax is based on the value
              of real estate owned by individuals or businesses. It's a
              significant source of revenue for local governments and is used to
              fund public services like schools and infrastructure.
            </li>
            <li>
              <strong>Corporate Tax:</strong> This tax is levied on the profits
              of corporations. The rate varies depending on the country and can
              have a significant impact on a company's bottom line.
            </li>
            <li>
              <strong>Value Added Tax (VAT):</strong> Common in many countries,
              VAT is a type of consumption tax that's levied on the value added
              at each stage of production or distribution of goods and services.
            </li>
          </ol>
          <p className="mt-4 text-gray-700">
            Understanding your tax obligations is crucial, but it's also
            essential to know your rights and available deductions and credits.
            Deductions and credits can help lower your taxable income or reduce
            the amount of tax you owe.
          </p>
        </div>

        {/* Section 3: Resources */}
        <div>
          <p className="text-gray-700 mb-4">
            Delve deeper into learning Taxes and start filing them using
            resources below:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold">What are taxes?</h4>
              <p className="text-sm text-gray-600 mt-2">
                Get a deeper understanding about taxes.
              </p>
              <Button className="mt-4 w-full" variant="outline">
                Learn More
              </Button>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold">ITR Filing</h4>
              <p className="text-sm text-gray-600 mt-2">
                Get started with filing your own ITRs.
              </p>
              <Button className="mt-4 w-full" variant="outline">
                Learn More
              </Button>
            </Card>
            <Card className="p-4 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold">Smart Savings</h4>
              <p className="text-sm text-gray-600 mt-2">
                Explore instruments to start saving big.
              </p>
              <Button className="mt-4 w-full" variant="outline">
                Learn More
              </Button>
            </Card>
          </div>
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

export default AboutTaxes;