// App.jsx
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonDiscovery from './components/PokemonDiscovery';
import PersonalCollection from './components/PersonalCollection';

const queryClient = new QueryClient();

export default function App() {
  const [collection, setCollection] = useState([]);
  const [showCollection, setShowCollection] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('myPokemonCollection');
    if (saved) setCollection(JSON.parse(saved));
  }, []);

  const handleAdd = (pokemon) => {
    if (!collection.find(p => p.name === pokemon.name)) {
      const updated = [...collection, pokemon];
      setCollection(updated);
      localStorage.setItem('myPokemonCollection', JSON.stringify(updated));
    }
  };

  const handleRemove = (pokemon) => {
    const updated = collection.filter(p => p.name !== pokemon.name);
    setCollection(updated);
    localStorage.setItem('myPokemonCollection', JSON.stringify(updated));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-6xl mx-auto min-h-screen bg-gray-50">
        <div className="flex justify-between items-center p-4 border-b bg-white shadow">
          <h1 className="text-2xl font-bold">Pokemon Discovery</h1>
          <button
            onClick={() => setShowCollection(!showCollection)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {showCollection ? 'Back to Discovery' : 'View Collection'}
          </button>
        </div>
        {showCollection ? (
          <PersonalCollection collection={collection} setCollection={setCollection} />
        ) : (
          <PokemonDiscovery
            onAdd={handleAdd}
            onRemove={handleRemove}
            collection={collection}
          />
        )}
      </div>
    </QueryClientProvider>
  );
}
