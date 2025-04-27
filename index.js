/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA)

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        let game = games[i];

        let display = `
            <img class="game-img" src=${game.img}>
            <h3>${game.name}</h3>
            <p>${game.description}</p> 
            <p>Goal: ${game.goal}</p>
            <p>Pledged: ${game.pledged}</p>
        `;

        let gameCard = document.createElement("div");
        gameCard.classList.add("game-card");    
        gameCard.innerHTML = display;
        gamesContainer.append(gameCard);
    }
}

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((acc, games) => {
    return acc + games.backers;
}, 0).toLocaleString();

contributionsCard.innerHTML = totalContributions;

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, games) => {
    return acc + games.pledged;
}, 0).toLocaleString();

raisedCard.innerHTML = `$${totalRaised}`;

const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

const descriptionContainer = document.getElementById("description-container");

let unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
}).length;

let displayStr = `A total of $${totalRaised} has been raised for ${GAMES_JSON.length - unfundedGames} games. Currently ${unfundedGames} ${unfundedGames > 1 ? "games" : "game"} remains unfunded. We need your help to fund these amazing games!`;
let fundingStatement = document.createElement("p");

fundingStatement.innerHTML = displayStr;
descriptionContainer.append(fundingStatement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");
const firstBackedContainer = document.getElementById("first-backer");
const secondBackedContainer = document.getElementById("second-backer");

const sortedFunded =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const sortedBacked =  GAMES_JSON.sort( (item1, item2) => {
    return item2.backed - item1.backed;
});

const { name, pledged } = sortedFunded[0];
const { name: name2, pledged: pledged2} = sortedFunded[1];
const { name: name3, backers } = sortedBacked[0];
const { name: name4, backers: backers2} = sortedBacked[1];

let mostFunded = document.createElement("p");
let secondMostFunded = document.createElement("p");
let mostBacked = document.createElement("p");
let secondMostBacked = document.createElement("p");

mostFunded.innerHTML = `${name} - ${pledged}`;
secondMostFunded.innerHTML = `${name2} - ${pledged2}`;
mostBacked.innerHTML = `${name3} - ${backers}`;
secondMostBacked.innerHTML = `${name4} - ${backers2}`;

firstGameContainer.append(mostFunded);
secondGameContainer.append(secondMostFunded);
firstBackedContainer.append(mostBacked);
secondBackedContainer.append(secondMostBacked);