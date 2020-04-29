export class API {
    constructor(artist,song){
        this.artist = artist;
        this.song = song;
    }

    buildRequestInit(){
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json; charset=utf-8");
        myHeaders.append("Access-Control-Allow-Origin", " *");



        const myInit = {
            method : 'GET',
            headers: myHeaders,
            mode : 'cors',
        };

        return{
            myInit
        }
    }
    async getLyricsFromOVH(){
        const url = `https://api.lyrics.ovh/v1/${this.artist}/${this.song}`;
        const myInit = this.buildRequestInit();

        const data = await fetch(url,myInit);
        const responseJSON = await data.json();

        return{
            responseJSON
        }
    }

    async getKanyeQuotes(){
        const url = 'https://api.kanye.rest';
        const myInit = this.buildRequestInit(); 
              
        const data = await fetch(url,myInit);
        const responseJSON = await data.json();

        return{
            responseJSON
        }
    }
}