import React, { useState } from 'react';

function Script() {
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
      <h1>Welcome to our SteelHacks Project - Name TBD</h1>
      <h2>Tired of paying for too many subscriptions?</h2>
      <h2>Evaluate your wants to find the best plan for you!</h2>
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

export default Script;
