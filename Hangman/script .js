const category = document.getElementById("category");
const word = document.getElementById("word");
const buttons = document.querySelectorAll("#keyboard button")
const images = document.querySelectorAll("img");
const statue = document.getElementById("statue");
const replay = document.getElementById("replay")
const start = document.getElementById("start")

let tries = 0;
let score = 0;

const categories = ["FRUIT", "ANIMAL", "JOB", "LANGUAGE", "SPORT", "COUNTRY", "CITY", "COLOR", "HARD_MODE"];
const words = {
    FRUIT : ["APPLE", "PINEAPPLE", "COCONUT", "STRAWBERRY"],
    ANIMAL : ["LION", "PIGEON", 'CAT', 'DOG'],
    JOB : ["CHEF", "PILOT", "DOCTOR", 'ACTOR'],
    LANGUAGE : ["ENGLISH", "GERMAN", "JAPANESE", 'SPANISH'],
    SPORT : ["FOOTBALL", "BASKETBALL", "SWIMMING" ,'BOXING'],
    COUNTRY: ["CANADA", "BRAZIL", "EGYPT", "THAILAND", "NORWAY", "AUSTRALIA"],
    CITY: ["LONDON", "TOKYO", "PARIS", "BERLIN", "SYDNEY", "NEWYORK"],
    COLOR: ["ORANGE", "PURPLE", "YELLOW", "TURQUOISE", "MAGENTA", "SILVER"],
    HARD_MODE: ["RHYTHM", "JAZZ", "CRYPTO", "WHIZZ", "AWKWARD"],
};

function startgame(){
    start.style.display = "none"
}

function check(word){
    if(tries == 7){
        score -= 1
        statue.textContent = `YOU LOST! CURRENT SCORE: ${score}`
        statue.style.color = 'red'
        replay.style.display = "block"

        buttons.forEach(button => {
            button.disabled = true;
        })

    }else if(!word.includes('_')){
        score += 1
        statue.textContent = `YOU WON! CURRENT SCORE: ${score}`
        statue.style.color = 'rgb(51, 255, 0)'
        replay.style.display = "block"

        buttons.forEach(button => {
            button.disabled = true;
        })
    }
}

function draw(){
    if (tries <= 7){
        images[tries-1].style.display = 'none';
        images[tries].style.display = 'block';
    }
};

function randomWord(){
    const categoryRandom = categories[Math.floor(Math.random() * categories.length)];
    category.textContent = categoryRandom;

    const wordsCategory = words[categoryRandom];
    const wordRandom = wordsCategory[Math.floor(Math.random() * wordsCategory.length)];


    word.textContent = ""; 
    for(let i = 0; i < wordRandom.length; i++){
        word.textContent += '_';
    }

    return wordRandom;
};

let targetword = randomWord();

function userChoice(choice, event){
    event.target.disabled = true;

    if(targetword.includes(choice)){
        let wordDisplay = word.textContent.split("");

        for(let i = 0; i < targetword.length; i++){
            if(targetword[i] == choice){
                wordDisplay[i] = choice;
            }
        }
        word.textContent = wordDisplay.join("");

    }else{
        tries += 1
        draw();
    }
    check(word.textContent);
};

function newGame(){
    tries = 0;

    statue.textContent = ""
    replay.style.display = "none"

    images.forEach(image => {
        image.style.display = 'none';
    })
    images[0].style.display = 'block';

    buttons.forEach(button => {
        button.disabled = false;
    })
    
    targetword = randomWord();
    console.log(targetword)
};