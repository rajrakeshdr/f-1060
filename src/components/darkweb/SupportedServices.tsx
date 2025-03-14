
import React from 'react';

const supportedServices = [
  "Firefox Monitor",
  "Have I Been Pwned?",
  "Dehashed",
  "Aura",
  "Identity Guard",
  "Intelligence X",
  "Dashlane"
];

const SupportedServices = () => {
  return (
    <>
      <h3 className="text-sm font-medium mb-2 w-full">Supported Services</h3>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2 w-full">
        {supportedServices.map((service, index) => (
          <div 
            key={index} 
            className="p-2 bg-gray-700/50 border border-gray-600/50 rounded-md text-xs text-center hover:bg-gray-600/50 transition-colors"
          >
            <span className="font-medium">{service}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default SupportedServices;
