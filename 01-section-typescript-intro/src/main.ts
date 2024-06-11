// import { age, isActive, name } from "./bases/01-types";
// import { bulbassaur, pokemons, pokemonsIds } from "./bases/02-objects";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `<h1>${JSON.stringify({msg: 'hello'})}</h1>`;