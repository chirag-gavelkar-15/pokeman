import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export default function CollectionItem({ pokemon, index, moveItem }) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'POKEMON',
    hover(item) {
      if (item.index !== index) {
        moveItem(item.index, index);
        item.index = index;
      }
    },
  });

  const [, drag] = useDrag({ type: 'POKEMON', item: { index } });

  drag(drop(ref));

  return (
    <div ref={ref} className="border p-2 flex gap-4 items-center bg-white shadow rounded">
      <img src={pokemon.sprites.front_default} className="w-12 h-12" alt={pokemon.name} />
      <span className="capitalize font-semibold">{pokemon.name}</span>
    </div>
  );
}
