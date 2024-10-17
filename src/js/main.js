import { createCard } from "./card/card.js";
import { listAllPokemons } from "./fetchApi/fetchfunctions.js";


console.log("carregou!")

const {count, results, next, previous} = await listAllPokemons();

console.log("pokemons (results): ", results);

results.forEach((pokemon, index) => {
    console.log("index: ", index);
    createCard(pokemon, index + 1);
});