fetch("movie.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Check if the data is loaded correctly

    const movieList = document.getElementById("movie-list");
    if (movieList) {
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

  }
}

//sign in
function closeModal() {
  alert("You must sign in first.");
}

function signin() {
  const name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value.trim();

  if (name && password) {
    localStorage.setItem("isSignedIn", "true");
    localStorage.setItem("username", name);

    const modal = document.getElementById("modal");
    if (modal) modal.remove(); // Completely remove modal from the DOM

    alert("Successfully signed in");
  } else {
    alert("Please fill in both fields");
  }
}

function checkSignin() {
  const isSignedIn = localStorage.getItem("isSignedIn");
  const modal = document.getElementById("modal");

  if (isSignedIn === "true" && modal) {
    modal.remove(); // Remove it on load if already signed in
  }
}

window.addEventListener("DOMContentLoaded", function () {
  checkSignin();
});

/*Source/Refrences
Read More Button:
https://www.w3schools.com/howto/howto_js_read_more.asp*/

  })
  .catch((error) => console.error("Error loading movies:", error));

