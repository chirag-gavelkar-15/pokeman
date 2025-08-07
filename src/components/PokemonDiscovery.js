import { useRef, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const LIMIT = 6;

const fetchPokemons = async ({ pageParam = 0 }) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=${LIMIT}`);
  return { ...res.data, nextOffset: pageParam + LIMIT };
};

export default function PokemonDiscovery({ onAdd, onRemove, collection }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: fetchPokemons,
    getNextPageParam: (lastPage) => lastPage.next ? lastPage.nextOffset : undefined,
  });

  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {data?.pages.flatMap(page =>
        page.results.map(pokemon => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            onAdd={onAdd}
            onRemove={onRemove}
            isInCollection={collection.some(p => p.name === pokemon.name)}
          />
        ))
      )}
      <div ref={observerRef} className="col-span-full text-center py-4">
        {isFetchingNextPage && 'Loading more...'}
      </div>
    </div>
  );
}