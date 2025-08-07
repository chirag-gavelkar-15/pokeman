import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CollectionItem from './CollectionItem';

export default function PersonalCollection({ collection, setCollection }) {
  const moveItem = (from, to) => {
    const updated = [...collection];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setCollection(updated);
    localStorage.setItem('myPokemonCollection', JSON.stringify(updated));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">My Pokemon Collection</h1>
        <div className="space-y-2">
          {collection.map((p, i) => (
            <CollectionItem key={p.name} pokemon={p} index={i} moveItem={moveItem} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
