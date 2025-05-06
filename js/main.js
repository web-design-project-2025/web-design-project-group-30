fetch("movie.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); 

    const movieList = document.getElementById("movie-list");
    if (movieList) {
      console.log("movieList element found"); 
      data.movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
    <a href="detailed-movie-review-page.html?id=${movie.id}" class="movie-link">
            <img src="/img/${movie.poster}" alt="${movie.alt}">
          </a>`; 

        movieList.appendChild(movieCard);
      });
    }
  })
  .catch((error) => console.error("Error loading movies:", error));