export interface Pokemon {
    name: string;
    type: string;
    generation: number;
}

export const pokemonData: Pokemon[] = [
    { name: 'Bulbasaur', type: 'Grass', generation: 1},
    { name: 'Ivysaur', type: 'Grass', generation: 1 },
    { name: 'Venusaur', type: 'Grass', generation: 1 },
    {name: 'Charmander', type: 'Fire', generation: 1 },
    { name: 'Charmeleon', type: 'Fire', generation: 1 },
    { name: 'Charizard', type: 'Fire', generation: 1 },
];