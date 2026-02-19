import ExternalServices from "./ExternalServices.js";
const mainContent = document.querySelector('.explore-grid-explore')

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
       
<div class="mini-match-card">
    <div class="mini-hero">
        <img class="favorite-hero-icon" src="${hero?.images.sm}" alt="${hero?.name}"/>
    </div>
    
    <div class="mini-verse">
        <!-- Nombre del héroe -->
        <p>${hero?.name}</p>
        
        <!-- Appearance Section -->
        <div class="info-section">
            <div class="info-section-title">Appearance</div>
            <p class="mini-verse-text"><strong>Race:</strong> ${hero?.appearance.race || 'Unknown'}</p>
            <p class="mini-verse-text"><strong>Height:</strong> ${hero?.appearance.height[1] || 'Unknown'}</p>
            <p class="mini-verse-text"><strong>Weight:</strong> ${hero?.appearance.weight[1] || 'Unknown'}</p>
        </div>
        
        <!-- Biography Section -->
        <div class="info-section">
            <div class="info-section-title">Biography</div>
            <p class="mini-verse-text"><strong>Full Name:</strong> ${hero?.biography.fullName || 'Unknown'}</p>
            <p class="mini-verse-text"><strong>Publisher:</strong> ${hero?.biography.publisher || 'Unknown'}</p>
            <p class="mini-verse-text"><strong>First Appearance:</strong> ${hero?.biography.firstAppearance || 'Unknown'}</p>
        </div>
        
        <!-- Powerstats Section -->
        <div class="info-section">
            <div class="info-section-title">Power Stats</div>
            <div class="powerstat-item">
                <span class="powerstat-label">Intelligence</span>
                <span class="powerstat-value">${hero?.powerstats.intelligence}</span>
            </div>
            <div class="powerstat-item">
                <span class="powerstat-label">Strength</span>
                <span class="powerstat-value">${hero?.powerstats.strength}</span>
            </div>
            <div class="powerstat-item">
                <span class="powerstat-label">Speed</span>
                <span class="powerstat-value">${hero?.powerstats.speed}</span>
            </div>
            <div class="powerstat-item">
                <span class="powerstat-label">Durability</span>
                <span class="powerstat-value">${hero?.powerstats.durability}</span>
            </div>
            <div class="powerstat-item">
                <span class="powerstat-label">Power</span>
                <span class="powerstat-value">${hero?.powerstats.power}</span>
            </div>
            <div class="powerstat-item">
                <span class="powerstat-label">Combat</span>
                <span class="powerstat-value">${hero?.powerstats.combat}</span>
            </div>
        </div>
    </div>
</div>`).join("");
        ;
    }
}

new ExploreHeroes()

//  <p class="mini-verse-ref">${Object.keys(hero?.powerstats[0])}</p>