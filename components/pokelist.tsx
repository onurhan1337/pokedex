"use client";

import { useState, useMemo } from "react";
import { RotateCcw } from "lucide-react";

import PokeCard from "./pokecard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Pokemon } from "types/pokemon";
import { Skeleton } from "./ui/skeleton";
import Pagination from "./ui/pagination";
import { Card, CardContent, CardFooter } from "./ui/card";
import { usePokemonPage, filterPokemonByName } from "lib/utils";

export interface PokemonApiResponse {
  results: Pokemon[];
}

const Pokelist = () => {
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const { data, isLoading, mutate } = usePokemonPage<PokemonApiResponse>(
    page,
    12
  );

  const filteredPokemon = useMemo(
    () => filterPokemonByName(data, name),
    [data, name]
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="flex flex-row space-x-3 py-4 w-1/3">
        <Button onClick={() => mutate(page)} variant={"outline"} size={"icon"}>
          <RotateCcw size={16} />
        </Button>
        <Input
          placeholder="Search by type"
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {isLoading &&
          Array.from(Array(12).keys()).map((index) => (
            <LoadingPokemonCard key={index} />
          ))}
        {data &&
          filteredPokemon.map((pokemon: Pokemon) => (
            <PokeCard key={pokemon.name} name={pokemon.name} />
          ))}
      </div>

      {data && filteredPokemon.length !== 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(data.results.length)}
          onPageChange={handlePageChange}
        />
      )}

      {data && filteredPokemon.length === 0 && (
        <div className="w-full mx-auto flex flex-col items-center justify-center">
          <div className="text-2xl">No Pokemon found</div>
          <div className="text-sm text-gray-500">
            Try searching for another type
          </div>
        </div>
      )}
    </>
  );
};

export default Pokelist;

function LoadingPokemonCard() {
  return (
    <Card>
      <div className="animate-pulse flex space-x-4 p-4">
        <div className="flex flex-col space-y-2">
          <Skeleton className="w-24 h-8 bg-gray-200 rounded" />
          <div className="flex flex-row space-x-2">
            <Skeleton className="w-24 h-5 bg-gray-200 rounded mt-2" />
            <Skeleton className="w-24 h-5 bg-gray-200 rounded mt-2" />
          </div>
        </div>
      </div>
      <CardContent>
        <div className="flex flex-col items-center">
          <Skeleton className="w-24 h-24 bg-gray-200 rounded-full" />
          <Skeleton className="w-full h-3 bg-gray-200 rounded mt-2" />
          <Skeleton className="w-full h-3 bg-gray-200 rounded mt-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="w-full h-6 bg-gray-200 rounded-md" />
      </CardFooter>
    </Card>
  );
}
