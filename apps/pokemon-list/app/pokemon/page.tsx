import { Pagination, PokemonTypeFilter } from '@pokemon-list/ui-lib';
import { TypePokemon } from 'pokenode-ts';
import { PokemonList } from '@pokemon-list/ui-lib/lib/pokemon-list';
import React from 'react';
import {
  getTypeByName,
  listTypes,
} from '@pokemon-list/ui-lib/lib/poke-service';

export const revalidate = 360;

const pokemonByTypes: {
  [prop: string]: TypePokemon[];
} = {};

async function getPokemon(pokemonTypes: string[]) {
  const result = await Promise.all(pokemonTypes.map((t) => getTypeByName(t)));

  pokemonTypes.forEach(
    (t, index) => (pokemonByTypes[t] = result[index].pokemon)
  );

  return result
    .map((e) => e.pokemon)
    .reduce((p, c) => {
      p.push(...c);
      return p;
    }, []);
}

async function getPokemonTypes() {
  const pokemonTypes = await listTypes(0, 100);
  return (pokemonTypes.results || []).map((e) => e.name);
}

export default async function PokemonPage({
  searchParams,
}: {
  searchParams: { types: string[] | undefined; page: string };
}) {
  const pokemonTypes = await getPokemonTypes();
  const allPokemon = await getPokemon(pokemonTypes);
  const page = parseInt(searchParams.page || '1', 10) || 1;
  const types = searchParams.types || '';

  let pokemon = [];

  // if select all Types, we return all pokemon
  if (!types) {
    pokemon = allPokemon;
  } else {
    let result: TypePokemon[] = [];

    // return only selected pokemon by Type
    Object.keys(pokemonByTypes).forEach((k, v) => {
      if (types.includes(k)) {
        if (!result.length) {
          result.push(...pokemonByTypes[k]);
        } else {
          result = result.filter((e) =>
            pokemonByTypes[k].find((f) => f.pokemon.name === e.pokemon.name)
          );
        }
      }
    });

    pokemon = result;
  }

  return (
    <div>
      <PokemonTypeFilter items={pokemonTypes} />
      <Pagination total={pokemon.length} page={page} />
      <PokemonList items={pokemon} page={page} />
    </div>
  );
}
