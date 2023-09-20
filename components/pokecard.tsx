import { Fragment } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { usePokemon } from "lib/utils";
import { Pokemon } from "types/pokemon";

const PokeCard = ({ name }: { name: string }) => {
  const router = useRouter();
  const { data: pokemon } = usePokemon<Pokemon>(name);

  return (
    <Card>
      {pokemon && (
        <Fragment>
          <CardHeader>
            <CardTitle>{pokemon.name}</CardTitle>
            <div className="flex flex-row">
              {pokemon.types.map((type: Pokemon["types"][0]) => (
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
                src={pokemon.sprites.other["official-artwork"].front_default}
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
