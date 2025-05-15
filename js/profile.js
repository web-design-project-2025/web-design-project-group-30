document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("userLanguage");
  const savedLocation = localStorage.getItem("userLocation");
  if (savedLanguage) {
    const languageDisplay = document.querySelector(
      ".dropdown-container .dropdown-toggle p"
    );
    if (languageDisplay) {
      languageDisplay.textContent = `${savedLanguage} ▾`;
    }
  }

  if (savedLocation) {
    const locationDisplay = document.querySelector(
      ".drop-up .dropdown-toggle p"
    );
    if (locationDisplay) {
      locationDisplay.textContent = `${savedLocation} ▴`;
    }
  }

  const allDropdownButtons = document.querySelectorAll(".dropdown-toggle");
  allDropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const dropdownContainer = event.target.closest(".dropdown-container");
      const dropdownMenu = dropdownContainer.querySelector(".dropdown");
      dropdownMenu.classList.toggle("show");
      dropdownMenu.classList.toggle("hidden");
    });
  });

  const languageOptions = document.querySelectorAll("#languageDropdown li");
  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const chosenLanguage = option.textContent;
      document.querySelector(
        ".dropdown-container .dropdown-toggle p"
      ).textContent = `${chosenLanguage} ▾`;
      localStorage.setItem("userLanguage", chosenLanguage);
      closeDropdown("languageDropdown");
    });
  });

  const locationOptions = document.querySelectorAll("#locationDropdown li");
  locationOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const chosenLocation = option.textContent;
      document.querySelector(
        ".drop-up .dropdown-toggle p"
      ).textContent = `${chosenLocation} ▴`;
      localStorage.setItem("userLocation", chosenLocation);
      closeDropdown("locationDropdown");
    });
  });
});

function closeDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.classList.remove("show");
    dropdown.classList.add("hidden");
  }
}
