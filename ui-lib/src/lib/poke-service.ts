import { PokemonClient } from 'pokenode-ts';
import { cache } from 'react'

const pokeApi = new PokemonClient();

export const MAX_ITEM_PER_PAGE = 8 * 8;
export const MAX_POKEMON = 2000;

export const listTypes = cache(async (offset?: number, limit?: number) => {
  return pokeApi.listTypes(offset, limit)
})

export const getTypeByName = cache(async (name: string) => {
  return pokeApi.getTypeByName(name)
})

export const getPokemonByName = cache(async (name: string) => {
  return pokeApi.getPokemonByName(name)
})

