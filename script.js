const API_URL = "https://rickandmortyapi.com/api/character";

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const error = document.getElementById("error");

searchButton.addEventListener("click", searchCharacter);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchCharacter();
});

async function searchCharacter() {
  const name = searchInput.value.trim();
  results.innerHTML = "";
  error.textContent = "";

  try {
    let url = API_URL;
    if (name) url += `/?name=${encodeURIComponent(name)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      error.textContent = "Personagem não encontrado 😢";
      return;
    }

    data.results.forEach((character) => createCard(character));
  } catch (err) {
    console.error(err);
    error.textContent = "Erro ao conectar à API.";
  }
}

function createCard(character) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = character.image;
  img.alt = character.name;

  const info = document.createElement("div");
  info.classList.add("info");

  const nameEl = document.createElement("h3");
  nameEl.textContent = character.name;

  const status = document.createElement("p");
  status.classList.add("detail");
  status.innerHTML = `<strong>Status:</strong> <span class="status-${character.status.toLowerCase()}">${character.status}</span>`;

  const species = document.createElement("p");
  species.classList.add("detail");
  species.textContent = `Espécie: ${character.species}`;

  const gender = document.createElement("p");
  gender.classList.add("detail");
  gender.textContent = `Gênero: ${character.gender}`;

  const origin = document.createElement("p");
  origin.classList.add("detail");
  origin.textContent = `Origem: ${character.origin.name}`;

  info.appendChild(nameEl);
  info.appendChild(status);
  info.appendChild(species);
  info.appendChild(gender);
  info.appendChild(origin);

  card.appendChild(img);
  card.appendChild(info);
  results.appendChild(card);
}

// Carrega personagens iniciais
async function loadInitialCharacters() {
  const response = await fetch(API_URL);
  const data = await response.json();
  data.results.forEach((character) => createCard(character));
}

loadInitialCharacters();
