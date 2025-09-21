import React, { useState, useEffect } from 'react';

// You would typically import this from a constants file, e.g., '../constants/services.js'
const SERVICES = {
    NETFLIX: { id: 203, name: "Netflix" },
    HULU: { id: 157, name: "Hulu" },
    DISNEY_PLUS: { id: 372, name: "Disney+" },
    AMAZON_ID: { id: 26, name: "AMAZON" },
    PEACOCK: { id: 388, name: "Peacock" },
    APPLE_TV: { id: 371, name: "AppleTV" },
    MAX: { id: 387, name: "Max" },
    TUBI: { id: 296, name: "Tubi"},
    PARAMOUNT: { id: 444, name: "Paramount"},
    FUBO: { id: 373, name: "Fubo"},
    CRUNCHYROLL: { id: 79, name: "Crunchyroll"},
};

const App = () => {
    const [serviceA, setServiceA] = useState('');
    const [serviceB, setServiceB] = useState('');
    const [jaccardIndex, setJaccardIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCompareServices = async () => {
        if (!serviceA || !serviceB || serviceA === serviceB) {
            setError("Please select two different services to compare.");
            return;
        }

        setLoading(true);
        setError(null);
        setJaccardIndex(null);

        try {
            const response = await fetch(`http://localhost:5000/api/compare-services?serviceA=${serviceA}&serviceB=${serviceB}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setJaccardIndex(data.jaccardIndex);

        } catch (err) {
            setError(err.message);


        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
            <div className="container bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl w-full">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-100">Compare Streaming Services</h1>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                    <select
                        id="serviceA"
                        value={serviceA}
                        onChange={(e) => setServiceA(e.target.value)}
                        className="comparison-input bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Service A</option>
                        {Object.values(SERVICES).map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>

                    <div className="text-xl font-bold text-gray-400">vs</div>

                    <select
                        id="serviceB"
                        value={serviceB}
                        onChange={(e) => setServiceB(e.target.value)}
                        className="comparison-input bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Service B</option>
                        {Object.values(SERVICES).map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                </div>
                
                <div className="text-center">
                    <button
                        onClick={handleCompareServices}
                        disabled={loading}
                        className="comparison-button bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Comparing...' : 'Compare'}
                    </button>
                </div>
                
                {jaccardIndex !== null && (
                    <div className="result mt-6 text-green-400">
                        The Jaccard Index is: <strong>{jaccardIndex.toFixed(2)}%</strong>
                    </div>
                )}
                
                {error && (
                    <div className="result mt-6 text-red-400">
                        Error: {error}
                    </div>
                )}

            </div>
        </div>
    );
};

export default App;

