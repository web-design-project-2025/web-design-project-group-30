document.getElementById('generateBtn').addEventListener('click', generateAvatar);
generateAvatar();

function generateAvatar() {
  const seedInput = document.getElementById('seedInput').value.trim();
  const seed = seedInput || Math.random().toString(36).substr(2, 8);
  const avatarUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;

  document.getElementById('avatar').src = avatarUrl;
}