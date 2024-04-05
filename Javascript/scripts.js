const app = document.getElementById('root');
const container = document.createElement('div');
container.classList.add('container');

// Append elements to the app
app.appendChild(container);

// Fetch movies from API and display them
const fetchAndDisplayMovies = async () => {
  try {
    const response = await fetch('https://ghibli.rest/films');
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const movies = await response.json();
    displayMovies(movies);
  } catch (error) {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
    console.error('Error fetching movies:', error);
  }
};

// Display movies
const displayMovies = (movies) => {
  container.innerHTML = ''; // Clear previous movies
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('card');

    const h1 = document.createElement('h1');
    h1.textContent = movie.title;

    const p = document.createElement('p');
    p.textContent = movie.description.substring(0, 300) + '...';

    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(p);
  });
};

// Filter movies based on search term
const searchMovies = () => {
  const searchTerm = searchbar.value.toLowerCase(); // Convert search term to lowercase
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const title = card.querySelector('h1').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

// Get search bar element and attach event listener
const searchbar = document.getElementById('searchbar');
searchbar.addEventListener('input', searchMovies);

// Fetch and display movies when the page loads
fetchAndDisplayMovies();
