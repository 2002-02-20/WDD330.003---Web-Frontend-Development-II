import ExternalServices from "./ExternalServices.js";
const mainContent = document.querySelector('.device')

export default class ExploreHeroes {

    constructor() {
        this.productsAPI = new ExternalServices();
        this.init(this.productsAPI);

    }

    async init(productsAPI) {
        const heroes = await productsAPI.getHeroes();
        const threeHEROES = heroes.slice(0, 10);
        this.displayCartHeroeDetails(threeHEROES);
    }



    displayCartHeroeDetails(threeHEROES) {



        mainContent.innerHTML = threeHEROES.map(hero =>


            ` 
        <div class="main-content">
            <div class="explore-grid">
                <!-- Mini Match Card 1 -->
              <div class="mini-match-card">
                <div class="mini-hero">
                  <div class="mini-hero-icon"></div>
                 <img class="favorite-hero-icon" src="${hero?.images.sm}"/>
                </div>
                <div class="mini-verse">
                  <p class="mini-verse-text">
                    ${hero?.name}
                  </p>
                  <p class="mini-verse-text">
                    Race: ${hero?.appearance.race}
                  </p>
                  <p class="mini-verse-text">
                    height: ${hero?.appearance.height}
                  </p>
                  <p class="mini-verse-text">
                    weight: ${hero?.appearance.weight}
                  </p>
                   <p class="mini-verse-text">
                    Biography
                  </p>
                  <p class="mini-verse-text">
                    fullName: ${hero?.biography.fullName}
                  </p>
                  <p class="mini-verse-text">
                    Aliases: ${hero?.biography.aliases}
                  </p>
                   <p class="mini-verse-text">
                    Place Of Birth: ${hero?.biography.placeOfBirth}
                  </p>
                  <p class="mini-verse-text">
                    First Appearance: ${hero?.biography.firstAppearance}
                  </p>
                   <p class="mini-verse-text">
                    Publisher: ${hero?.biography.publisher}
                  </p>
                   <p class="mini-verse-text">
                    Work - occupation: ${hero?.work.occupation}
                  </p>
                  <p class="mini-verse-ref">${Object.keys(hero?.powerstats)[0]}</p>
                  <p class="mini-verse-ref">${hero?.powerstats.intelligence}</p>
                    <p class="mini-verse-ref">${Object.keys(hero?.powerstats)[1]}</p>
                  <p class="mini-verse-ref">${hero?.powerstats.strength}</p>
                    <p class="mini-verse-ref">${Object.keys(hero?.powerstats)[2]}</p>
                  <p class="mini-verse-ref">${hero?.powerstats.speed}</p>
                    <p class="mini-verse-ref">${Object.keys(hero?.powerstats)[3]}</p>
                  <p class="mini-verse-ref">${hero?.powerstats.durability}</p>
                    <p class="mini-verse-ref">${Object.keys(hero?.powerstats)[4]}</p>
                  <p class="mini-verse-ref">${hero?.powerstats.power}</p>
                    <p class="mini-verse-ref">${Object.keys(hero?.powerstats)[5]}</p>
                  <p class="mini-verse-ref">${hero?.powerstats.combat}</p>
                </div>
              </div> 
            </div>
        </div> 
          ` ).join("");
        ;
    }
}

new ExploreHeroes()

//  <p class="mini-verse-ref">${Object.keys(hero?.powerstats[0])}</p>