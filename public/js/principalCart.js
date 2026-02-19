import ExternalServices from "./ExternalServices.js";
import FavoriteTemplates from "./favoriteTemplates.js";
import ConceptBank from "./conceptBank.js";

const mainContent = document.querySelector('.match-card');

export default class PrincipalCart {

  constructor() {
    this.productsAPI = new ExternalServices();
    this.newMatchBtn = document.querySelector('.btn-secondary');
    this.favoriteMatchBtn = document.querySelector('.btn-primary');
    this.conceptData = ConceptBank();
    this.favoriteTemplates = new FavoriteTemplates();
    this.mayoirPowerstats =null;
    
    this.generateNewMatch(this.productsAPI);

    mainContent.addEventListener("click", (e) => {
      
        if (e.target.classList.contains('btn-secondary')) {
            this.generateNewMatch(this.productsAPI);
        }
        

        if (e.target.classList.contains('btn-primary')) {
            this.saveFavorite();
        }
    });

  }

  async generateNewMatch(productsAPI) {
   
    const heroes = await productsAPI.getHeroes();
    const threeHEROES = heroes.slice(0, 40); //obtener un array de objetos hero
    const verse = await productsAPI.getRandomVerse();  //obtener random verse
    const verseTEXT = verse.text.toLowerCase();

    let categoryconceptBank; // incluye la palabra la categoria que coicidio con la palabra 
    for (const category in this.conceptData) {
      const keywords = this.conceptData[category].keywords;
      for (const word of keywords) {
        if (verseTEXT.includes(word)) {
          categoryconceptBank = category;
        }
      }
    }
    const hero = threeHEROES.find(heroITEM => {
      const combat = heroITEM.powerstats.combat;
      const durability = heroITEM.powerstats.durability;
      const intelligence = heroITEM.powerstats.intelligence;
      const power = heroITEM.powerstats.power;
      const speed = heroITEM.powerstats.speed;
      const strength = heroITEM.powerstats.strength;

      const maxHability = Math.max(combat, durability, intelligence, power, speed, strength);
      let topHability;

     
      if (maxHability === combat) topHability = "combat";
      else if (maxHability === durability) topHability = "durability";
      else if (maxHability === intelligence) topHability = "intelligence";
      else if (maxHability === power) topHability = "power";
      else if (maxHability === speed) topHability = "speed";
      else if (maxHability === strength) topHability = "strength";
      this.mayoirPowerstats = topHability;
         console.log(this.mayoirPowerstats, categoryconceptBank)
      return categoryconceptBank === this.mayoirPowerstats;
    });
    
    this.displayCourseDetails(hero, this.mayoirPowerstats, verse, this.conceptData)
    
   
  }

saveFavorite() {
  
    if (!this.currentHero || !this.currentVerse || !this.mayoirPowerstats) {
        
        return;
    }

    const match = {
        hero: {
            id: this.currentHero.id,
            name: this.currentHero.name,
            image: this.currentHero.images.sm,
            fullName: this.currentHero.biography.fullName,
            topAbility: this.mayoirPowerstats
        },
        concept: this.conceptData[this.mayoirPowerstats],
        verse: {
            text: this.currentVerse.text,
            author: this.currentVerse.book.author,
            chapter: this.currentVerse.chapter,
            number: this.currentVerse.number,
            version: this.currentVerse.book.version
        },
        savedAt: new Date().toISOString()
    };

    this.favoriteTemplates.saveToFavorites(match);

    // Feedback visual
    const btn = document.querySelector('.btn-primary');
    if (btn) {
        btn.textContent = "✅ Saved!";
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = "⭐ Save to Favorites";
            btn.disabled = false;
        }, 1000);
    }
}


displayCourseDetails(hero, topHability, verse, conceptData) {

    this.currentHero = hero;
    
    this.currentVerse = verse;

  mainContent.innerHTML =
    `  
          <div class="match-content">
            <!-- Hero Side -->
            <div class="hero-side">
              <img src="${hero?.images.sm || "Hero without image"}" class="hero-icon"/>
              <h3 class="hero-name">${hero?.name || "Hero without name"}</h3>
              <p class="hero-alias">${hero?.biography.fullName || "Hero without Full name"}</p>
              <div class="hero-virtue">${topHability}</div>
            </div>

            <!-- Verse Side -->
            <div class="verse-side">
              <div class="verse-icon">✨</div>
              <div class="verse-text">
                ${verse?.text || "Verse without text"}
              </div>
              <div class="verse-reference">— ${verse?.book.author} ${verse?.chapter}:
              ${verse?.number}
              (${verse?.book.version.toUpperCase() || "No version available"})</div>

              <div class="connection-box">
                <div class="connection-label">🔗 The Connection</div>
                <div>
                ${hero?.name} is recognized for the strength reflected in ${topHability}, spiritually understood as ${conceptData[topHability].concept} and described as ${conceptData[topHability].description}. This trait aligns with ${verse?.book.author} ${verse?.chapter}:${verse?.number}, a passage that highlights the character, purpose, and spiritual depth behind every action.
                </div>
              </div>
            </div>
          </div>
          <div class="match-actions">
            <button class="action-btn btn-primary">⭐ Save to Favorites</button>
            <button class="action-btn btn-secondary">🔄 Get New Match</button>
          </div>

  `;
  const favoriteMatchBtn = this.favoriteMatchBtn
  if (favoriteMatchBtn) {
    this.favoriteTemplates.matchRendertoSet(hero, verse, favoriteMatchBtn, topHability, conceptData);
  }
}
}

