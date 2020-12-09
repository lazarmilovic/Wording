# Wording
React project inspired by popular Serbian TV show Slagalica. When the app is started, a random 13-letter-long word is fetched from Wordnik API, converted into an array, sorted randomly and every letter is displayed separately whith click event attached to it. When clicked, the letter will become selected letted and will be displayed under the original array. The goal is to create the longest possible word out of the letters while each letter can be only used once. A user has 30 seconds to submit a word and it will be send for a validation to Wordnik API. If the word is good, a scrabble score will be displayed, if not an error will be alerted. 

## Table of content

* [Genetal info] (#general_info)
* [Screenshot] (#screenshot)
* [Technologies] (#technologies)
* [Setup] (#setup)

## General Info
When app is rendered, all three buttons are avaialble- Get the Word, Remove Last Letter and Finished. Get the Word button is conditionally rendered- while const gameHasStatred is false, it will be rendered. Once the user gets a word and starts the game, the Get the Word button will disappear. 

A user start the game by clicking Get the Word button which will trigger FetchTheWord function. It will send a REST request to Wordnik API and will fetch a random 13-letter-long word. The REST result will be converted into an array and sorted randomly and each letter will be rendered as a Button component. Each Button component has a "click" event listener attached to it. The idea is to try to find a word as long as possible from the given letters with using one letter only once. To achive it, one part of the state are constants that controle the letters- word, setWord which will get the get the original word as an array and set it by randomly sorting it, selected and setSelected which will contain selected letters and set it after every click on available letter or after every click on Remove Last Letter button, and disabled and setDisabled which will contain indexes of the sellected letters which will be used to pass the status of the letter dynamically. Once the letter is selected, it's index will be passed to disabled array and it's status will be changed- it will get a red background that indicates that the letter is used. The selected letter and it's indexes are kept in separated variables beacuse a word can have the same letter multiple times and in order to remove the exact letter from the available, I am passing it's index to a disabled array. 

Click on each letter will trigger selectTheLetter function wich will check if the letter's index is in disabled array- if it is, the alert message will show, if not- the letter will be added to selected array on the last place in it and rendered in the UI and it's index will be added to disabled array. 

Once a user starts picking letters, (s)he will have two options- either to submit the word or remove the latest letter from the selected (and disabled array). The removed letter will be removed from both arrays and it's status will be changed again- it will become availble again with a blue balckground. A user has 30 seconds to finish the game. useEffect hook is used to create a timer and when it hits 0 and the word isn't submitted, the alert message will be shown saying that the user wasn't able to complete the game and it will render another Game component with a different key which will unmount the previous Game component with it's side effects. 

If a user submits the word within 30 seconds, the word will be sent as a RESTfull request to Wordnik API for verification. If the word is verified, the user will get a Scrabble score for it. If not, the alert message will be shown saying that the word wasn't verified and another Game component with a unique key will be rendered. 

## Screenshot
![alt text](https://github.com/lazarmilovic/Wording/blob/main/Preview.png?raw=true)

## Technologies 

* React/ React-dom: version 17.0.1
* REST
* CSS

# Setup

To start the game, you would need to have Node.js installed. If you have it, download the code and open the Terminal. If you opened it from your IDE it should be navigated to the root of the project. If you didn't, navigate the Terminal to the project and type: 
`npm start`

The project should be opened in your default browser and the URL should be http://localhost:3030.

