"use client";

import { Fragment } from "react";
import Link from "next/link";

import { usePokemon } from "lib/utils";
import { Pokemon } from "types/pokemon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

interface Params {
  params: {
    slug: string;
  };
}

export default function PokemonDetailPage({ params }: Params) {
  const { data: pokemon, isLoading } = usePokemon<Pokemon>(params.slug);

  return (
    <div className="px-6">
      {isLoading && <div>Loading...</div>}
      {pokemon && (
        <Fragment>
          <h1 className="text-sm text-muted-foreground py-2">
            <Link
              href={{
                pathname: "/",
              }}
              className="font-bold"
            >
              home
            </Link>{" "}
            / {pokemon.name}
          </h1>
          <div className="flex flex-col max-w-sm mx-auto">
            <div className="w-auto sm:w-[400px] h-[200px] flex items-center justify-center m bg-gray-200 rounded-xl overflow-hidden shadow-lg">
              <img
                className="w-36 h-36 object-fill"
                src={pokemon.sprites.other["official-artwork"].front_default}
              />
            </div>
            <div className="py-12 flex flex-col">
              <h1 className="text-xl font-bold tracking-tight lg:text-2xl">
                {pokemon.name}
              </h1>
              <div className="flex flex-row gap-2 py-2">
                {pokemon.types.map((type: Pokemon["types"][0]) => (
                  <Badge key={type.type.name} variant={"secondary"}>
                    {type.type.name}
                  </Badge>
                ))}
              </div>
              <div>
                <div className="w-full sm:grid-cols-4 grid grid-cols-2 gap-4 py-2">
                  {pokemon.stats.map((stat: Pokemon["stats"][0]) => (
                    <Card
                      key={stat.stat.name}
                      className="w-full rounded-md col-span-2"
                    >
                      <CardHeader className="p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {stat.stat.name}
                          </span>

                          <Badge variant={"secondary"} className="text-sm">
                            {stat.base_stat}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardDescription className="space-y-3">
                        <div className="w-full h-2 bg-gray-200 rounded-r-none rounded-l-none">
                          <div
                            className={`h-2 bg-green-400 rounded-r-sm rounded-l-sm `}
                            style={{
                              width: `${stat.base_stat}%`,
                            }}
                          />
                        </div>
                      </CardDescription>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
      {!isLoading && !pokemon && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Pokemon not found</h1>
          <Link
            href={{
              pathname: "/",
            }}
            className="font-bold py-3"
          >
            <Button>Go back to home</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
