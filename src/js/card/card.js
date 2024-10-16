import { pokemonList } from "../constants/constants.js"



export function createCard(pokemon) {

    console.log(pokemon);

    const card = `<div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                            card's content.</p>
                        <a href="#" class="btn btn-primary">Ver mais</a>
                    </div>
                </div>`

    pokemonList.innerHTML += card;
}