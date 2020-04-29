class API {

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

    async getData(){
        const url = new URL('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/');
        const myInit = this.buildRequestInit();
        
        
        const data = await fetch(url,myInit);
        const responseJSON = await data.json();

        return{
            responseJSON
        }
        
    }
}