import React from "react";

const files = [
  {
    name: "7 Steps to Understanding the Stock Market",
    id: "1j9FGQCQJcNBHPmrsMqvV5a1X7SMJwGWh",
  },
  {
    name: "A Gentle Introduction To Bitcoin",
    id: "1HxmNo252_uVzo-Nf9pSULBv8FmOkpPij",
  },
  {
    name: "Beginners Guide to the Capital Markets",
    id: "1YnVr5MDRj7pe91bpmBc0asJE4GGjshwY",
  },
  {
    name: "First Steps to Investing - A Beginner's Guide",
    id: "1pYxrMDEDimWwf3lcdSz9ajd3K4adNRp-",
  },
  {
    name: "The Complete Guide to Trading",
    id: "1jLIhRLwo-i2BViHpJs8vf6Ex3Pm3nTIv",
  },
];

const DriveFilesViewer = () => {
    return (
      <div className="bg-gray-100 min-h-screen py-10 px-6 md:px-20">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          E-Books
        </h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                {file.name}
              </h3>
              <iframe
                src={`https://drive.google.com/file/d/${file.id}/preview`}
                className="w-full h-72 rounded-lg border-0"
              />
              <a
                href={`https://drive.google.com/uc?id=${file.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-blue-600 hover:underline text-center"
              >
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default DriveFilesViewer;