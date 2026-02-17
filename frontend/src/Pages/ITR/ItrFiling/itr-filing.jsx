import React from "react";
import { Button } from "@/components/ui/button"; // Assuming shadcn Button component
import TaxBar from "../TaxBar";
function ItrFiling() {
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
      <h1 className="text-3xl font-bold text-center mb-6">ITR Filing</h1>
      <hr className="my-4 border-gray-200" />

      {/* Blog Content */}
      <div className="space-y-6">
        {/* Section 1: Important Documents for ITR Filing */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            What are the important documents required for filing ITRs?
          </h2>
          <p className="text-gray-700">
            Income Tax Return (ITR) documents differ as per the earning sources
            of the tax filer. But, certain documents are mandatory for every
            taxpayer, irrespective of income sources. Here is a list of such
            common ITR documents that are required to file ITR in FY 2022-23 (AY
            2023-24).
          </p>
          <div className="mt-4">
            <img
              src="https://via.placeholder.com/800x400" // Replace with your image path
              alt="Documents for filing ITR"
              className="w-full rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Documents for filing ITR
            </p>
          </div>
        </div>

        {/* Section 2: PAN Card */}
        <div>
          <h3 className="text-lg font-semibold mb-2">1. PAN Card</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              This is the first and foremost prerequisite if you are filing an
              income tax return. PAN is also required to deduct TDS and should
              be linked with your bank account for direct credit of income tax
              refund (if any). It is issued by the Income Tax Department, and a
              salaried employee can find the PAN number either on a PAN card,
              Form 26AS, Form 16, Form 12BB, etc.
            </li>
            <li>
              However, as per the recent amendment by the Govt, taxpayers can
              also file the ITR with their Aadhaar number instead of their PAN
              number.
            </li>
          </ul>
        </div>

        {/* Section 3: Aadhaar Card */}
        <div>
          <h3 className="text-lg font-semibold mb-2">2. Aadhaar Card</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              According to Section 139AA of the Income Tax Act, individuals
              need to provide his/her Aadhaar card details while filing the
              returns.
            </li>
            <li>
              If you do not have your Aadhaar card but have applied for the
              same, you must provide the enrolment ID in your IT returns.
            </li>
            <li>
              Linking PAN and Aadhar helps in verifying your income tax return
              online through an OTP.
            </li>
            <li>
              UIDAI issues Aadhar card. In case you have lost it or couldn’t
              find your Aadhaar card, then you can also download it online.
            </li>
          </ul>
        </div>

        {/* Section 4: Form 16 */}
        <div>
          <h3 className="text-lg font-semibold mb-2">3. Form 16</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              This form consists of the details of the employee's salary and
              the amount of TDS deducted from the salary. Form 16 consists of
              two different parts, Part A and Part B. Part-A contains the
              details of the amount of tax deducted by the employer during the
              financial year, along with the PAN and TAN details of the
              employer. The Part B of the form consists of TDS calculations
              like gross salary breakup, exempt allowances, perquisites, etc.
            </li>
            <li>
              Please note that Form 16 is issued by the employer. It is a
              vital document for filing ITR by a salaried individual. If you
              do not have Form 16, know how to file your ITR without Form 16.
            </li>
          </ul>
        </div>

        {/* Section 5: Form-16A/ Form-16B/ Form-16C */}
        <div>
          <h3 className="text-lg font-semibold mb-2">
            4. Form-16A/ Form-16B/ Form-16C
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Form-16A is issued for TDS deducted on payments other than
              salaries, such as income from recurring deposits, fixed
              deposits, etc. If a person sells his property, then Form-16B is
              issued. It has details about TDS deducted from the amount paid
              to the seller. Form 16C is a TDS certificate that reflects the
              TDS deducted on rent @5% by an individual or HUF under section
              194IB.
            </li>
            <li>
              Form 16A is issued by deductors like banks, contractors, etc.
              Form 16B, on the other hand, is issued by the buyer. Further, a
              person deducting TDS on rent is required to furnish Form 16C to
              the payee within a period of 15 days from the date of furnishing
              the Challan cum statement in Form 26QC.
            </li>
            <li>
              The details of TDS can alternatively be fetched from your Form
              26AS.
            </li>
          </ul>
        </div>

        {/* Section 6: Bank Account Details */}
        <div>
          <h3 className="text-lg font-semibold mb-2">5. Bank Account Details</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Disclosures of all active bank accounts are mandatory in the
              ITR. Bank account details like your bank name, account number,
              IFSC, and number of accounts you hold must be quoted in the
              income return.
            </li>
            <li>
              Also, one account shall be selected as primary to assist the
              Income Tax Department in refunding your tax refund by electronic
              transfer to such account.
            </li>
            <li>
              Bank details are used to check your income disclosures,
              high-volume transactions, etc. These details can be easily found
              in the bank passbooks, cheque book, statements, net banking
              account’s etc.
            </li>
          </ul>
        </div>

        {/* Section 7: Bank Statement/ Passbook */}
        <div>
          <h3 className="text-lg font-semibold mb-2">
            6. Bank Statement/ Passbook
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Bank statements show the information of the interest earned on a
              savings account, interest income on fixed deposits etc, during a
              financial year, these information are required while filing ITR.
            </li>
          </ul>
        </div>

        {/* Section 8: Form 26AS and AIS/TIS */}
        <div>
          <h3 className="text-lg font-semibold mb-2">7. Form 26AS and AIS/TIS</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              It is an annual tax statement like a tax passbook that has
              details of all the taxes you have deposited against your PAN.
              These include:
              <ul className="list-disc list-inside pl-6 mt-2">
                <li>TDS deducted by the bank</li>
                <li>TDS deducted by the employer</li>
                <li>
                  TDS deducted by other organizations from the payments done
                  by you
                </li>
              </ul>
            </li>
            <li>
              The individual should ensure that all the taxes deducted in the
              financial year are reflected against the PAN in Form-26AS. In
              case of a mismatch, you will not be able to claim the tax credit
              for the TDS deduction. Therefore, the same should be rectified
              by getting in touch with the deductor.
            </li>
            <li>
              You can view Form 26AS for the relevant Assessment Year by
              signing into your account on the Income Tax India e-filing
              website. Recently Annual Information Statement (AIS) app has
              been launched for the taxpayers where you can access all
              information related to TDS, TCS, interest etc, on one app.
            </li>
            <li>
              AIS: Annual Information Statement (AIS) is a comprehensive view
              of information for a taxpayer displayed in Form 26AS. Taxpayer
              can provide feedback on information displayed in AIS. AIS shows
              both reported value and modified value (i.e. value after
              considering taxpayer feedback) under each section (i.e. TDS,
              SFT, Other information).
            </li>
            <li>
              TIS: Taxpayer Information Summary (TIS) is an information
              category-wise aggregated information summary for a taxpayer. It
              shows processed value (i.e. value generated after deduplication
              of information based on predefined rules) and derived value
              (i.e. value derived after considering the taxpayer feedback and
              processed value) under each information category (e.g. Salary,
              Interest, Dividend etc.). The derived information in TIS will be
              used for prefilling of return, if applicable.
            </li>
          </ul>
        </div>

        {/* Section 9: Home Loan Statement */}
        <div>
          <h3 className="text-lg font-semibold mb-2">8. Home Loan Statement</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              The individuals are provided with the details like principal and
              interest that they repay in their loan statement. This breakup
              information is needed as proof and to provide information while
              filing your income tax returns.
            </li>
            <li>
              If the individual has taken a home loan from financial
              institutions like banks etc., then he/she should collect the
              statement for the last financial year.
            </li>
          </ul>
        </div>

        {/* Section 10: Tax Saving Instruments */}
        <div>
          <h3 className="text-lg font-semibold mb-2">
            9. Tax Saving Instruments
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              If you have invested in any tax-saving schemes like tax-saving
              FDs, ELSS, investment receipts, etc., you should have the
              relevant documents ready when you file your taxes.
            </li>
            <li>
              If you have sold shares, securities, or property, it will result
              in a capital gain or losses. For the same, you need to have
              documents like broker statements, property sale deeds, etc.
            </li>
          </ul>
        </div>

        {/* Section 11: Rental Income */}
        <div>
          <h3 className="text-lg font-semibold mb-2">10. Rental Income</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              If you are earning an income from your house or property, it
              should be reported while filing ITR. Also, in case you are
              paying rent, don't forget to collect receipts from the landlord.
            </li>
            <li>
              However, these documents are not required to be given with the
              ITR but should be kept safe to be submitted to your employer or
              Income Tax Department in case required in the future.
            </li>
          </ul>
        </div>

        {/* Section 12: Foreign Income */}
        <div>
          <h3 className="text-lg font-semibold mb-2">11. Foreign Income</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              The documents for any income earned in or from a foreign country
              during a job deployment or for part of the year should be
              furnished with your tax consultant to help you claim the benefit
              of tax credits and DTAA.
            </li>
            <li>
              The documents for any foreign income need to be arranged with
              the employer or contractor.
            </li>
          </ul>
        </div>

        {/* Section 13: Dividend Income */}
        <div>
          <h3 className="text-lg font-semibold mb-2">12. Dividend Income</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              If you have invested in shares or mutual funds and have earned
              dividend income on the same, it should be reported while filing
              your income tax return.
            </li>
            <li>
              Details of dividends earned during the financial year can be
              taken from your broker statement or Demat account sum.
            </li>
          </ul>
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

export default ItrFiling;