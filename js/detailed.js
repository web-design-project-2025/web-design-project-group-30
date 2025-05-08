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
                        <span class="heart-icon">💜</span>
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
<div class="trailer-container">
    <iframe width="560" height="315" 
        src="${movie.trailer}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
    </iframe>
</div>

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
}

// Fetch JSON and build page
window.addEventListener("DOMContentLoaded", () => {
  fetch("detailed.json")
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
