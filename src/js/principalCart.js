import ExternalServices from "./ExternalServices.js";

const mainContent = document.querySelector('.match-content');

export default class PrincipalCart {

    constructor() {
        this.productsAPI = new ExternalServices();
        this.init(this.productsAPI);
        
    }

    async init(productsAPI) {
        const heroes = await productsAPI.getHeroes();
        const verse = await productsAPI.getRandomVerse();
      
            heroes.map(hero => {                
                const combat = hero.powerstats.combat;
                const durability = hero.powerstats.durability;
                const intelligence = hero.powerstats.intelligence;
                const power = hero.powerstats.power;
                const speed = hero.powerstats.speed;
                const strength = hero.powerstats.strength;

                const maxHability = Math.max(combat, durability, intelligence, power, speed, strength);
                
                let topHability;


                if (maxHability === combat) topHability = "Combat";
                else if (maxHability === durability)  topHability = "Durability";     
                else if (maxHability === intelligence) topHability = "Intelligence";
                else if (maxHability === power) topHability = "Power";
                else if (maxHability === speed) topHability = "Speed";
                else if (maxHability === strength) topHability = "Strength";
                
                this.displayCourseDetails(hero, topHability, verse);
            });

    }

    displayCourseDetails(hero, topHability, verse) {
         console.log(verse, "verse");
        mainContent.innerHTML = '';
        mainContent.innerHTML = `
        
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
                  Spider-Man's iconic mantra "With great power comes great
                  responsibility" perfectly mirrors this biblical principle.
                  Both teach that those blessed with abilities must use them to
                  serve others, not themselves.
                </div>
              </div>
            </div>
 
  `;

        //mainContent.appendChild(courseDetails);
        /*
        closeModal.addEventListener("click", () => {
            courseDetails.close();
        });
        */
    }

}