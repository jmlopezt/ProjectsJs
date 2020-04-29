import * as UI from './interface.js';
import {API} from './api.js';

UI.lyricsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const artist = document.getElementById('artist').value;
    const song = document.getElementById('song').value;

    if (artist === '' || song === '') {
        UI.messagesDiv.classList.remove('kanyeAdvice');
        UI.messagesDiv.innerHTML ='Error! All the fields are mandatory';
        UI.messagesDiv.classList.add('error');
        setTimeout(() => {
            UI.messagesDiv.innerHTML ='';
            UI.messagesDiv.classList.remove('error');
        }, 2000);
    } else {
        const api = new API(artist,song);
        api.getLyricsFromOVH()
                .then( data => {
                    let lyrics = data.responseJSON.lyrics;
                    if (lyrics) {
                        UI.resultsDiv.textContent = lyrics;
                        UI.resultsDiv.classList.add('result');
                    } else {
                        UI.resultsDiv.innerHTML =`${data.responseJSON.error}`;
                        UI.resultsDiv.classList.add('lyricsError');
                        setTimeout(() => {
                            UI.resultsDiv.innerHTML ='';
                            UI.resultsDiv.classList.remove('lyricsError');
                            UI.lyricsForm.reset();
                        }, 2000);
                    }
                })
                .catch( error => {
                    console.log(error);
                });
        api.getKanyeQuotes()
        .then( data => {
            const quote = data.responseJSON.quote;
            if (quote) {
                UI.messagesDiv.innerHTML = `"${quote}" - Kanye West`;
                UI.messagesDiv.classList.add('kanyeAdvice');
            }
        })
        .catch( error => {
            console.log(error);
        });
        
    }

    console.log(artist)

})