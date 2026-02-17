
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

export default class FavoriteTemplates {
 
 constructor() {
    
        this.initFavoritesPage();
    }

    initFavoritesPage() {
       
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.checkAndRenderFavorites();
                
                
            });
        } else {
            this.checkAndRenderFavorites();
        }
    }
 checkAndRenderFavorites() {
        const favoritesContainer = document.querySelector('.favorites-grid');
       
        
        if (favoritesContainer) {
           
            this.renderFavoriteTemplate(favoritesContainer);
        }
    }
    matchRendertoSet(hero, ability, verse, favoriteMatchBtn, topHability) {

        favoriteMatchBtn.addEventListener("click", () => {

            const match = {
                hero: {
                    id: hero.id,
                    name: hero.name,
                    image: hero.images.sm,
                    fullName: hero.biography.fullName,
                    topAbility: topHability
                },
                concept: ability,
                verse: {
                    text: verse.text,
                    author: verse.book.author,
                    chapter: verse.chapter,
                    number: verse.number,
                    version: verse.book.version
                },
                savedAt: new Date().toISOString()
            };

            this.saveToFavorites(match);

            favoriteMatchBtn.textContent = "✅ Saved!";
            favoriteMatchBtn.disabled = true;

            setTimeout(() => {
                favoriteMatchBtn.textContent = "⭐ Save to Favorites";
                favoriteMatchBtn.disabled = false;
            }, 1000);
        });
    }

    saveToFavorites(match) {
        const existing = JSON.parse(localStorage.getItem("favorites")) || [];
        existing.push(match);
        localStorage.setItem("favorites", JSON.stringify(existing));
       
        

    }

    getFavoriteItems() {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    }


    renderFavoriteTemplate(mainContent) {
        if (!mainContent) {
         
            return;
        }

        const favorites = this.getFavoriteItems();

        if (favorites.length === 0) {
            mainContent.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">⭐</div>
                    <h3>No favorites yet</h3>
                    <p>Start exploring and save your favorite hero-scripture matches!</p>
                </div>
            `;
            return;
        }

        const html = favorites.map(match =>
            `
        
            <!-- Favorite Card 1 -->
            <div class="favorite-card">
                <div class="favorite-header">
                    <div class="favorite-hero">
                        <img class="favorite-hero-icon" src="${match.hero.image}"/>
                        <div>
                            <div class="favorite-hero-name">${match.hero.name}</div>
                            <div class="favorite-virtue-tag">${match.hero.topAbility}</div>
                        </div>
                    </div>
                    <button class="delete-btn" data-id="${match.savedAt}" aria-label="Delete favorite">🗑️</button>
                </div>
                <p class="favorite-verse-text">
                     ${match.hero.name} is recognized for the strength reflected in ${match.hero.topAbility}, spiritually understood as ${match.concept.concept} and described as ${match.concept.description}. This trait aligns with ${match.verse.author}${match.verse.chapter}:${match.verse.number}, a passage that highlights the character, purpose, and spiritual depth behind every action.
                </p>
                <p class="favorite-verse-ref">${match.verse.author}${match.verse.chapter}:${match.verse.number}</p>
            </div>
 
  `).join('');
        mainContent.innerHTML = html;


        const deleteButtons = mainContent.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const savedAt = e.target.dataset.id;
                this.deleteFavorite(savedAt);
                this.renderFavoriteTemplate(mainContent);
            });
        });
    }

    deleteFavorite(savedAt) {
        let favorites = this.getFavoriteItems();
        favorites = favorites.filter(match => match.savedAt !== savedAt);
        localStorage.setItem("favorites", JSON.stringify(favorites));

    }



   
    
}


new FavoriteTemplates();