import React from "react";
import { Button } from "@/components/ui/button"; // Assuming shadcn Button component
import TaxBar from "../TaxBar";
function SaveTaxes() {
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
        Simple Ways to Save Money in India Through Tax Planning
      </h1>
      <hr className="my-4 border-gray-200" />

      {/* Blog Content */}
      <div className="space-y-6">
        {/* Section 1: Investing in Tax-Saving Instruments */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Investing in Tax-Saving Instruments
          </h2>
          <p className="text-gray-700">
            India offers several tax-saving investment options under Section 80C
            of the Income Tax Act. These investments not only help you save
            taxes but also provide avenues for wealth creation over time. Here
            are some key tax-saving instruments:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
            <li>
              <strong>Public Provident Fund (PPF):</strong> PPF is a long-term
              savings scheme that offers tax benefits. Contributions to PPF are
              eligible for a deduction of up to Rs. 1.5 lakh per year under
              Section 80C. The interest earned and the final maturity amount are
              tax-free.
            </li>
            <li>
              <strong>Employee Provident Fund (EPF):</strong> EPF is a mandatory
              retirement savings scheme for salaried employees. Both your and
              your employer's contributions to EPF are eligible for tax benefits
              under Section 80C.
            </li>
            <li>
              <strong>National Savings Certificate (NSC):</strong> NSC is a
              fixed-income investment with a lock-in period of 5 years. The
              interest earned is taxable, but the initial investment qualifies
              for a Section 80C deduction.
            </li>
            <li>
              <strong>Tax-Saving Fixed Deposits:</strong> Many banks offer
              tax-saving fixed deposits with a lock-in period of 5 years. The
              interest earned on these deposits is taxable, but the principal
              amount is eligible for a Section 80C deduction.
            </li>
          </ul>
        </div>

        {/* Section 2: Utilize Tax Deductions and Exemptions */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Utilize Tax Deductions and Exemptions
          </h2>
          <div className="mt-4">
            <img
              src="https://via.placeholder.com/800x400" // Replace with your image path
              alt="Deductions and Exemptions"
              className="w-full rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Deductions and Exemptions
            </p>
          </div>
          <p className="text-gray-700 mt-4">
            In addition to Section 80C, there are several other sections under
            the Income Tax Act that offer deductions and exemptions. Here are a
            few examples:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
            <li>
              <strong>Home Loan Interest (Section 24):</strong> If you have a
              home loan, you can claim deductions on the interest paid on the
              loan under Section 24. The maximum deduction limit is Rs. 2 lakh
              per year for a self-occupied property.
            </li>
            <li>
              <strong>Health Insurance Premium (Section 80D):</strong> Premiums
              paid for health insurance policies for yourself, your spouse,
              children, and parents are eligible for deductions under Section
              80D. The maximum deduction limit varies depending on the age of
              the insured individuals and the type of policy.
            </li>
            <li>
              <strong>Education Loan Interest (Section 80E):</strong> If you have
              taken an education loan for higher studies, you can claim a
              deduction on the interest paid under Section 80E. This deduction
              is available for a maximum of 8 years.
            </li>
            <li>
              <strong>House Rent Allowance (HRA):</strong> If you are living in a
              rented house and receive HRA as part of your salary, you can claim
              exemptions under Section 10(13A) on the HRA received. The amount
              of exemption is calculated based on certain conditions.
            </li>
            <li>
              <strong>Long-Term Capital Gains (LTCG):</strong> If you invest in
              specified long-term assets like equity shares and mutual funds,
              you can enjoy tax exemptions on LTCG under Section 10(38) if
              certain conditions are met.
            </li>
          </ul>
        </div>

        {/* Section 3: Plan for Retirement with NPS */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Plan for Retirement with NPS
          </h2>
          <p className="text-gray-700">
            The National Pension System (NPS) is a government-sponsored
            retirement savings scheme that offers tax benefits:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
            <li>
              <strong>Section 80CCD(1):</strong> You can claim deductions of up
              to 10% of your salary (for salaried individuals) or 20% of your
              gross income (for self-employed individuals) for contributions
              made to NPS, subject to a maximum of Rs. 1.5 lakh under Section
              80CCD(1).
            </li>
            <li>
              <strong>Section 80CCD(2):</strong> If your employer contributes to
              your NPS account, the employer's contribution of up to 10% of your
              salary is eligible for a separate deduction under Section
              80CCD(2).
            </li>
          </ul>
          <p className="text-gray-700 mt-4">
            NPS provides an opportunity to build a retirement corpus while
            enjoying tax benefits. It allows you to choose between equity
            (higher risk) and debt (lower risk) investments based on your risk
            tolerance and retirement goals.
          </p>
          <p className="text-gray-700 mt-2">
            Keep in mind that tax laws can change, so it's essential to stay
            updated and consider consulting a tax advisor or financial planner
            to create a customized tax-saving plan that aligns with your
            financial goals and takes advantage of the latest tax-saving
            opportunities in India.
          </p>
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

export default SaveTaxes;