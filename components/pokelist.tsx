"use client";

import { Fragment } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import { getPokemonPage } from "app/actions";
import PokeCard from "./pokecard";
import { Pokemon } from "types/pokemon";

const Pokelist = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  // data only gets name, url, and id
  const { data, isLoading, error } = useSWR(["getPokemonPage", page], () =>
    getPokemonPage(page)
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {data &&
        data.results.map((pokemonEntry: Pokemon & { id: number }) => (
          <Fragment key={pokemonEntry.name}>
            <PokeCard name={pokemonEntry.name} />
          </Fragment>
        ))}
      {isLoading && <div>Loading...</div>}
      {error && <div>Failed to load</div>}
    </div>
  );
};

export default Pokelist;
