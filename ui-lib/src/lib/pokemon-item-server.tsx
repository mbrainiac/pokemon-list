import React from 'react';
import { getPokemonByName } from './poke-service';
import Image from 'next/image';

export interface PokemonItemProps {
  name: string;
}

const PokemonItemServer: React.FC<PokemonItemProps> = async ({ name }) => {
  const pokemon = await getPokemonByName(name);

  const image =
    pokemon?.sprites.other?.['official-artwork'].front_default ||
    pokemon?.sprites.front_shiny ||
    '';

  return (
    <div>
      <div className="h-24 w-24 mx-auto">
        {image ? (
          <Image alt="" src={image} width={100} height={100} />
        ) : (
          <Image
            alt=""
            src="data:image/png;base64,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"
            width={100}
            height={100}
          />
        )}
      </div>
      <div className="text-center whitespace-pre-wrap break-words">{name}</div>
    </div>
  );
};

export { PokemonItemServer };
