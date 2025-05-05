document.addEventListener("DOMContentLoaded", () => {
  //Load saved name and avatar
  loadProfile();

  //Generating avatar
  document
    .getElementById("generateBtn")
    .addEventListener("click", generateAvatar);

  //Saving profile
  document.getElementById("saveBtn").addEventListener("click", saveProfile);

  function loadProfile() {
    const savedName = localStorage.getItem("userName");
    const savedAvatar = localStorage.getItem("userAvatar");

    if (savedName && savedAvatar) {
      document.getElementById("seedInput").value = savedName;
      document.getElementById("savedName").textContent = savedName;
      document.getElementById("avatar").src = savedAvatar;
    }
  }

  function generateAvatar() {
    const seedInputElement = document.getElementById("seedInput");
    const savedNameElement = document.getElementById("savedName");
    const avatarElement = document.getElementById("avatar");

    const seedInput = seedInputElement.value.trim();

    //Ensures an avatar still generates for users even without writing a name
    const seed = seedInput || Math.random().toString(36).substr(2, 8);
    const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(
      seed
    )}`;

    //Update avatar
    avatarElement.src = avatarUrl;

    if (seedInput) {
      savedNameElement.textContent = seedInput;
    }
    seedInputElement.value = "";
  }

  //Save the avatar and name to localStorage
  function saveProfile() {
    const seedInput = document.getElementById("seedInput").value.trim();
    const savedName =
      seedInput || document.getElementById("savedName").textContent;
    const avatarUrl = document.getElementById("avatar").src;

    localStorage.setItem("userName", savedName);
    localStorage.setItem("userAvatar", avatarUrl);
    //Update the name and avatar on screen if changed
    document.getElementById("savedName").textContent = savedName;
    document.getElementById("avatar").src = avatarUrl;

    alert("Profile saved!");
  }
});

/*Sources/Refrences
API taken from: https://www.dicebear.com/*/
