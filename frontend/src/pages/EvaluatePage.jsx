// frontend/src/pages/EvaluationPage.jsx
import React, { useState } from 'react';

function EvaluationPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load data');
        return response.json();
      })
      .then(fetchedData => setData(fetchedData))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h1>Evaluation Page</h1>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Get Data'}
      </button>
      <div className="data-container">
        {error && <p>Error: {error}</p>}
        {data && (
          <>
            <h3>{data.title}</h3>
            <p>{data.body}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default EvaluationPage;