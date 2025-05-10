# 💜VELOUR⭐️ 
## Web Design Project Group 30 (Saara Hussein, Dania Al-Zubeidi and Kimberly Michalak)

A sleek and interactive web application showcasing a wide variety of movies to suit every preference. The users can browse high-quality posters, explore detailed movie information, and read audience reviews. The app allows users to choose from genres like comedy, action, and classic cinema. They can favorite their preferred movies, filter selections based on their interests, and even share their own opinions and ratings on films they’ve watched.

## Instructions:

Make sure you have the following:
- A modern browser (Chrome, Firefox)
- A code editor like [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/) (if using `live-server` or packages)

After you should clone the repository and open it on your VS-code.

- HTML files represent pages (home, genres, profile, etc.)
- CSS files style individual sections
- JS files handle dynamic content loading from JSON
- JSON files store movie metadata by genre and detiled-pages

### commits and merging 
1. Create a new branch: (bug-, feature-, styling-, ... branch)
2. Commit your changes frequently and well structured 
3. Push to the branch
4. When your done on the branch you open a pull request
5. Let it get reviewed by your team members
6. Merge it to the main branch


## Project Structure:

web-deign-project-group-30/

├── .vscode/ # VSCode settings
│ └── [settings files]
├── css/ # Stylesheets
│ ├── classics.css
│ ├── detailed-movie.css
│ ├── editorial.css
│ ├── favourite.css
│ ├── main.css
│ ├── profile.css
│ └── trending.css
├── data/ # JSON data files
│ ├── action.json
│ ├── all-movie.json
│ ├── classics.json
│ ├── comedy.json
│ ├── detailed.json
│ ├── documentary.json
│ ├── horror.json
│ ├── movie.json
│ ├── package-lock.json
│ ├── package.json
│ ├── romance.json
│ ├── science-fiction.json
│ └── trending.json
├── img/
│ └── [image files]
├── js/ # JavaScript files
│ ├── action.js
│ ├── allmovies.js
│ ├── avatarapi.js
│ ├── classics.js
│ ├── comedy.js
│ ├── detailed.js
│ ├── documentary.js
│ ├── favourite.js
│ ├── horror.js
│ ├── main.js
│ ├── profile.js
│ ├── romance.js
│ ├── science-fiction.js
│ ├── secluded.js
│ └── trending.js
├── node_modules/ # Node dependencies
│ └── [installed packages]
├── action.html
├── allmovie.html
├── classics.html
├── comedy.html
├── detailed-movie-review-page.html
├── documentary.html
├── editorial.html
├── favourite.html
├── horror.html
├── index.html # Entry point
├── profile.html
├── README.md
├── romance.html
├── science-fiction.html
└── trending.html


## Features:

- Display a variety of movie posters and detailed information
- User ratings and reviews
- Filter by stars and year
- Responsive layout
- Add movies to the favourites
- Change their own profile picture
- adding their own review and posting or deleting it from the feed

## Usage Guidelines:

1. Login Required
Users must log in to their account to access the full features of the website.
2. Navigation
On larger screens, users can navigate via a standard navigation bar.
On smaller screens, a hamburger menu is available for easy access.
3. Main Navigation Options
The navigation includes icons/links for:
- 🔍 Search
- 🎬 Explore All Movies
- 🎞️ Classics
- 📈 Trending
- 💜 Favourites
- 👤 Profile
Each section leads to a dedicated page with unique features and movie listings.
4. Filtering Options
On the Explore All Movies page, users can filter the movie list by:
⭐ Rating
📅 Release Year
5. Favourites
Users can add movies to their Favourites list to easily revisit them later.
6.Profile Customization
In the Profile section, users can customize their profile picture using a random image generator for a fun, personalized experience.

## Local Storage 

In this project we use the local storage for:
- the sign in pop-up
- the favourite feature
- API
- the review of the user 
The sign in pop-up saves the users login information and if they agree their password.
The favourite feature saves the id, titel and the poster of the movie the user wants to at to their favourite libary.
The API we use in this project enables the user to generate their profil picture on their profile page. Therfore the local storage gets used to save this information as well as the users name, location and language.
The user feed is also handled with local storage. Here we store the users name, raiting and review text and show it on the review feed. 
