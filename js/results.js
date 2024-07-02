// results.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const query = params.get('query');

    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close');

    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    if (type) {
        switch (type) {
            case 'characters':
                fetchAndDisplayCharacters(query);
                break;
            case 'locations':
                fetchAndDisplayLocations(query);
                break;
            case 'episodes':
                fetchAndDisplayEpisodes(query);
                break;
        }
    } else if (query) {
        performSearchCharacter(query);
        performSearchLocation(query);
        performSearchEpisode(query);
    }
});
async function performSearchCharacter(query) {
    const displayCharacter = document.getElementById('characters');
    displayCharacter.innerHTML = '';

    const characterResults = await fetchAllCharacters(`?name=${query}`);
    if (characterResults && characterResults.results.length > 0) {
        displayCharacter.innerHTML += '<h2 class="category-title">Characters</h2>';
        characterResults.results.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('cardCharacter');
            characterCard.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p>Status: ${character.status}</p>
                <p>Species: ${character.species}</p>
                <p>Gender: ${character.gender}</p>
                <button class="open-btn" onclick="showModal('character', ${character.id})">Details</button>
            `;  
            displayCharacter.appendChild(characterCard);
        });
    } else {
        displayCharacter.innerHTML += '<p>No characters found.</p>';
    }
}

async function performSearchLocation(query) {
    const displayLocations = document.getElementById('locations');
    displayLocations.innerHTML = '';

    const locationResults = await fetchAllLocations(`?name=${query}`);
    if (locationResults && locationResults.results.length > 0) {
        displayLocations.innerHTML += '<h2 class="category-title">Locations</h2>';
        locationResults.results.forEach(location => {
            const locationCard = document.createElement('div');
            locationCard.classList.add('cardLocation');
            locationCard.innerHTML = `
                <h2>${location.name}</h2>
                <p>Type: ${location.type}</p>
                <p>Dimension: ${location.dimension}</p>
                <button class="open-btn" onclick="showModal('location', ${location.id})">Details</button>
            `;
            displayLocations.appendChild(locationCard);
        });
    } else {
        displayLocations.innerHTML += '<p>No locations found.</p>';
    }
}

async function performSearchEpisode(query) {
    const displayEpisodes = document.getElementById('episodes');
    displayEpisodes.innerHTML = '';

    const episodeResults = await fetchAllEpisodes(`?name=${query}`);
    if (episodeResults && episodeResults.results.length > 0) {
        displayEpisodes.innerHTML += '<h2 class="category-title">Episodes</h2>';
        episodeResults.results.forEach(episode => {
            const episodeCard = document.createElement('div');
            episodeCard.classList.add('cardEpisode');
            episodeCard.innerHTML = `
                <h2>${episode.name}</h2>
                <p>Air Date: ${episode.air_date}</p>
                <p>Episode: ${episode.episode}</p>
                <button class="open-btn" onclick="showModal('episode', ${episode.id})">Details</button>
            `;
            displayEpisodes.appendChild(episodeCard);
        });
    } else {
        displayEpisodes.innerHTML += '<p>No episodes found.</p>';
    }
}


async function fetchAndDisplayCharacters(query) {
    const displayCharacter = document.getElementById('characters');
    const characterResults = await fetchAllCharacters(query ? `?name=${query}` : '');
    if (characterResults.results.length > 0) {
        displayCharacter.innerHTML = '<h2 class="category-title">Characters</h2>'; // Clear and set the title
        characterResults.results.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('cardCharacter');
            characterCard.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p>Status: ${character.status}</p>
                <p>Species: ${character.species}</p>
                <p>Gender: ${character.gender}</p>
                <button class="open-btn" onclick="showModal('character', ${character.id})">Details</button>
            `;
            displayCharacter.appendChild(characterCard);
        });
    } else {
        displayCharacter.innerHTML = '<p>No characters found.</p>';
    }
}

async function fetchAndDisplayLocations(query) {
    const displayLocations = document.getElementById('locations');
    const locationResults = await fetchAllLocations(query ? `?name=${query}` : '');
    if (locationResults.results.length > 0) {
        displayLocations.innerHTML = '<h2 class="category-title">Locations</h2>'; // Clear and set the title
        locationResults.results.forEach(location => {
            const locationCard = document.createElement('div');
            locationCard.classList.add('cardLocation');
            locationCard.innerHTML = `
                <h2>${location.name}</h2>
                <p>Type: ${location.type}</p>
                <p>Dimension: ${location.dimension}</p>
                <button class="open-btn" onclick="showModal('location', ${location.id})">Details</button>
            `;
            displayLocations.appendChild(locationCard);
        });
    } else {
        displayLocations.innerHTML = '<p>No locations found.</p>';
    }
}

async function fetchAndDisplayEpisodes(query) {
    const displayEpisodes = document.getElementById('episodes');
    const episodeResults = await fetchAllEpisodes(query ? `?name=${query}` : '');
    if (episodeResults.results.length > 0) {
        displayEpisodes.innerHTML = '<h2 class="category-title">Episodes</h2>'; // Clear and set the title
        episodeResults.results.forEach(episode => {
            const episodeCard = document.createElement('div');
            episodeCard.classList.add('cardEpisode');
            episodeCard.innerHTML = `
                <h2>${episode.name}</h2>
                <p>Air Date: ${episode.air_date}</p>
                <p>Episode: ${episode.episode}</p>
                <button class="open-btn" onclick="showModal('episode', ${episode.id})">Details</button>
            `;
            displayEpisodes.appendChild(episodeCard);
        });
    } else {
        displayEpisodes.innerHTML = '<p>No episodes found.</p>';
    }
}

async function showModal(type, id) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-body');

    let data;
    switch (type) {
        case 'character':
            data = await fetchCharacterById(id);
            modalContent.innerHTML = `
                <h2>${data.name}</h2>
                <img src="${data.image}" alt="${data.name}">
                <p>Status: ${data.status}</p>
                <p>Species: ${data.species}</p>
                <p>Gender: ${data.gender}</p>
                <p>Origin: ${data.origin.name}</p>
                <p>Location: ${data.location.name}</p>
            `;
            break;
        case 'location':
            data = await fetchLocationById(id);
            modalContent.innerHTML = `
                <h2>${data.name}</h2>
                <p>Type: ${data.type}</p>
                <p>Dimension: ${data.dimension}</p>
                <p>Residents: ${data.residents.length}</p>
            `;
            break;
        case 'episode':
            data = await fetchEpisodeById(id);
            modalContent.innerHTML = `
                <h2>${data.name}</h2>
                <p>Air Date: ${data.air_date}</p>
                <p>Episode: ${data.episode}</p>
                <p>Characters: ${data.characters.length}</p>
            `;
            break;
    }

    modal.style.display = 'flex'; // Afficher la modale
}
