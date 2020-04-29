let DB;

const form = document.querySelector('form'),
        petName = document.getElementById('pet'),
        ownerName = document.getElementById('client'),
        tlfNumber = document.getElementById('telephone'),
        date = document.getElementById('date'),
        time = document.getElementById('time'),
        symptom = document.getElementById('symptom'),
        datings = document.getElementById('datings'),
        manageHeading = document.getElementById('manageHeading');


document.addEventListener('DOMContentLoaded', () => {
    let createDB = window.indexedDB.open('Datings', 1);

    createDB.onerror = function(){
        console.log('Error')
    }

    createDB.onsuccess = function () {
        DB = createDB.result;
        showDatings();
    }

    createDB.onupgradeneeded = function (e) {
        let db = e.target.result;
        let objectStore = db.createObjectStore('Datings', 
                        { KeyPath: 'key', autoIncrement: true} );
        
        objectStore.createIndex('petName', 'petName', {unique: false} );
        objectStore.createIndex('ownerName', 'ownerName', {unique: false} );
        objectStore.createIndex('tlfNumber', 'tlfNumber', {unique: false} );
        objectStore.createIndex('date', 'date', {unique: false} );
        objectStore.createIndex('time', 'time', {unique: false} );
        objectStore.createIndex('symptom', 'symptom', {unique: false} );
    }

    form.addEventListener('submit', addData);

    function addData(e) {
        e.preventDefault();

        const newDating = {
            petName : petName.value,
            ownerName : ownerName.value,
            tlfNumber : tlfNumber.value,
            date : date.value,
            time : time.value,
            symptom : symptom.value
        }

        let transaction = DB.transaction(['Datings'], 'readwrite');
        let objectStore = transaction.objectStore('Datings');
        let request = objectStore.add(newDating);

        request.onsuccess = () => form.reset();
        transaction.oncomplete = () => showDatings();
        transaction.onerror = () => console.log("Error while transaction");
    }

    function showDatings() {
        while (datings.firstChild) {
            datings.removeChild(datings.firstChild);
        }
        let objectStore = DB.transaction('Datings').objectStore('Datings');
        objectStore.openCursor()
            .onsuccess = function(e){
                let cursor = e.target.result;
                if (cursor) {
                    let htmlDating = document.createElement('li');
                    htmlDating.setAttribute('data-dating-id', cursor.key);
                    htmlDating.classList.add('list-group-item');

                    htmlDating.innerHTML = `
                        <p class = "font-weight-bold"> Pet name: 
                            <span class = "font-weight-normal">${cursor.value.petName}
                            </span>
                        </p>

                        <p class = "font-weight-bold"> Owner name: 
                            <span class = "font-weight-bold">${cursor.value.ownerName}
                            </span>
                        </p>

                        <p class = "font-weight-bold"> Telephone Number: 
                            <span class = "font-weight-normal">${cursor.value.tlfNumber}
                            </span>
                        </p>

                        <p class = "font-weight-bold"> Date: 
                            <span class = "font-weight-normal">${cursor.value.date}
                            </span>
                        </p>

                        <p class = "font-weight-bold"> Time: 
                            <span class = "font-weight-normal">${cursor.value.time}
                            </span>
                        </p>

                        <p class = "font-weight-bold"> Symptoms: 
                            <span class = "font-weight-normal">${cursor.value.symptom}
                            </span>
                        </p>
                    `;

                    const dltButton = document.createElement('button');
                    dltButton.classList.add('delete', 'btn', 'btn-danger');
                    dltButton.innerHTML = '<span aria-hiden = "true">X</span> Delete';
                    dltButton.onclick = deleteDating;
                    htmlDating.appendChild(dltButton);

                    datings.appendChild(htmlDating);

                    cursor.continue();
                } else {
                    if (!datings.firstChild) {
                        manageHeading.textContent = 'Add dating';
                        let listing = document.createElement('p');
                        listing.classList.add('text-center');
                        listing.textContent = 'No registry';
                        datings.appendChild(listing);
                    } else{
                        manageHeading.textContent = 'Manage your Datings'
                    }
                }
            }
    }

    function deleteDating(e){
        let datingID = Number(e.target.parentElement.getAttribute('data-dating-id'));
        
        let transaction = DB.transaction(['Datings'], 'readwrite');
        let objectStore = transaction.objectStore('Datings');
        let request = objectStore.delete(datingID);

        transaction.oncomplete = () =>{
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);

            if (!datings.firstChild) {
                manageHeading.textContent = 'Add dating';
                let listing = document.createElement('p');
                listing.classList.add('text-center');
                listing.textContent = 'No registry';
                datings.appendChild(listing);
            } else{
                manageHeading.textContent = 'Manage your Datings'
            }
        }

    }
})