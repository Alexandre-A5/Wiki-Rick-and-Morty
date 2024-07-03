document.addEventListener('DOMContentLoaded', () => {
  // Ajouter les écouteurs d'événements après que le DOM est chargé
  document.getElementById('search-button').addEventListener('click', (e) => {
    e.preventDefault();
    performSearch();
  });

  document.getElementById('search-bar').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });
});

async function performSearch() {
  const query = document.getElementById('search-bar').value.trim().toLowerCase();
  if (!query) return;

  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="search-container">
      <input type="text" id="search-bar" placeholder="Search..." value="${query}">
      <button id="search-button">Search</button>
    </div>
  `;

  // Ajouter les écouteurs d'événements après avoir recréé la barre de recherche
  document.getElementById('search-button').addEventListener('click', (e) => {
    e.preventDefault();
    performSearch();
  });

  document.getElementById('search-bar').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });

  // Fetch characters
  const characterResults = await fetchCharacters(`?name=${query}`);
  if (characterResults.results.length > 0) {
    content.innerHTML += '<h2>Characters</h2>';
    characterResults.results.forEach(character => {
      const characterCard = document.createElement('div');
      characterCard.classList.add('card');
      characterCard.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Gender: ${character.gender}</p>
        <button onclick="displayCharacterDetail(${character.id})">View Details</button>
      `;
      content.appendChild(characterCard);
    });
  }

  // Fetch locations
  const locationResults = await fetchLocations(`?name=${query}`);
  if (locationResults.results.length > 0) {
    content.innerHTML += '<h2>Locations</h2>';
    locationResults.results.forEach(location => {
      const locationCard = document.createElement('div');
      locationCard.classList.add('card');
      locationCard.innerHTML = `
        <h2>${location.name}</h2>
        <p>Type: ${location.type}</p>
        <p>Dimension: ${location.dimension}</p>
        <button onclick="displayLocationDetail(${location.id})">View Details</button>
      `;
      content.appendChild(locationCard);
    });
  }

  // Fetch episodes
  const episodeResults = await fetchEpisodes(`?name=${query}`);
  if (episodeResults.results.length > 0) {
    content.innerHTML += '<h2>Episodes</h2>';
    episodeResults.results.forEach(episode => {
      const episodeCard = document.createElement('div');
      episodeCard.classList.add('card');
      episodeCard.innerHTML = `
        <h2>${episode.name}</h2>
        <p>Air Date: ${episode.air_date}</p>
        <p>Episode: ${episode.episode}</p>
        <button onclick="displayEpisodeDetail(${episode.id})">View Details</button>
      `;
      content.appendChild(episodeCard);
    });
  }

  if (content.innerHTML === `<div class="search-container">
      <input type="text" id="search-bar" placeholder="Search..." value="${query}">
      <button id="search-button">Search</button>
    </div>`) {
    content.innerHTML += '<p>No results found.</p>';
  }
}
