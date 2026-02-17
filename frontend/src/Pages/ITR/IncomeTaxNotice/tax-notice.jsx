import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming shadcn Button component
import TaxBar from "../TaxBar";
function TaxNotice() {
  const navigate = useNavigate();

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
      <h1 className="text-3xl font-bold text-center mb-6">Income Tax Notice</h1>
      <hr className="my-4 border-gray-200" />

      {/* Blog Content */}
      <div className="space-y-6">
        {/* Section 1: Purpose of an Income Tax Notice */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            What is the Purpose of an Income Tax Notice?
          </h2>
          <p className="text-gray-700">
            An income tax notice may be issued for the following reasons:
          </p>
          <div className="mt-4">
            <img
              src="https://via.placeholder.com/800x400" // Replace with your image path
              alt="Reasons for an Income Tax Notice"
              className="w-full rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Reasons for an Income Tax Notice
            </p>
          </div>
          <p className="text-gray-700 mt-4">
            For other reasons as the assessing officer might deem fit.
          </p>
        </div>

        {/* Section 2: Steps After Receiving an Income Tax Notice */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            What should be done after receiving an income tax notice?
          </h2>
          <p className="text-gray-700">
            When you receive an ITR notice under any of the aforementioned
            sections, the following steps should be taken:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 mt-2">
            <li>
              Read the notice thoroughly to find out why it has been sent.
            </li>
            <li>
              Check the basic details on the notice to ensure that the notice is
              meant for you. The notice should contain your correct name, PAN
              number, address, etc., to authenticate that it is sent to you.
              Also, check the assessment year mentioned in the ITR notice.
            </li>
            <li>
              Find out the discrepancy in your income tax return that caused a
              notice to be served, if any.
            </li>
            <li>
              Respond to the ITR notice within the stipulated time period to
              avoid penalties and prosecutions.
            </li>
            <li>Ensure that your response is backed by adequate information.</li>
            <li>
              Also, make sure to check the notice that you have received is
              reflected in your income tax account online.
            </li>
            <li>Take expert help.</li>
          </ol>
        </div>

        {/* Section 3: Documents Required to Reply to an Income Tax Notice */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            What documents are required to reply to an Income Tax Notice?
          </h2>
          <p className="text-gray-700">
            The type of documents required for replying to an income tax notice
            depends on the type of notice received. Here are some basic
            documents that are common to every notice:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
            <li>The Income Tax Notice copy.</li>
            <li>
              Proof of Income source such as (Part B) of Form 16, Salary
              receipts, etc.
            </li>
            <li>TDS certificates, Form 16 (Part A) Investment</li>
            <li>Proof if they are applicable.</li>
          </ul>
        </div>

        {/* Section 4: Notice under Section 142(1) */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Notice under Section 142(1)
          </h2>
          <p className="text-gray-700">
            <b>What is Section 142(1) of the Income-tax Act?</b>
            <br />
            Section 142(1) of the Income-tax Act 1961 empowers Income-tax
            authorities to issue a notice for more clarification or for further
            details about where a return has been filed or if the return has not
            been filed, then to furnish the required information in a prescribed
            manner.
          </p>
          <p className="text-gray-700 mt-2">
            <b>When is the Notice under Section 142(1) issued?</b>
            <br />
            Notice u/s 142(1) can be issued in both cases, where you file your
            income tax return u/s 139(1) and also in the case you do not file
            your income tax return u/s 139(1) and the time specified to file
            such a return has expired. However, the Assessing Officer shall only
            require the production of accounts or information relating to a
            period of three years before the previous year.
          </p>
        </div>

        {/* Section 5: Purpose of Notices */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Purpose of Notices</h2>
          <p className="text-gray-700">
            Notice u/s 142(1) is issued by the Income Tax Department for:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 mt-2">
            <li>
              <b>Filing of Income Tax Return:</b> If you’ve not filed your
              return within the specified period or before the end of the
              relevant assessment year, you might receive Notice u/s 142(1)
              asking you to file your return.
            </li>
            <li>
              <b>Producing specific accounts and documents:</b> After you’ve
              filed your income tax return, your Assessing Officer (AO) may ask
              you to produce such specific accounts and documents as required by
              him by way of Notice u/s 142(1). For example, you might be
              required to produce your purchase books, sales books, or proofs of
              any deductions availed by you, etc.
            </li>
            <li>
              <b>
                Any other information, notes, or workings as desired by the AO:
              </b>
              The assessing officer may require you to furnish in writing and in
              the prescribed manner the information, notes, or workings on
              specific points as required by him, which may or may not form part
              of books of accounts. For example, a statement of your assets and
              liabilities.
            </li>
          </ol>
        </div>

        {/* Section 6: Penalty for Non-Compliance of Section 142(1) Tax Notice */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Penalty for Non-Compliance of Section 142(1) Tax Notice
          </h2>
          <p className="text-gray-700">
            If you don’t comply with Notice u/s 142(1), then:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
            <li>
              A penalty of Rs 10,000 can be imposed on you u/s 271(1)(b).
            </li>
            <li>
              Your case can fall under “Best Judgement Assessment” u/s 144,
              where the assessment will be carried out as per the best judgment
              of the Assessing Officer on the basis of all the relevant material
              he gathered.
            </li>
            <li>
              You can be prosecuted u/s 276D for up to 1 year with or without a
              fine.
            </li>
            <li>A warrant may also be issued u/s 132 for conducting a search.</li>
          </ul>
          <p className="text-gray-700 mt-4">
            <b>Sample email of the Notice under Section 142(1):</b>
          </p>
          <div className="mt-4">
            <img
              src="https://via.placeholder.com/800x400" // Replace with your image path
              alt="Sample Mail"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* Section 7: How to Submit a Response to the Notice U/S 142(1) */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            How to Submit a Response to the Notice U/S 142(1)?
          </h2>
          <p className="text-gray-700">
            To respond to a notice under Section 142(1) of the Income Tax Act,
            you can use the online ‘e-Proceedings’ facility on the Income Tax
            portal. Here are the steps to follow:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
            <li>Log in to the Income Tax E-filing portal</li>
            <li>
              Click on the “Pending Actions” Tab and then select “E-proceedings.”
            </li>
            <li>Select the ‘View Notices’ option.</li>
            <li>‘Submit Response’ to go to a new page.</li>
            <li>
              Choose either ‘Partial Response’ or ‘Full Response’ to submit your
              response.
            </li>
          </ul>
        </div>

        {/* Section 8: Notice for Defective Return U/S 139(9) */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Notice for Defective Return U/S 139(9) of the Income Tax Act
          </h2>
          <h3 className="text-lg font-semibold mb-2">
            What is a Defective Return?
          </h3>
          <p className="text-gray-700">
            When any important information is missing or reported wrongly on the
            return, it is known as a defective return. In any of the above
            cases, the income tax department issues a defective notice u/s
            139(9) to the taxpayers, intimating them about the same and asking
            them to correct the inaccuracies present in the return.
          </p>
          <p className="text-gray-700 mt-2">
            You are required to make the necessary corrections in the return
            within 15 days of receiving the notice. If you fail to correct the
            ITR on time, it might have certain consequences in the future.
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
        <Button variant="outline" onClick={() => navigate("/taxes/faqs")}>
          Next
        </Button>
      </div>
    </section>
    </>
  );
}

export default TaxNotice;