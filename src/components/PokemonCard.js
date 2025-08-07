
// PokemonCard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PokemonCard({ pokemon, onAdd, onRemove, isInCollection }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(pokemon.url).then((res) => setDetails(res.data));
  }, [pokemon.url]);

  if (!details) return <div className="border p-4">Loading...</div>;

  const handleClick = () => {
    isInCollection ? onRemove(details) : onAdd(details);
  };

  return (
    <div className="border p-4 flex flex-col items-center shadow-md rounded bg-white">
      <img src={details.sprites.front_default} alt={pokemon.name} />
      <h2 className="capitalize font-bold mt-2">{pokemon.name}</h2>
      <p className="text-sm">Type: {details.types.map(t => t.type.name).join(', ')}</p>
      <p className="text-sm">HP: {details.stats[0].base_stat}</p>
      <p className="text-sm">Attack: {details.stats[1].base_stat}</p>
      <p className="text-sm">Defense: {details.stats[2].base_stat}</p>
      <button
        className={`mt-2 px-3 py-1 rounded text-white ${isInCollection ? 'bg-red-600' : 'bg-green-600'}`}
        onClick={handleClick}
      >
        {isInCollection ? '×' : '+'}
      </button>
    </div>
  );
}
