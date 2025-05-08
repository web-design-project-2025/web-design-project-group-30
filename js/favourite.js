document.addEventListener("DOMContentLoaded", () => {
  updateFavouritesDisplay();

  // Handle Add to Favourites
  const favButtons = document.querySelectorAll(".favourite-button");
  favButtons.forEach((favButton) => {
    favButton.addEventListener("click", (event) => {
      event.preventDefault();

      const movieId = favButton.dataset.id;
      const movieTitle = favButton.dataset.title;
      const moviePoster = favButton.dataset.poster;

      toggleFavourite(movieId, movieTitle, moviePoster);
    });
  });

  // Handle Quantity Change & Deletion in Favourite Page
  const favContainer = document.querySelector(".favourite-items");
  if (favContainer) {
    favContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-button")) {
        const movieId = event.target.dataset.id;
        removeFromFavourites(movieId);
        updateFavouritesDisplay();
      }
    });
  }
});

// Toggle function that adds and deletes with the heart being pressed
function toggleFavourite(id, title, poster) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const exists = favourites.find((movie) => movie.id === id);

  if (exists) {
    // Remove if already in favourites
    favourites = favourites.filter((movie) => movie.id !== id);
  } else {
    // Add if not in favourites
    favourites.push({ id, title, poster });
  }

  localStorage.setItem("favourites", JSON.stringify(favourites));
  updateFavouritesDisplay();
  updateFavouriteIcons();
}

// Function to Display Favourite Items
function updateFavouritesDisplay() {
  const favContainer = document.querySelector(".favourite-items");
  if (!favContainer) return;

  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favContainer.innerHTML = "";

  favourites.forEach((movie) => {
    console.log("Loading poster:", movie.poster);

    favContainer.innerHTML += `
      <div class="favourite-item">
        <img src="${movie.poster}" alt="${movie.title}" />
        <h3>${movie.title}</h3> <!-- Added title -->
        <button class="delete-button" data-id="${movie.id}">Delete</button> <!-- Added delete button -->
      </div>
    `;
  });
}

//Remove a movie from favorites
function removeFromFavourites(movieId) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites = favourites.filter((movie) => movie.id !== movieId);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  updateFavouritesDisplay();
}

function updateFavouriteIcons() {
  const buttons = document.querySelectorAll(".favourite-button");
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  buttons.forEach((button) => {
    const id = button.dataset.id;
    const isFav = favourites.find((movie) => movie.id === id);
    const img = button.querySelector("img");

    if (img) {
      if (isFav) {
        img.src = "img/favourite-filled.png";
        button.classList.add("filled");
      } else {
        img.src = "img/favourite-unfilled.png";
        button.classList.remove("filled");
      }
    }
  });
}
