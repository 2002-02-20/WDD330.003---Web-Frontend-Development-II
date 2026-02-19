import { TOKENBIBLE, TOKENHERO, bibleAPI, herosAPI } from "./keys.js";


export default class ExternalServices {

    //biblieApi
    async getBooks() {
        const url = `${bibleAPI}/api/books`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKENBIBLE}`,
                'Content-Type': 'application/json'
            }
        });


        const data = await response.json();
        //console.log(data);
        return data;

    }
/*
    //random verse
    async getRandomVerse() {
        const url = `${bibleAPI}/api/verses/bbe/random`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKENBIBLE}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        //console.log(data, "random verse");
        return data;

    }
  */
    
        //TEST FUNCION
       async getRandomVerse() {
        try {
            const response = await fetch("/dataTest/bible.json");
            const result = await response.json();
                  
            const randomIndex = Math.floor(Math.random() * result.length);
            return result[randomIndex]; o
            
        } catch (error) {
            console.error("Error loading local verse:", error);
            return null;
        }
    }
  
    //random verse
    async getRandomVerseBook() {
        const url = `${bibleAPI}/api/verses/bbe/en/random`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKENBIBLE}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;

    }

 /*
    //Superhores
    async getHeroes() {
        const url = `${herosAPI}/api/heroes`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': `${TOKENHERO}`,
                'x-rapidapi-host': 'superhero-search.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error) {
            return error;
        }
    }
 */
   
    //TEST FUNCION
      async getHeroes() {
      try {
        const response = await fetch("/dataTest/hero.json");
        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Error loading local heroes:", error);
        return [];
      }
    }
   
}
