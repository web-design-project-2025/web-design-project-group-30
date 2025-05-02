fetch("movie.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Check if the data is loaded correctly

    const movieList = document.getElementById("movie-list");
    if (movieList) {
      console.log("movieList element found"); // Check if the element exists
      data.movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
    <a href="detailed-movie-review-page.html?id=${movie.id}" class="movie-link">
            <img src="/img/${movie.poster}" alt="${movie.alt}">
          </a>
    `;

        movieList.appendChild(movieCard);
      });
    }
  })
  .catch((error) => console.error("Error loading movies:", error));