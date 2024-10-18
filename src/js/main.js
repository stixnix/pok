import { createCard } from "./card/card.js";
import { listAllPokemons } from "./fetchApi/fetchfunctions.js";

console.log("carregou!");

// Carregar todos os Pokémon inicialmente
const { count, results, next, previous } = await listAllPokemons();
console.log("pokemons (results): ", results);

results.forEach((pokemon, index) => {
    console.log("index: ", index);
    createCard(pokemon, index + 1);
});

// Função para buscar um Pokémon
async function searchPokemon(query) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        const pokemon = await response.json();

        // Abrir o modal e exibir o Pokémon encontrado
        openModal(pokemon);

    } catch (error) {
        console.error(error.message);
        alert('Pokémon não encontrado! Por favor, verifique o nome ou número.');
    }
}

// Função para abrir o modal e exibir o card do Pokémon
function openModal(pokemon) {
    const modal = document.getElementById('pokemon-modal');
    const modalBody = document.getElementById('modal-body');

    // Cria o conteúdo do modal com os detalhes do Pokémon
    modalBody.innerHTML = `
        <h2 class="text-center">${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" class="mx-auto d-block" alt="${pokemon.name}">
        <p><strong>Tipo(s):</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p><strong>Habilidades:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <p><strong>Peso:</strong> ${pokemon.weight} kg</p>
        <p><strong>Altura:</strong> ${pokemon.height} dm</p>
    `;

    // Remove a classe que esconde o modal
    modal.classList.remove('d-none');
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('pokemon-modal');
    modal.classList.add('d-none');
}

// Adicionar evento ao botão de busca
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('pokemon-search').value;
    if (query) {
        searchPokemon(query);
    }
});

// Evento para fechar o modal ao clicar no "X"
document.getElementById('close-modal').addEventListener('click', closeModal);

// Evento para fechar o modal ao clicar fora do conteúdo
document.getElementById('pokemon-modal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('pokemon-modal')) {
        closeModal();
    }
});
