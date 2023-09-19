"use client";

import { useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";

import PokeCard from "./pokecard";
import { Button } from "./ui/button";
import { Pokemon } from "types/pokemon";
import { usePokemonPage } from "lib/utils";

interface PokemonApiResponse {
  results: Pokemon[];
}

const Pokelist = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const { data, isLoading, mutate } = usePokemonPage<PokemonApiResponse>(
    page,
    12
  );

  return (
    <>
      <div className="pb-4">
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => {
            mutate();
          }}
        >
          <RotateCcw className="w-4 h-4 text-zinc-600" />
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {isLoading && <div>Loading...</div>}
        {data &&
          data.results.map((pokemon: Pokemon) => (
            <PokeCard key={pokemon.name} name={pokemon.name} />
          ))}
      </div>
    </>
  );
};

export default Pokelist;
