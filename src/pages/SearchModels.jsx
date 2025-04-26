import { useState } from 'react';
import { searchModels } from '../api/modelService';

export default function SearchModels() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await searchModels({
        globalSearch: query,
        page: 0,
        pageSize: 10,
      });

      setResults(data?.data || []); // assuming API returns { data: [...] }
    } catch (error) {
      console.error('Model search failed:', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Search Models</h2>
      <input
        type="text"
        className="border px-4 py-2 rounded"
        value={query}
        placeholder="Search by keyword..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="ml-4 bg-blue-600 text-white px-4 py-2 rounded">
        Search
      </button>

      <ul className="mt-6 space-y-2">
        {results.map((model, idx) => (
          <li key={idx} className="border p-3 rounded shadow-sm">
            <strong>{model.name}</strong> — {model.category} — {model.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
