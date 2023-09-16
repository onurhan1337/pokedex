"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import { getPokemon } from "app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Fragment } from "react";

// This is a custom hook that fetches a pokemon by name
function usePokemon(name: string) {
  const { data, isLoading, mutate } = useSWR(name, async () => {
    try {
      return await getPokemon(name);
    } catch (error) {
      if (error instanceof Error && error.cause == "404") {
        return null;
      } else {
        throw error;
      }
    }
  });

  return {
    pokemon: data,
    isLoading,
    mutate,
  };
}

const PokeCard = ({ name }: { name: string }) => {
  const router = useRouter();
  const { pokemon, isLoading, mutate } = usePokemon(name);

  console.log(pokemon);

  return (
    <Card>
      {isLoading && <div>Loading...</div>}
      {pokemon && (
        <Fragment>
          <CardHeader>
            <CardTitle>{pokemon.name}</CardTitle>
            <div className="flex flex-row">
              {pokemon.types.map((type: any) => (
                <Badge
                  key={type.type.name}
                  className="mr-2"
                  variant={"secondary"}
                >
                  {type.type.name}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-24 h-24"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <span className="text-sm text-muted-foreground">Height</span>
                <span className="text-sm text-muted-foreground">
                  {pokemon.height}
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="text-sm text-muted-foreground">Weight</span>
                <span className="text-sm text-muted-foreground">
                  {pokemon.weight}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <Button
                size={"sm"}
                onClick={() => {
                  router.push(`/pokemon/${pokemon.name}`);
                }}
                className="w-full"
              >
                Details
              </Button>
            </div>
          </CardFooter>
        </Fragment>
      )}
    </Card>
  );
};

export default PokeCard;
