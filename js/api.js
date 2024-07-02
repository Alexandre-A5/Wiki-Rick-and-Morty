// api.js
async function fetchAllCharacters(params = '') {
  let results = [];
  let nextUrl = `https://rickandmortyapi.com/api/character${params}`;

  while (nextUrl) {
      try {
          const response = await fetch(nextUrl);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          results = results.concat(data.results);
          nextUrl = data.info.next;
      } catch (error) {
          console.error('Fetch error:', error);
          nextUrl = null;
      }
  }

  return { results };
}

async function fetchAllLocations(params = '') {
  let results = [];
  let nextUrl = `https://rickandmortyapi.com/api/location${params}`;

  while (nextUrl) {
      try {
          const response = await fetch(nextUrl);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          results = results.concat(data.results);
          nextUrl = data.info.next;
      } catch (error) {
          console.error('Fetch error:', error);
          nextUrl = null;
      }
  }

  return { results };
}

async function fetchAllEpisodes(params = '') {
  let results = [];
  let nextUrl = `https://rickandmortyapi.com/api/episode${params}`;

  while (nextUrl) {
      try {
          const response = await fetch(nextUrl);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          results = results.concat(data.results);
          nextUrl = data.info.next;
      } catch (error) {
          console.error('Fetch error:', error);
          nextUrl = null;
      }
  }

  return { results };
}

async function fetchCharacterById(id) {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json();
}

async function fetchLocationById(id) {
  const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json();
}

async function fetchEpisodeById(id) {
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json();
}
