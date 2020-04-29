// Primero con prototypes, luego con classes

function Insurance (trademark, year, type){
    this.trademark = trademark;
    this.year = year;
    this. type = type;

}

Insurance.prototype.calculatePolicy = function(){
    let amount;
    const base = 1500;

    switch(this.trademark){
        case '1': 
            amount = base * 1.15;
            break;
        case '2': 
            amount = base * 1.05;
            break;
        case '3': 
            amount = base * 1.35;
            break;
    }

    const subs = new Date().getFullYear() - this.year;
    amount -= ((subs * 3) * amount) / 100; 

    if(this.type === 'basico'){
        amount = amount * 1.2;
    } else{
        amount = amount * 1.5;
    }
    return amount;
}

function Interface(){}

Interface.prototype.showMessage = function (message, code){
    const div = document.createElement('div');

    if(code === 'error'){
        div.classList.add('message','error');
    } else{
        div.classList.add('message','correct');
    }
    div.innerHTML = `${message}`;
    form.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(() => {
        document.querySelector('.message').remove();
    }, 300);
}

Interface.prototype.showResult = function (insurance, amount){
    const result = document.getElementById('resultado');
    let trademark;

    switch(insurance.trademark){
        case '1': 
            trademark = 'Americano';
            break;
        case '2': 
            trademark = 'Europe';
            break;
        case '3': 
            trademark = 'Asiatico';
            break;
    }

    const div = document.createElement('div');
    div.innerHTML = `
        <p class = 'header'>Summary: </p> 
        <p>Trademark: ${insurance.trademark}</p>
        <p>Year: ${insurance.year}</p>
        <p>Type: ${insurance.type}</p>
        <p>Total: ${amount} €</p>
    `;

    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        result.appendChild(div);
    }, 300);
    
}

const form = document.getElementById('cotizar-seguro');

form.addEventListener('submit',function(e){
    e.preventDefault();

    const trademark = document.getElementById('marca');
    const selectedTrademark = trademark.options[trademark.selectedIndex].value;

    const year = document.getElementById('anio');
    const selectedYear = year.options[year.selectedIndex].value;

    const type = document.querySelector('input[name="tipo"]:checked').value;

    const interface = new Interface();

    if(selectedTrademark === '' || selectedYear === '' || type === ''){

        interface.showMessage('faltan datos', 'error');
    } else{

        const results = document.querySelector('#resultado div');

        if(results != null){
            results.remove();
        }
        const insurance = new Insurance(selectedTrademark, selectedYear, type);
        const amount = insurance.calculatePolicy();
        console.log(amount);
        interface.showResult(insurance, amount);
        interface.showMessage('Cotizando ...', 'Success');
    }


});

const maxDate = new Date().getFullYear();
const minDate = maxDate - 25;

const selectYears = document.getElementById('anio');
for(let i = maxDate; i >= minDate; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectYears.appendChild(option);
}