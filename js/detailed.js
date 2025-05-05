// Parse URL parameter for the movie ID
function getMovieIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

function myFunction() {
  const dots = document.getElementById("dots");
  const moreText = document.getElementById("more");
  const btnText = document.getElementById("readMoreButton");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.textContent = "READ MORE";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.textContent = "READ LESS";
    moreText.style.display = "inline";
  }
}

// Build the detailed page
function buildDetailedPage(movie) {
  document.body.innerHTML = `
        <header>
            <a href="index.html"><p>LOGO</p></a>
        </header>
        <main>
            <div class="movie-header">
                <img class="movie-poster-detailed-review-page" src="${
                  movie.poster
                }" alt="${movie.title}">
                <div class="movie-information">
                    <div class="movie-titel-heart">
                        <h1>${movie.title}</h1>
                        <button class="favourite-button material-symbols-outlined" data-id="${movie.id}" data-title="${movie.title}" data-image="${movie.poster}">favorite</button>
                    </div>
                    <div class="star-rating">${movie.rating}</div>
                </div>
            </div>

            <h2>MOVIE SUMMARY</h2>
            <p>${movie.summary}</p>

            <h2>VELOUR'S REVIEW</h2>
            <p>
                ${movie["our-review"].slice(0, 200)}<span id="dots">...</span>
                <span id="more" style="display:none;">${movie[
                  "our-review"
                ].slice(200)}</span>
            </p>
            <button onclick="myFunction()" id="readMoreButton">READ MORE</button>

            <h2>CAST</h2>
            <section class="cast">
                ${movie.cast
                  .split(",")
                  .slice(0, 4)
                  .map(
                    (actor) => `
                    <figure>
                        <img class="cast-image" src="#" alt="#">
                        <figcaption class="cast-name">${actor.trim()}</figcaption>
                    </figure>
                `
                  )
                  .join("")}
            </section>

            <h2>TRAILER</h2>
            <p>VIDEO TRAILER HERE</p>

            <h2>COMMUNITY OPINION</h2>
            <h3>${movie["first-name"]}</h3>
            <p>${movie["first-rating"]}</p>
            <p>${movie["first-review"]}</p>
            <h3>${movie["second-name"]}</h3>
            <p>${movie["second-rating"]}</p>
            <p>${movie["second-review"]}</p>

            <h2>ADD YOUR OPINION</h2>
        </main>
        <footer>
            <p>© 2025 Velour</p>
        </footer>
    `;
    setTimeout(() => {
        const favButton = document.querySelector(".favourite-button");
        if (favButton) {
          favButton.addEventListener("click", (event) => {
            console.log("Favourite button clicked");

            event.preventDefault();
            const movieId = favButton.dataset.id;
            const movieTitle = favButton.dataset.title;
            const moviePoster = favButton.dataset.image;
      
            toggleFavourite(movieId, movieTitle, moviePoster);
          });
      
          updateFavouriteIcons(); // Show correct heart icon immediately
        }
      }, 0);
}

// Fetch JSON and build page
window.addEventListener("DOMContentLoaded", () => {
  fetch("data/detailed.json") // Ensure this file is in your project directory
    .then((response) => response.json())
    .then((data) => {
      const movieId = getMovieIdFromURL();
      const movie = data.details.find((m) => m.id === movieId);
      if (movie) {
        buildDetailedPage(movie);
      } else {
        document.getElementById("detailed-movie").innerHTML =
          "<p>Movie not found</p>";
      }
    })
    .catch((err) => {
      console.error("Error fetching movie data:", err);
      document.getElementById("detailed-movie").innerHTML =
        "<p>Error loading movie data</p>";
    });
});
