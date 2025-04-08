
import React from 'react';

const UsageInstructions = () => {
  return (
    <div className="mt-4 p-4 bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">When to Use</h2>
      <div className="space-y-3">
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="font-medium text-gray-800">For Nerve Pain Relief</h3>
          <p className="text-gray-600 text-sm mt-1">Take as directed by your physician to alleviate nerve pain related to vitamin B deficiency.</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="font-medium text-gray-800">For Neuropathy</h3>
          <p className="text-gray-600 text-sm mt-1">Regular use as prescribed helps manage symptoms of peripheral neuropathy.</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="font-medium text-gray-800">For Nutritional Support</h3>
          <p className="text-gray-600 text-sm mt-1">Supplementing daily diet to prevent vitamin B deficiency and support overall nerve health.</p>
        </div>
      </div>
    </div>
  );
};

export default UsageInstructions;
