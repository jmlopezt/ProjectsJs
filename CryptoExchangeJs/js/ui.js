class Interface {

    constructor(){
        this.init();
    }

    init(){
        this.buildCryptoSelection();
    }

    buildCryptoSelection (){
        const cryptoApi = new API('Your API key here');
        cryptoApi.getAPICoins()
            .then( coins => {
                const cryptoCoinSelector = document.getElementById('crypto');

                for (const [key, value] of Object.entries(coins.coins.Data)) {
                    const option = document.createElement('option');

                    option.value = value.Symbol;
                    option.appendChild(document.createTextNode(value.CoinName));

                    cryptoCoinSelector.appendChild(option);
                }
            })
    }

    showMessage (message, classes){
        const div = document.createElement('div');

        div.className = classes;
        div.appendChild(document.createTextNode(message));

        const messageDiv = document.querySelector('.messages');
        messageDiv.appendChild(div);

        setTimeout(() => {
            document.querySelector('.messages div').remove();
        }, 2000);
    }


    showResult (result, coin, cryptoCoin){

        const previousCard = document.querySelector('#result > div');

        if (previousCard) {
            previousCard.remove();
        }


        const parsedData = result[cryptoCoin][coin];
        let price = parsedData.PRICE.toFixed(3);
        let fromsymbol = parsedData.FROMSYMBOL;
        let tosymbol = parsedData.TOSYMBOL;
        let changepct = parsedData.CHANGEPCT24HOUR.toFixed(3);
        let utcSeconds = parsedData.LASTUPDATE;
        let d = new Date(0);
        d.setUTCSeconds(utcSeconds);

        let htmlTemplate = `
            <div class = "card">
                <div class = "card-body text-light" >
                    <h2 class = "card-title">Exchange:</h2>
                    <p> Price of ${fromsymbol} is ${price} ${tosymbol}</p>
                    <p> 24 Hours change: ${changepct} %</p>
                    <p> Last update: ${d.toLocaleDateString()}</p>
                </div>
            </div>
        `;

        this.handleSpinner('block');
        setTimeout(() => {
            document.querySelector('#result').innerHTML = htmlTemplate;
            this.handleSpinner('none');
        }, 2000);

        
    }

    handleSpinner(type){
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = type;
    }
}