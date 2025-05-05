document.addEventListener("DOMContentLoaded", () => {
    updateFavouritesDisplay();
  
     // Handle Add to Favourites
     const favButtons = document.querySelectorAll(".favourite-button");
     favButtons.forEach((favButton) => {
       favButton.addEventListener("click", (event) => {
         event.preventDefault();
     
         const movieId = favButton.dataset.id;
         const movieTitle = favButton.dataset.title;
         const movieImage = favButton.dataset.poster;
     
         toggleFavourite(movieId, movieTitle, movieImage);
       });
     });

// Handle Quantity Change & Deletion in Favourite Page
    const favContainer = document.querySelector(".favourite-items");
    if (favContainer) {
      favContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-button")) {
          const movieId = event.target.dataset.id;
          removeFromFavourites(movieId);
          updateFavouriteIcons();
        }
      });
    }
  });
  // Toggle fuction that adds and deletes with the heart being pressed
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
  
  // Function to Display Cart Items
  function updateFavouritesDisplay() {
    const favContainer = document.querySelector(".favourite-items");
    if (!favContainer) return;
  
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    favContainer.innerHTML = "";
  
    favourites.forEach((movie) => {
        const movieImage = `img/${movie.poster}`;
      favContainer.innerHTML += `
        <div class="favourite-item">
          <img src="img/${movie.poster}" alt="${movie.title}" />
        </div>
      `;
    });
  }

  function updateFavouriteIcons() {
    const buttons = document.querySelectorAll(".favourite-button");
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  
    buttons.forEach((button) => {
      const id = button.dataset.id;
      const isFav = favourites.find((movie) => movie.id === id);
  
      if (isFav) {
        button.classList.add("filled");

      } else {
        button.classList.remove("filled");

      }
    });
  }
  
  