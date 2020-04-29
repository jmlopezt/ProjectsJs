class API{
    constructor(apikey){
        this.key = apikey;
    }

    buildRequestInit(){
        const myHeaders = new Headers();
        myHeaders.append("authorization", this.key);

        const myInit = {
            method : 'GET',
            headers: myHeaders,
        };
        console.log(myInit);

        return{
            myInit
        }
    }

    async getAPICoins (){
        const url = `https://min-api.cryptocompare.com/data/all/coinlist`;
        const myInit = this.buildRequestInit();

        const urlGetCoins = await fetch(url,myInit);
        const coins = await urlGetCoins.json();
        console.log(coins);

        return {
            coins
        }
    }

    async getConverter(coin, cryptoCoin){
        const myInit = this.buildRequestInit();
        const url = new URL('https://min-api.cryptocompare.com/data/pricemultifull');
        const params = [["fsyms", cryptoCoin],["tsyms", coin]];

        url.search = new URLSearchParams(params).toString();

        const urlGetConverter = await fetch(url,myInit);
        const values = await urlGetConverter.json();
        console.log(values);

        return{
            values
        }
    }

}