import { pokemonList } from "../constants/constants.js"; // Importa a lista de Pokémon de um arquivo de constantes

// Função para capitalizar a primeira letra do nome
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função para acionar a busca de Pokémon
function searchPokemon(query) {
    document.getElementById('pokemon-search').value = query; // Preenche o campo de busca com o nome do Pokémon
    document.getElementById('search-button').click(); // Simula o clique no botão de busca
}

// Função assíncrona para criar um card de Pokémon
export async function createCard(pokemon, index) {
    try {
        // Faz uma requisição para buscar detalhes da espécie do Pokémon usando a PokeAPI
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}`);
        
        // Verifica se a resposta da requisição foi bem-sucedida
        if (!speciesResponse.ok) {
            throw new Error(`Erro ao buscar detalhes da espécie para o Pokémon: ${pokemon.name}`); // Se houver erro, lança uma exceção
        }

        // Converte a resposta para JSON (dados da espécie do Pokémon)
        const speciesData = await speciesResponse.json();

        // Extrai a primeira descrição disponível do Pokémon e remove caracteres especiais como quebras de linha
        const description = speciesData.flavor_text_entries[0].flavor_text.replace(/\n|\f/g, ' ');

        // Usa a função capitalizeFirstLetter para garantir que o nome do Pokémon tenha a primeira letra maiúscula
        const capitalizedPokemonName = capitalizeFirstLetter(pokemon.name);

        // Cria o card do Pokémon
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';

        // Cria o conteúdo HTML do card
        card.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png" class="card-img-top" alt="${capitalizedPokemonName}">
            <div class="card-body">
                <h5 class="card-title" style="text-align: center;">${capitalizedPokemonName}</h5>
                <p class="card-text">${description}</p>
            </div>
        `;

        // Cria o botão "Ver mais"
        const verMaisButton = document.createElement('button');
        verMaisButton.innerText = 'Ver mais';
        verMaisButton.classList.add('btn', 'btn-primary');

        // Adiciona o evento de clique no botão para chamar `searchPokemon`
        verMaisButton.addEventListener('click', () => searchPokemon(pokemon.name));

        // Adiciona o botão ao card
        card.querySelector('.card-body').appendChild(verMaisButton);

        // Adiciona o card ao container de Pokémon
        pokemonList.appendChild(card);
    } catch (error) {
        // Em caso de erro, exibe uma mensagem no console e adiciona um card de erro
        console.error("Erro ao criar o card:", error);

        // Adiciona um card de erro como feedback visual
        pokemonList.innerHTML += `<div class="card-error">Não foi possível carregar ${pokemon.name}</div>`;
    }
}
