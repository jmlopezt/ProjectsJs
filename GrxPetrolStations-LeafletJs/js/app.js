const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    
    ui.showBusinessLocation();
    
})


const searcher = document.querySelector('#search input');

searcher.addEventListener('input', (e) => {
    e.preventDefault();
    if (searcher.value.length > 5) {
        ui.getSuggestions(searcher.value);
    }else{
        ui.showBusinessLocation();
    }
})