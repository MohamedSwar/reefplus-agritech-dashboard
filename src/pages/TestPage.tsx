import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Page</h1>
        <p className="text-gray-600 mb-4">This is a simple test page to verify React is working.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Test Components</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-100 text-green-800 rounded-lg">
              ✅ React is working
            </div>
            <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
              ✅ Tailwind CSS is working
            </div>
            <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
              ✅ Component rendering is working
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Current Time</h2>
          <p className="text-gray-600">{new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
