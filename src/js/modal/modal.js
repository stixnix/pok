let currentPokemonId = null;

async function fetchPokemonById(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        const pokemon = await response.json();
        renderPokemonDetails(pokemon);
        currentPokemonId = id;
    } catch (error) {
        console.error(error.message);
        document.getElementById('modal-body').innerHTML = '<p>Erro ao carregar detalhes do Pokémon.</p>';
    }
}

// Abrir o modal com Pokémon específico
function openModal(pokemonId) {
    const modal = document.getElementById('pokemon-modal');
    fetchPokemonById(pokemonId);
    modal.classList.remove('d-none');
}

// Adiciona eventos aos botões de navegação
document.getElementById('prev-pokemon').addEventListener('click', () => {
    if (currentPokemonId > 1) {
        fetchPokemonById(currentPokemonId - 1);
    }
});

document.getElementById('next-pokemon').addEventListener('click', () => {
    fetchPokemonById(currentPokemonId + 1);
});

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('pokemon-modal');
    modal.classList.add('d-none');
}

// Evento para fechar o modal ao clicar no "X"
document.getElementById('close-modal').addEventListener('click', closeModal);

// Evento para fechar o modal ao clicar fora do conteúdo
document.getElementById('pokemon-modal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('pokemon-modal')) {
        closeModal();
    }
});
