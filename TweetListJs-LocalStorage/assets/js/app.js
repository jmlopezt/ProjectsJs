const tweetsList = document.getElementById('lista-tweets');

evenListeners();

function evenListeners(){
    document.getElementById('form').addEventListener('submit', addTweet);
    tweetsList.addEventListener('click', deleteTweet);
    document.addEventListener('DOMContentLoaded', writeFromLocalStorage);
}

function addTweet(e){
    e.preventDefault();
    const tweet = document.getElementById('tweet').value;
    const deleteButton = document.createElement('a');
    const li = document.createElement('li');

    deleteButton.classList = 'delete-tweet';
    deleteButton.innerText = 'X';
    li.innerText = tweet;
    li.appendChild(deleteButton);
    tweetsList.appendChild(li);

    addTweetToLocalStorage(tweet);
}

function deleteTweet(e){
    e.preventDefault();
    if(e.target.className === 'delete-tweet'){
        e.target.parentElement.remove();
        deleteTweetOfLocalStorage(e.target.parentElement.innerText);
    }
}

function addTweetToLocalStorage(tweet){
    let tweets = obtainTweetsInLocalStorage();

    tweets.push(tweet);
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function obtainTweetsInLocalStorage(){
    let tweets;

    if(localStorage.getItem('tweets') === null){
        tweets = [];
    } else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}


function writeFromLocalStorage(){
    let tweets = obtainTweetsInLocalStorage();
    tweets.forEach(element => {
        const deleteButton = document.createElement('a');
        const li = document.createElement('li');

        deleteButton.classList = 'delete-tweet';
        deleteButton.innerText = 'X';
        li.innerText = element;
        li.appendChild(deleteButton);
        tweetsList.appendChild(li);
    });
}

function deleteTweetOfLocalStorage(tweet){
    let tweets, tweetToDelete;

    tweets = obtainTweetsInLocalStorage();
    tweetToDelete = tweet.substring(0, tweet.length - 1);

    tweets.forEach((element, index) => {
        if(tweetToDelete === element){
            tweets.splice(index, 1);
        }
    })

    localStorage.setItem('tweets',JSON.stringify(tweets));
}