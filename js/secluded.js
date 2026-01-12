//Categories button
function categoriesFunction() {
  var categoryList = document.querySelector(".category-list");

  if (categoryList.classList.contains("show")) {
    categoryList.classList.remove("show");
  } else {
    categoryList.classList.add("show");
  }
}

//Carousel effect
//This following code/logic is adapted from the source:https://www.youtube.com/watch?v=OQZNAMjC6Vg used for the logic of the carousel effect
document.addEventListener("click", function (event) {
  const button = document.querySelector(".categories-row button");
  const list = document.querySelector(".category-list");

  if (!button.contains(event.target) && !list.contains(event.target)) {
    list.classList.remove("show");
  }
});

const productContainers = [...document.querySelectorAll(".product-container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });
  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});

const searchToggle = document.getElementById("searchToggle");
const searchOverlay = document.getElementById("searchOverlay");
const searchContainer = document.querySelector(".search-container");
const searchInput = document.getElementById("search-bar");
const searchList = document.querySelector(".search-result");

// Open search
searchToggle.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  searchOverlay.style.display = "block";
  searchInput.focus();
});

// Prevent overlay from closing when clicking inside search box
searchContainer.addEventListener("click", function (e) {
  e.stopPropagation();
});

// Close search when clicking outside the box
searchOverlay.addEventListener("click", function () {
  closeSearch();
});

// Close search with ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeSearch();
  }
});

// Helper function to close search
function closeSearch() {
  searchOverlay.style.display = "none";
  searchInput.value = "";
  filterSearchResults();
}

// (W3Schools adapted)

function filterSearchResults() {
  const filter = searchInput.value.toLowerCase();
  const li = searchList.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    const a = li[i].getElementsByTagName("a")[0];
    const txtValue = a.textContent.toLowerCase();

    // Allow partial & flexible matching
    li[i].style.display =
      txtValue.includes(filter) || filter.includes(txtValue) ? "block" : "none";
  }

  // Always show results container while typing
  searchList.style.display = "block";
}

// READ MORE

function toggleReadMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("readMoreButton");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "READ MORE";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "READ LESS";
    moreText.style.display = "inline";
  }
}

/*Toggle menu*/
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("show");
}
/*Toggle filter menu on mobile*/
function toggleFilters() {
  const filterContainer = document.getElementById("filter-container");
  filterContainer.classList.toggle("active");
}
