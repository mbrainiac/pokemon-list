import React from 'react';
import { TypePokemon } from 'pokenode-ts';
import { PokemonItem } from './pokemon-item';
import { MAX_ITEM_PER_PAGE } from './poke-service';
import { PokemonItemServer } from './pokemon-item-server';

export interface PokemonListProps {
  items: TypePokemon[];
  page: number;
}

const PokemonList: React.FC<PokemonListProps> = async ({ items, page = 0 }) => {
  const pokemon = items.slice(
    (page - 1) * MAX_ITEM_PER_PAGE,
    page * MAX_ITEM_PER_PAGE
  );

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8">
      {(pokemon || []).map((e) => (
        <PokemonItem key={e.pokemon.name} name={e.pokemon.name} />
        // uncomment this if you want to try rendering pokemon item on the server
        // <PokemonItemServer key={e.pokemon.name} name={e.pokemon.name} />
      ))}
    </div>
  );
};

export { PokemonList };
