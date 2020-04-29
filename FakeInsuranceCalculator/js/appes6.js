// Primero con prototypes, luego con classes

class Insurance{
    constructor(trademark, year, type) {
        this.trademark = trademark;
        this.year = year;
        this. type = type;
    }

    calculatePolicy(){
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
    
        if(this.type === 'basic'){
            amount = amount * 1.2;
        } else{
            amount = amount * 1.5;
        }
        return amount;
    }
}

class Interface{

    showResult(insurance, amount){
        const result = document.getElementById('result');
        let trademark;
    
        switch(insurance.trademark){
            case '1': 
                trademark = 'American';
                break;
            case '2': 
                trademark = 'Europe';
                break;
            case '3': 
                trademark = 'Asian';
                break;
        }
    
        const div = document.createElement('div');
        div.innerHTML = `
            <p class = 'header'>Summary: </p> 
            <p>Trademark: ${trademark}</p>
            <p>Year: ${insurance.year}</p>
            <p>Type: ${insurance.type}</p>
            <p>Total: ${amount} €</p>
        `;
    
        const spinner = document.querySelector('#loading img');
        spinner.style.display = 'block';
        setTimeout(() => {
            spinner.style.display = 'none';
            result.appendChild(div);
        }, 1500);
        
    }

    showMessage (message, code){
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
        }, 1500);
    }

}


const form = document.getElementById('calculate-policy');

form.addEventListener('submit',function(e){
    e.preventDefault();

    const trademark = document.getElementById('trademark');
    const selectedTrademark = trademark.options[trademark.selectedIndex].value;

    const year = document.getElementById('year');
    const selectedYear = year.options[year.selectedIndex].value;

    const type = document.querySelector('input[name="type"]:checked').value;

    const interface = new Interface();

    if(selectedTrademark === '' || selectedYear === '' || type === ''){

        interface.showMessage('All the fields are mandatory', 'error');
    } else{

        const results = document.querySelector('#result div');

        if(results != null){
            results.remove();
        }
        const insurance = new Insurance(selectedTrademark, selectedYear, type);
        const amount = insurance.calculatePolicy();
        console.log(amount);
        interface.showResult(insurance, amount);
        interface.showMessage('Performing calculation...', 'Success');
    }


});

const maxDate = new Date().getFullYear();
const minDate = maxDate - 25;

const selectYears = document.getElementById('year');
for(let i = maxDate; i >= minDate; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectYears.appendChild(option);
}