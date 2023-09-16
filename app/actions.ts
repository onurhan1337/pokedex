export async function getPokemon(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return await response.json();
}

export async function getPokemonPage(page: number) {
  const pageSize = 12;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${
      page * pageSize
    }`
  );
  return await response.json();
}
