import React from 'react';

const ResourcesSection = () => {
  return (
    <div className="bg-brand text-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        {/* Image container */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0">
          {/* Replace this div with the actual image or SVG */}
          <div className="rounded-lg overflow-hidden">
            <img
              src="/path-to-your-image.jpg" // Replace with your image path
              alt="Illustration"
              className="max-w-xs md:max-w-sm lg:max-w-lg"
            />
          </div>
        </div>
        {/* Text content container */}
        <div className="lg:w-1/2 lg:pl-12 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-6">Meet <span className=' underline'>flair<strong>now</strong></span>. The world’s first employment superapp.</h2>
          <p className="mb-8">
            Roll streamlined work, exciting careers, flexible pay and exclusive savings and benefits into one. Flairnow’s advanced features transform your team’s...
          </p>
          <ul className="list-none space-y-4 mb-8">
            <li>Work; Manage all work admin from the app</li>
            <li>Career; Discover and apply for internal opportunities</li>
            <li>Money; Access wages on-demand and unlock cashback offers</li>
            <li>Benefits; Save on everyday essentials</li>
          </ul>
          <button className="bg-black text-brand font-bold py-2 px-4 rounded hover:bg-teal-800 hover:text-white transition duration-300">
            Get Swag today
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;
