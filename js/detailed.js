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
                        <button class="favourite-button" data-id="${movie.id}" data-title="${movie.title}" data-poster="${movie.poster}"><img src="img/favourite-unfilled.png" alt="Favourite" class="heart-icon" /></button>
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
            ${movie.cast.slice(0, 4).map(actor => `
                <figure>
                  <img class="cast-image" src="${actor.image}" alt="${actor.name}">
                  <figcaption class="cast-name">${actor.name}</figcaption>
                </figure>
              `).join('')}
              
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

            <div class="review-feed" id="reviewFeed"></div>

            <h2>ADD YOUR OPINION</h2>
            <div class="review-form">
             <label for="rating">MOVIE RANKING:</label>
             <div id="starRating" class="star-rating-input"></div> 
             <label for="nameInput">USERNAME:</label>
             <input type="text" id="nameInput" placeholder="Your name" />
             <label for="reviewInput">PERSONAL REVIEW:</label>
             <textarea id="reviewInput" placeholder="Tell us your opinion..."></textarea>
             <button onclick="saveMessage()">PUBLISH  MY REVIEW</button> </div>
        </main>
        <footer>
            <p>© 2025 Velour</p>
        </footer>
    `;
  setupStarRating();
  loadreview();
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
      
          updateFavouriteIcons(); 
        }
      }, 0);
}

// Fetch JSON and build page
window.addEventListener("DOMContentLoaded", () => {
  fetch("data/detailed.json")
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

//loads saved reviews from the localStorage and shows them
function loadreview() {
  const movieId = getMovieIdFromURL();
  const storageKey = `review-${movieId}`;
  const reviews = JSON.parse(localStorage.getItem(storageKey)) || [];
  const feed = document.getElementById("reviewFeed");
  feed.innerHTML = "";

  reviews.forEach((entry, index) => {
    const div = document.createElement("div");
    div.className = "review";
    const stars = "★".repeat(entry.rating) + "☆".repeat(5 - entry.rating);

    div.innerHTML = `
        <strong>${entry.name}</strong> (${stars})<br>
        ${entry.text}
        <button class="delete-btn" onclick="deleteReview(${index})">X</button>
      `;

    feed.appendChild(div);
  });
}

//saved the review to the localStorage
function saveMessage() {
  const name = document.getElementById("nameInput").value.trim();
  const text = document.getElementById("reviewInput").value.trim();

  if (!name || !text || selectedRating === 0) {
    alert("Not done yet! Please complete all fields including a star rating.");
    return;
  }

  const movieId = getMovieIdFromURL();
  const storageKey = `review-${movieId}`;
  const review = JSON.parse(localStorage.getItem(storageKey)) || [];
  review.push({ name, text, rating: selectedRating });
  localStorage.setItem(storageKey, JSON.stringify(review));

  document.getElementById("nameInput").value = "";
  document.getElementById("reviewInput").value = "";
  selectedRating = 0;
  setupStarRating();

  loadreview();
}

//enable the own star raiting
let selectedRating = 0;

function setupStarRating() {
  const container = document.getElementById("starRating");
  container.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = "★";
    star.classList.add("star");
    star.dataset.value = i;

    star.addEventListener("click", () => {
      selectedRating = i;
      updateStarDisplay(container, i);
    });

    container.appendChild(star);
  }
}

function updateStarDisplay(container, rating) {
  const stars = container.querySelectorAll(".star");
  stars.forEach((star, index) => {
    star.classList.toggle("selected", index < rating);
  });
}

function deleteReview(index) {
  const movieId = getMovieIdFromURL();
  const storageKey = `review-${movieId}`;
  const reviews = JSON.parse(localStorage.getItem(storageKey)) || [];

  reviews.splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(reviews));
  loadreview();
}

//gives a confirmation if user really wants to delete their review
function deleteReview(index) {
  const confirmed = confirm("Are you sure you want to delete your review?");
  if (!confirmed) return;

  const movieId = getMovieIdFromURL();
  const storageKey = `review-${movieId}`;
  const reviews = JSON.parse(localStorage.getItem(storageKey)) || [];

  reviews.splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(reviews));
  loadreview();
}

//displays saved reviews when the page loads
window.onload = loadreview;
