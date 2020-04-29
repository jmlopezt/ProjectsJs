const ui = new Interface();


const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(form);

    const coinSelector = document.getElementById('coin');
    const selectedCoin = coinSelector.options[coinSelector.selectedIndex].value;

    const cryptoCoinSelector = document.getElementById('crypto');
    const selectedCryptoCoin = cryptoCoinSelector.options[cryptoCoinSelector.selectedIndex].value;

    if(selectedCoin === '' || selectedCryptoCoin === ''){
        console.log('Choose your crypto!');
        ui.showMessage('Both fields are mandatory', 'alert bg-danger text-center')

    } else{
        console.log('Processing');
        const cryptoApi = new API('Your API key here');
        cryptoApi.getConverter(selectedCoin,selectedCryptoCoin)
            .then( data => {
                ui.showResult(data.values.RAW, selectedCoin, selectedCryptoCoin);
            })
    }

})