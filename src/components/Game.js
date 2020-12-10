import React, { useEffect, useState } from "react";
import "../App.css";
import RenderButtons from "./RenderButtons";
import FetchTheWord from "./FetchTheWord";
import RenderSelected from "./RenderSelected";
import RemoveLastButton from "./RemoveLastButton";
import CheckSubmittedWord from "./CheckSubmittedWord";

const Game = (props) => {
  const [word, setWord] = useState([]);
  const [selected, setSelected] = useState([]);
  const [disabled, setDisabled] = useState([]);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [originalWord, setOriginalWord] = useState("empty");
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameIsFinished, setGameIsFinished] = useState(false);

  //if the game has started(if the word is fetched) the counter will count down to 0 if the game isn't finished yet.
  useEffect(() => {
    if (gameHasStarted) {
      if (timeLeft > 0 && !gameIsFinished) {
        let timerId = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timerId);
      }
    }
  });
  //when timer hits zero, the alert box will apear and the game will re-render.
  if (timeLeft === 0) {
    alert("Time just run up! Unfortunately, you didn't submit the word");
    props.loadNewGame();
  }
  // this function will fetch a random word from Wordnik API, assign the value of it to originalWord and create array out of it and randomly sort the letters and display it.
  const getTheWord = async () => {
    let fetched = await FetchTheWord();
    let fetchedWord = Array.from(fetched);
    //setOriginalWord({ fetchedWord });
    fetchedWord.sort(() => Math.random() - 0.5);
    setWord(fetchedWord);
    setOriginalWord(fetched);
    setGameHasStarted(true);
    
  };
  //this function is representing onClick event for each letter- since the word can include same letters, the function will check if the index of the specific letter is in disabled array. If it is, it will alert that the letter is already used- if not, it will update the selected and disabled array with the letter and it's index.
  const selectTheLetter = (letter, ind) => {
    if (!disabled.includes(ind)) {
      setDisabled([...disabled, ind]);
      setSelected([...selected, letter]);
    } else {
      alert("this letter is already Used!");
    }
  };
  //this function will remove the last letter in the selected array as well as the last index from the disabled array
  const removeLastLetter = () => {
    if (gameHasStarted) {
      if (selected.length > 0) {
        let selected_arr = selected;
        let disabled_arr = disabled;

        let length = selected.length - 1;

        selected_arr.splice(length, 1);
        disabled_arr.splice(length, 1);

        setSelected(selected_arr);
        setDisabled(disabled_arr);
      } else {
        alert("There is nothing to remove, please select a letter first!");
      }
    } else {
      alert("First get a word");
    }
  };
  //this function will be passed to each letter and it will dinamically change the class of the letter- if it is used, the letter will have red background, if it is available it will have a blue one.
  const getStatus = (ind) => {
    if (disabled.includes(ind)) {
      return "used";
    } else {
      return "available";
    }
  };
  //this function represents the end of the game- user did submit the word and the function will make a string out of it and pass it to Wordnik API to check if the word is correct. If it is, it will return the Scrabble score for the word.
  const doneWording = async () => {
    if (gameHasStarted === true) {
      if (selected.length > 0) {
        const finished_word = selected.join("");
        setGameIsFinished(true);
        if (finished_word === originalWord) {
          alert(
            `Congrats! You've earned a max number of points- 100! We have the same word-${finished_word}`
          );
          //props.loadNewGame();
        } else {
          let result = await CheckSubmittedWord(finished_word);
          if (result.value) {
            alert(
              `Congrats! You've finished the game. Your word is ${finished_word.toUpperCase()} and you get ${
                result.value
              } points for it! The word we have is ${originalWord.toUpperCase()}.`
            );
            // props.loadNewGame();
          } else {
            alert(
              `Unfortunately, we couldn't verify your word. No points for you in this game.`
            );
            //props.loadNewGame();
          }
        }
        props.loadNewGame();
      } else {
        alert("Please select letters that will make your word!");
      }
    } else {
      alert("First get a word");
    }
  };

  //this function will render the Get The Word button only if the user didn't start the game yet, making sure that user cannot fetch another word while the game is in play.
  const RenderStartBtn = () => {
    if (!gameHasStarted) {
      return (
        <RemoveLastButton
          onClick={() => {
            getTheWord();
          }}
          text={"Get The Word"}
          class={"start"}
        />
      );
    }
  };

  return (
    <div className="container">
      <div className="time_left">{timeLeft}</div>
      <div className="fetched_word">
        <RenderButtons
          arr={word}
          onClick={selectTheLetter}
          status={getStatus}
        />
      </div>
      <div className="selected_letters">
        <RenderSelected arr={selected} onClick={selectTheLetter} />
      </div>
      <div className="control_buttons">
        {RenderStartBtn()}

        <RemoveLastButton
          onClick={removeLastLetter}
          text={"Remove Last"}
          class={"remove"}
        />
        <RemoveLastButton
          onClick={doneWording}
          text={"Finished!"}
          class={"finished"}
        />
      </div>
    </div>
  );
};

export default Game;
