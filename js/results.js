// results.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const query = params.get('query');

    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close');
    const loader = document.getElementById('loader');

    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    const showLoader = () => {
        loader.classList.remove('hidden');
    };

    const hideLoader = () => {
        loader.classList.add('hidden');
    };

    if (type) {
        showLoader();
        switch (type) {
            case 'characters':
                fetchAndDisplayCharacters(query).then(hideLoader);
                break;
            case 'locations':
                fetchAndDisplayLocations(query).then(hideLoader);
                break;
            case 'episodes':
                fetchAndDisplayEpisodes(query).then(hideLoader);
                break;
            default:
                hideLoader();
        }
    } else if (query) {
        performSearchCharacter(query).then(hideLoader);
        performSearchLocation(query).then(hideLoader);
        performSearchEpisode(query).then(hideLoader);
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
                <div class="image-container">
                    <img src="${character.image}" alt="${character.name}">
                    <div class="overlay"></div>
                    <div class="text-overlay">
                        <h2>${character.name}</h2>
                        <button class="open-btn" onclick="showModal('character', ${character.id})">Details</button>
                    </div>
                </div>
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
                <div class="image-container">
                    <img src="${character.image}" alt="${character.name}">
                    <div class="overlay"></div>
                    <div class="text-overlay">
                        <h2>${character.name}</h2>
                        <button class="open-btn" onclick="showModal('character', ${character.id})">Details</button>
                    </div>
                </div>
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
                    <p>Episode: ${episode.episode}, ${episode.name}</summary>
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
                <strong><p>Status:</strong> ${data.status}</p>
                <strong><p>Species:</strong> ${data.species}</p>
                <strong><p>Gender:</strong> ${data.gender}</p>
                <strong><p>Origin: </strong>${data.origin.name}</p>
                <strong><p>Location: </strong>${data.location.name}</p>
                
            `;
            break;
        case 'location':
            data = await fetchLocationById(id);
            modalContent.innerHTML = `
                <h2>${data.name}</h2>
                <strong><p>Type:</strong> ${data.type}</p>
                <strong><p>Dimension:</strong> ${data.dimension}</p>
                <strong><p>Residents:</strong> ${data.residents.length}</p>
            `;
            break;
        case 'episode':
            data = await fetchEpisodeById(id);
            modalContent.innerHTML = `
                <h2>${data.name}</h2>
                <strong><p>Air Date:</strong> ${data.air_date}</p>
                <strong><p>Episode:</strong> ${data.episode}</p>
                <strong><p>Characters:</strong> ${data.characters.length}</p>
            `;
            break;
    }

    modal.style.display = 'flex'; // Afficher la modale
}
