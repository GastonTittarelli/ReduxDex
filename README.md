# 👾 Pokedex Web Application

Welcome to the **Pokedex Web Application**! This project showcases the first generation of Pokémon, featuring interactive elements, a favorites section, and detailed stats for each Pokémon. Below is a breakdown of the features and functionality implemented in this project.

## 📸 Screenshots

- **Home**
<img width="1918" height="918" alt="image" src="https://github.com/user-attachments/assets/89b114ca-824d-4808-90dd-420bfccdf80b" />

- **Favorite-view**
<img width="1918" height="918" alt="image" src="https://github.com/user-attachments/assets/eb7ce4fa-c716-4e47-967b-1183b9e40a45" />

- **Poke-Detail**
<img width="1918" height="918" alt="image" src="https://github.com/user-attachments/assets/c57c1dae-3f50-4cb9-804c-939d49c499ab" />



  
## Technologies Used

- **React** - A JavaScript library for building user interfaces.
- **Redux** - A predictable state container for JavaScript apps.
- **Webpack** - A module bundler for JavaScript applications.
- **Bubble**: A visual programming platform for building web applications without code, used to manage specific app functionalities in a more accessible way.
- **HTML5** - Markup language for structuring the web page.
- **JavaScript** - Interactive functionality.
- **CSS** - Styling for the application.
- **Axios**: A promise-based HTTP client used to fetch data from external APIs, including the Pokémon data from the Pokémon API.
- **Ant Design** - A UI design language and React UI library for web applications.

## Features

### Pokémon Cards
- **First Generation Pokémon:** All Pokémon from the first generation are displayed in cards.
- **Favorites:** You can mark any Pokémon as a favorite, and they will be added to your favorites list.
- **Detailed Information:** Click on any Pokémon card to open a modal with their full stats and details.

### Search and Pagination
- **Search:** A search bar is available to quickly find specific Pokémon.
- **Pagination:** Pokémon are divided into pages, with 24 Pokémon displayed per page for easy browsing.

### Favorites Section
- **Gengar-Themed Buttons:** In the favorites section, thematic Gengar buttons are designed for various actions:
  - One button removes all Pokémon from your favorites list.
  - Another button returns you to the main page.
  - When no Pokémon are favorited, a dynamic Pokéball button appears, simulating a real Pokéball.
  
### Dynamic Elements in Home
- **Pokéball and Gengar:** On the homepage, a Pokéball is placed next to the search bar. When you start adding Pokémon to your favorites:
  - A hidden Gengar appears from behind the Pokéball.
  - The color of the Pokéball changes.
  - When all favorites are removed, the Gengar hides again and the Pokéball returns to its original state.

### Pagination Styling
- **Pokéball-Themed Pagination:** The pagination buttons are styled as Pokéballs, with the currently active page having a distinct style.
