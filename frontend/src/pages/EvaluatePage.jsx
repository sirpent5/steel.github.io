import React, { useState } from 'react';
import './EvaluatePage.css';

// Streaming services
const SERVICES = {
    NETFLIX: { id: 203, name: "Netflix" },
    HULU: { id: 157, name: "Hulu" },
    DISNEY_PLUS: { id: 372, name: "Disney+" },
    AMAZON_ID: { id: 26, name: "AMAZON" },
    PEACOCK: { id: 388, name: "Peacock" },
    APPLE_TV: { id: 371, name: "AppleTV" },
    MAX: { id: 387, name: "Max" },
    TUBI: { id: 296, name: "Tubi" },
    PARAMOUNT: { id: 444, name: "Paramount" },
    FUBO: { id: 373, name: "Fubo" },
    CRUNCHYROLL: { id: 79, name: "Crunchyroll" },
};

const EvaluatePage = () => {
    const [serviceA, setServiceA] = useState('');
    const [serviceB, setServiceB] = useState('');
    const [jaccardIndex, setJaccardIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCompareServices = async () => {
        if (!serviceA || !serviceB || serviceA === serviceB) {
            setError("Please select two different services to compare.");
            setJaccardIndex(null);
            return;
        }

        setLoading(true);
        setError(null);
        setJaccardIndex(null);

        try {
            const response = await fetch(
                `http://localhost:5000/api/compare-services?serviceA=${Number(serviceA)}&serviceB=${Number(serviceB)}`
            );

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
        <div className="evaluate-container">
            <div className="evaluate-card">
                <h1>Compare Streaming Services</h1>

                <select
                    className="evaluate-select"
                    value={serviceA}
                    onChange={(e) => setServiceA(e.target.value)}
                >
                    <option value="">Select Service A</option>
                    {Object.values(SERVICES).map(service => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>

                <select
                    className="evaluate-select"
                    value={serviceB}
                    onChange={(e) => setServiceB(e.target.value)}
                >
                    <option value="">Select Service B</option>
                    {Object.values(SERVICES).map(service => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>

                <button
                    className="compare-button"
                    onClick={handleCompareServices}
                    disabled={loading}
                >
                    {loading ? 'Comparing...' : 'Compare'}
                </button>

                {jaccardIndex !== null && (
                    <div className="result success">
                        The Jaccard Index is: <strong>{jaccardIndex.toFixed(2)}%</strong>
                    </div>
                )}

                {error && (
                    <div className="result error">
                        Error: {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EvaluatePage;
