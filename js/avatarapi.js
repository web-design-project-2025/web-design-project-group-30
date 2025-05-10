document.addEventListener("DOMContentLoaded", () => {
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

  async function generateAvatar() {
    const seedInputElement = document.getElementById("seedInput");
    const savedNameElement = document.getElementById("savedName");
    const avatarElement = document.getElementById("avatar");

    const seedInput = seedInputElement.value.trim();

    //Ensures an avatar still generates for users even without writing a name
    const seed = seedInput || Math.random().toString(36).substr(2, 8);
    const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(
      seed
    )}`;

    /*Replace the above const URL with this to test out the error handling: 
    const avatarUrl = using this source "https://httpbin.org/status/500";*/

    try {
      const response = await fetch(avatarUrl, {
        method: "GET",
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      //Update avatar
      avatarElement.src = avatarUrl;
    } catch (error) {
      alert("Couldn't load the avatar. Reason: " + error.message);

      //Placeholder avatar
      avatarElement.src = "https://via.placeholder.com/100?text=Error";
      return;
    }

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
API taken from: https://www.dicebear.com/
HTTP API:https://www.dicebear.com/how-to-use/http-api/


encodeURIComponent: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
Template literals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

Async:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

Math.random + Number to string: 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString

Error handling: https://dev.to/thecharacterv/error-handling-in-the-javascript-fetch-api-1f7a
Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API*/
