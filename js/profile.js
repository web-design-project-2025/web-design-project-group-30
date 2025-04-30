document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem('userLanguage');
    const savedLocation = localStorage.getItem('userLocation');
  
    if (savedLanguage) {
      const langToggle = document.querySelector('.dropdown-container .dropdown-toggle p');
      if (langToggle) langToggle.textContent = `${savedLanguage} ▾`;
    }
  
    if (savedLocation) {
      const locToggle = document.querySelector('.drop-up .dropdown-toggle p');
      if (locToggle) locToggle.textContent = `${savedLocation} ▴`;
    }
  
    //Dropdown visibility
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        const dropdown = e.target.closest('.dropdown-container').querySelector('.dropdown');
        dropdown.classList.toggle('show');
        dropdown.classList.toggle('hidden');
      });
    });
  
    //Select language
    document.querySelectorAll('#languageDropdown li').forEach(item => {
      item.addEventListener('click', () => {
        const text = item.textContent;
        document.querySelector('.dropdown-container .dropdown-toggle p').textContent = `${text} ▾`;
        localStorage.setItem('userLanguage', text);
        closeDropdown('languageDropdown');
      });
    });
  
    //Select location
    document.querySelectorAll('#locationDropdown li').forEach(item => {
      item.addEventListener('click', () => {
        const text = item.textContent;
        document.querySelector('.drop-up .dropdown-toggle p').textContent = `${text} ▴`;
        localStorage.setItem('userLocation', text);
        closeDropdown('locationDropdown');
      });
    });
  });
  
  //Close dropdown
  function closeDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
      dropdown.classList.remove('show');
      dropdown.classList.add('hidden');
    }
  }
  