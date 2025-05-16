document.addEventListener("DOMContentLoaded", function () {
  updateFavouritesDisplay();

  //Add to favourites
  const favButtons = document.querySelectorAll(".favourite-button");
  for (let i = 0; i < favButtons.length; i++) {
    favButtons[i].addEventListener("click", function (event) {
      event.preventDefault();

      const movieId = this.dataset.id;
      const movieTitle = this.dataset.title;
      const moviePoster = this.dataset.poster;

      toggleFavourite(movieId, movieTitle, moviePoster);
    });
  }

  //Delete from favourites
  const favContainer = document.querySelector(".favourite-items");
  if (favContainer) {
    favContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-button")) {
        const movieId = event.target.dataset.id;
        removeFromFavourites(movieId);
        updateFavouritesDisplay();
      }
    });
  }
});

function toggleFavourite(id, title, poster) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const index = favourites.map((m) => m.id).indexOf(id);

  if (index > -1) {
    favourites.splice(index, 1);
  } else {
    favourites.push({ id: id, title: title, poster: poster });
  }

  localStorage.setItem("favourites", JSON.stringify(favourites));
  updateFavouritesDisplay();
  updateFavouriteIcons();
}

function updateFavouritesDisplay() {
  const favContainer = document.querySelector(".favourite-items");
  if (!favContainer) return;

  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favContainer.innerHTML = "";
  favContainer.classList.remove("grid-layout", "empty");

  if (favourites.length === 0) {
    favContainer.innerHTML = `
      <div class="empty-state">
        <img src="img/popcorn-for-empty-favourite.png" alt="No favorite movies found / popcorn bucket icon" />
        <p>You haven't added any movies to your favourites yet.</p>
        <a href="allmovie.html" class="browse-button">TAKE A LOOK AT ALL THE MOVIES</a>
      </div>
    `;
    return;
  }

  favContainer.classList.add("grid-layout");

  favourites.forEach((movie) => {
    console.log("Loading poster:", movie.poster);

    favContainer.innerHTML += `
      <div class="favourite-item">
        <img src="${movie.poster}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <button class="delete-button" data-id="${movie.id}">Delete</button>
      </div>
    `;
  });
}

//Remove from favourites
function removeFromFavourites(movieId) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const updated = favourites.filter((movie) => movie.id !== movieId);

  localStorage.setItem("favourites", JSON.stringify(updated));
}

//Heart icon button
function updateFavouriteIcons() {
  const buttons = document.querySelectorAll(".favourite-button");
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const favIds = favourites.map((movie) => movie.id);

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const id = button.dataset.id;
    const img = button.querySelector("img");

    const index = favIds.indexOf(id);

    if (img) {
      if (index > -1) {
        img.src = "img/favourite-filled.png";
        button.classList.add("filled");
      } else {
        img.src = "img/favourite-unfilled.png";
        button.classList.remove("filled");
      }
    }
  }
}
