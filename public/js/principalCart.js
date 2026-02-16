import ExternalServices from "./ExternalServices.js";
import FavoriteTemplates from "./favoriteTemplates.js";
import ConceptBank from "./conceptBank.js";


const mainContent = document.querySelector('.match-content');

export default class PrincipalCart {

  constructor() {
    this.productsAPI = new ExternalServices();
    this.newMatchBtn = document.querySelector('.btn-secondary');

    this.favoriteMatchBtn = document.querySelector('.btn-primary');

    this.generateNewMatch(this.productsAPI);
    this.newMatchBtn.addEventListener("click", () => {
      this.generateNewMatch(this.productsAPI);
    });



    this.conceptData = ConceptBank();
    this.matchBibleVerse = this.matchBibleVerse;

    this.favoriteTemplates = new FavoriteTemplates();
  }



  async generateNewMatch(productsAPI) {
    const heroes = await productsAPI.getHeroes();
    const threeHEROES = heroes.slice(0, 5);
    const verse = await productsAPI.getRandomVerse();
    this.matchBibleVerse(this.conceptData, verse, threeHEROES);


    threeHEROES.map(hero => {
      const combat = hero.powerstats.combat;
      const durability = hero.powerstats.durability;
      const intelligence = hero.powerstats.intelligence;
      const power = hero.powerstats.power;
      const speed = hero.powerstats.speed;
      const strength = hero.powerstats.strength;

      const maxHability = Math.max(combat, durability, intelligence, power, speed, strength);
      let topHability;
      if (maxHability === combat) topHability = "Combat";
      else if (maxHability === durability) topHability = "Durability";
      else if (maxHability === intelligence) topHability = "Intelligence";
      else if (maxHability === power) topHability = "Power";
      else if (maxHability === speed) topHability = "Speed";
      else if (maxHability === strength) topHability = "Strength";

     
      
      
      this.displayCourseDetails(hero, topHability, verse);

    });

  }


  matchBibleVerse(conceptData, verse, threeHEROES) {
    const verseTEXT = verse.text.toLowerCase();
    //console.log(verse);
    //console.log(threeHEROES)
    for (const category in conceptData) {
      const keywords = conceptData[category].keywords;
      for (const word of keywords) {
        if (verseTEXT.includes(word)) {
          //console.log("Match en:", category, "||", word);
          return category;
        } else {
          threeHEROES.forEach(hero => {
            const stats = hero.powerstats;

            const topStat = Object.entries(stats).reduce((maxKey, [key, value]) => {
              return value > stats[maxKey] ? key : maxKey;
            }, Object.keys(stats)[0]);
            //console.log(topStat, "topStat")
            return topStat;

          })
        }
      }
    }
  }




  displayCourseDetails(hero, topHability, verse) {
    console.log(hero, "hero");
    console.log(verse, "verse")
    const abilityKey = topHability?.toLowerCase().trim();
    const ability = this.conceptData[abilityKey];
    mainContent.innerHTML = `
        
            <!-- Hero Side -->
            <div class="hero-side">
              <img src="${hero?.images.sm || "Hero without image"}" class="hero-icon"/>
              <h3 class="hero-name">${hero?.name || "Hero without name"}</h3>
              <p class="hero-alias">${hero?.biography.fullName || "Hero without Full name"})</p>
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
                ${hero?.name} is recognized for the strength reflected in ${topHability}, spiritually understood as ${ability?.concept} and described as ${ability?.description}. This trait aligns with ${verse?.book.author} ${verse?.chapter}:${verse?.number}, a passage that highlights the character, purpose, and spiritual depth behind every action.
                </div>
              </div>
            </div>
 
  `;
    const favButton = this.favoriteMatchBtn
      if (favButton) {
      
      this.favoriteTemplates.matchRendertoSet(hero, ability, verse, favButton,topHability);
    }

   
  }
}