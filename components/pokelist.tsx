"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { Card, CardContent, CardFooter } from "./ui/card";
import PokeCard from "./pokecard";
import { Pokemon } from "types/pokemon";
import { Skeleton } from "./ui/skeleton";
import { usePokemonPage } from "lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

interface PokemonApiResponse {
  results: Pokemon[];
}

const Pokelist = () => {
  const [name, setName] = useState<string>("");
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const { data, isLoading, mutate } = usePokemonPage<PokemonApiResponse>(
    page,
    12
  );

  const filteredPokemon = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.results.filter((pokemon: Pokemon) => {
      if (!name) {
        return true;
      }
      return pokemon.name.toLowerCase().includes(name.toLowerCase());
    });
  }, [data, name]);

  return (
    <>
      <div className="flex flex-row space-x-3 py-4 w-1/3">
        <Button onClick={() => mutate()} variant={"outline"} size={"icon"}>
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
