const bibleAPI = "https://www.abibliadigital.com.br";
const herosAPI = "https://superhero-search.p.rapidapi.com";
const TOKENBIBLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJXZWQgRmViIDExIDIwMjYgMDI6NTQ6NDggR01UKzAwMDAuNjk3NTFlZGQ0NDE2MWMwMDI4MTU4MDdiIiwiaWF0IjoxNzcwNzc4NDg4fQ.gG5xLxOUprYuxkqhd5R8XUV3Xnd0kVxTQVq9av4AQjY";

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


    //Superhores
    async getHeroes() {


        const url = `${herosAPI}/api/heroes`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '8682f38cf7msh579e2fa96670bd4p142d07jsn783276a297fc',
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



}