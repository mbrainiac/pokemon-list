'use client';

import React, { useCallback, useState } from 'react';
import { Button } from './button';
import { useRouter, useSearchParams } from 'next/navigation';

export interface PokemonListProps {
  items: string[];
  onClick?: (item: string[]) => void;
}

const PokemonTypeFilter: React.FC<PokemonListProps> = ({ items, onClick }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const types = searchParams.getAll('types');

  const [selectedTypes, setSelectedTypes] = useState<string[]>(types);

  const createQueryString = useCallback(
    (name: string, value: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name)
      params.set('page', '1');

      value.map((e) => params.append(name, e));

      return params.toString();
    },
    [searchParams]
  );

  const clearFilter = () => {
    setSelectedTypes([]);
    router.push(`?`);
  };

  const handleClick = (
    t: string,
    event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event?.preventDefault();

    const newTypes = (
      selectedTypes.includes(t)
        ? selectedTypes.filter((e) => e !== t)
        : [...selectedTypes, t]
    ).filter((e) => e);

    setSelectedTypes(newTypes);
    onClick?.(newTypes);

    router.push(`?${createQueryString('types', newTypes)}`);
  };

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="flex items-center mx-4 my-4">
        <div className="mr-2 my-4 font-bold self-start">Types:</div>
        <div>
          <Button key={'all'} label={'All'} onClick={() => clearFilter()} />
          {(items || []).map((e) => (
            <Button
              key={e}
              label={e}
              selected={selectedTypes.includes(e)}
              onClick={(event) => handleClick(e, event)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { PokemonTypeFilter };
