const userBudgetPrompt = prompt('What is your weekly budget?');
const form = document.getElementById('add-expense');
let userBudget;


class Budget{
    constructor(budget){
        this.budget = Number(budget);
        this.remaining = Number(budget);
    }

    remainingBudget(amount = 0){
        return this.remaining -= Number(amount);
    }
}

class Interface{
    insertBudget(amount){
        const budgetSpan = document.querySelector('span#total');
        const remainingSpan = document.querySelector('span#restante');

        budgetSpan.innerHTML = `${amount}`;
        remainingSpan.innerHTML = `${amount}`;
    }

    printMessage(message, type){
        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'alert');

        if (type === 'error') {
            divMessage.classList.add('alert-danger');
        } else {
            divMessage.classList.add('alert-success');
        }

        divMessage.appendChild(document.createTextNode(message));

        document.querySelector('.primary').insertBefore(divMessage,form);

        setTimeout(() => {
            document.querySelector('.primary .alert').remove();
            form.reset();
        }, 2000);
    }

    addExpenseToList(expenseName,expenseAmount){
        const expensesList = document.querySelector('#expenses ul');
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${expenseName} 
            <span class = "badge badge-primary badge-pill">${expenseAmount} € </span>`;

        expensesList.appendChild(li);
    }

    remainingBudget(expenseAmount){
        const remainingSpan = document.querySelector('span#restante');
        const remainingUserBudget = userBudget.remainingBudget(expenseAmount);
        
        remainingSpan.innerHTML = `${remainingUserBudget}`;
        this.checkBudget();

    }

    checkBudget(){
        const TotalBudget = userBudget.budget;
        const remaining = userBudget.remaining;
        const remainingSpan = document.querySelector('.restante');

        if ( (TotalBudget /4) > remaining) {
            remainingSpan.classList.remove('alert-success', 'alert-warning');
            remainingSpan.classList.add('alert-danger');
            
        } else if ((TotalBudget /2) > remaining){
            remainingSpan.classList.remove('alert-success');
            remainingSpan.classList.add('alert-warning');
        }

    }
}

document.addEventListener('DOMContentLoaded', function(){
    if(userBudgetPrompt === null || userBudgetPrompt === ''){
        window.location.reload();
    } else{
        userBudget = new Budget(userBudgetPrompt);
        const ui = new Interface();
        ui.insertBudget(userBudget.budget);
    }
})


form.addEventListener('submit', function(e){
    e.preventDefault();

    const expenseName = document.querySelector('#expense').value;
    const expenseAmount = document.querySelector('#amount').value;

    const ui = new Interface();

    if (expenseName === '' || expenseAmount === '' || isNaN(Number(expenseAmount))) {
        ui.printMessage('There was an error', 'error');
    } else {
        console.log(expenseAmount);
        ui.printMessage('Successfully added', 'success');
        ui.addExpenseToList(expenseName,expenseAmount);
        ui.remainingBudget(expenseAmount);
    }



})