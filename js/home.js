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

function performSearch() {
  const query = document.getElementById('search-bar').value.trim().toLowerCase();
  if (query) {
    window.location.href = `results.html?query=${encodeURIComponent(query)}`;
  }
}

