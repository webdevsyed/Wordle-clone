import { useEffect, useState } from 'react'
import Board from './Board'
import Keyboard from './Keyboard'
import words from '../assets/words'
import '../styles/Game.css'

const emptyBoardArray = new Array(6).fill("")

function Game() {
  const [answerWord, setAnswerWord] = useState(words[Math.round(Math.random() * words.length)]);
  const [guessWords, setGuessWords] = useState(emptyBoardArray);
  const [tryNum, setTryNum] = useState(0);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  })

  const startGame = () => {
    setAnswerWord(words[Math.round(Math.random() * words.length)]);
    setGuessWords(emptyBoardArray);
    setTryNum(0);
    document.querySelector("#start-btn").blur();
  }
  const retryGame = () => {
    setGuessWords(emptyBoardArray);
    setTryNum(0);
    document.querySelector("#retry-btn").blur();
  }

  const checkWin = () => {
    return guessWords[tryNum - 2] === answerWord;
  }
  const checkLose = () => {
    return tryNum === 6 && guessWords[tryNum - 1] != answerWord;
  }

  const handleKeyUp = (e) => {
    //if game has ended and player has won/lost, early return and does not let you continue entering
    if (checkWin() || checkLose()) {
      return
    }
    if (e.key === "Enter") {
      handleEnterKey()
    }
    if (e.key === "Backspace" || e.key === "Delete") {
      handleDeleteKey()
    }
    if (e.key.match(/^[A-z]$/)) {
      handleLetterKey(e.key.toLowerCase())
    }
  }

  const handleEnterKey = () => {
    setGuessWords(currentGuessWords => {
      submitGuess(currentGuessWords);
      return currentGuessWords
    })
  }
  const handleDeleteKey = () => {
    setGuessWords(currentGuessWords => currentGuessWords.map((word, index) => {
      if (index === tryNum) {
        let newWord = word.substring(0, word.length - 1);
        return newWord;
      }
      else {
        return word;
      }
    }
    ));
    return;
  }
  const handleLetterKey = (char) => {
    //Modify the array of guesses by updating each word using map
    setGuessWords(currentGuessWords => currentGuessWords.map((word, index) => {
      //Ensure all five letters of the word have not been entered
      if (currentGuessWords[tryNum].length < 5) {
        //Ensure that we are adding to the currect row
        if (index === tryNum) {
          let newWord = word + char;
          return newWord;
        }
        //If it is not current row, then word is returned unaltered
        else {
          return word;
        }
      }
      //If all 5 letters have been entered, then word is returned unaltered
      else {
        return word
      }
    }
    ));
  }

  const submitGuess = (guess) => {
    setTryNum(currentTryNum => {

      //animation and alert for incomplete words
      if (guess[tryNum].length < 5) {
        showAlert("Not Enough Letters")
        shakeTiles("bg-justfilled")
      }

      //animation and alert for incorrect words
      if (guess[tryNum].length === 5 && !words.includes(guess[tryNum])) {
        showAlert("Word Does Not Exist")
        shakeTiles("bg-justfilled")
      }

      //animation and alert for easter egg
      if (guess[tryNum].length === 5 && guess[tryNum] === "majid") {
        showAlert(answerWord)
        danceTiles("bg-justfilled")
      }

       //animation and alert for submitting answer word
      if (guess[tryNum].length === 5 && guess[tryNum] === answerWord) {
        showAlert("You Win!")
        danceTiles("bg-justfilled")
        console.log("entered answer word")
        return currentTryNum +1;
      }
      //animation and alert for submitting accpetable word
      if (words.includes(guess[currentTryNum])) {
        flipTiles("bg-justfilled")
        console.log("entered accpetable word")
        return currentTryNum + 1;
      }

   return currentTryNum
    })
  }


  const showAlert = (msg) => {
    const alert = document.getElementsByClassName("alert-msg")[0]
    alert.innerHTML = msg
    alert.classList.remove("hide");
    setTimeout(() => {
      alert.classList.add("hide")
    }, 1500)
  }

  const shakeTiles = (tiles) => {
    const toShake = document.getElementsByClassName(tiles)
    Object.values(toShake).forEach(tile => {
      tile.classList.add("shake")
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("shake")
        },
        { once: true }
      )
    })
  }

  const flipTiles = (tiles) => {
    const toFlip = document.getElementsByClassName(tiles)
    Object.values(toFlip).forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add("flip")
      }, index * 175)
      tile.addEventListener("transitionend", () => {
        tile.classList.remove("flip")
      },
        { once: true }
      )
    })
  }

  const danceTiles = (tiles) => {
    const toDance = document.getElementsByClassName(tiles)
    Object.values(toDance).forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add("dance")

        tile.addEventListener("animationend", () => {
          tile.classList.remove("dance")
        },
          { once: true }
        )
      }, (index * 1000 / 5))
    })
  }


  return (
    <div className="container">
      <div className="alert-msg hide"></div>
      <div className="board">

        {guessWords.map((word, index) => {
          return <Board key={index} answer={answerWord} guess={word} isGuessed={index < tryNum} />
        })
        }

      </div>
      {/* {console.log(answerWord)} */}
      {
        checkWin() ?
          (<div className="result">
            <h1>🎉🥳</h1>
            <h1>YOU WON!</h1>
            {{ tryNum } > 1 ? (<h2>You guessed in {tryNum} attempts.</h2>) : (<h2>You guessed in {tryNum-1} attempt.</h2>)}
          </div>) :

          checkLose() ?
            (<div className="result">
              <h1>😔</h1>
              <h1>YOU LOST</h1>
              <h2>Please try again!</h2>
            </div>) :

            <Keyboard handleEnterKey={handleEnterKey} handleDeleteKey={handleDeleteKey} handleLetterKey={handleLetterKey} answer={answerWord} guesses={guessWords} tryNum={tryNum} />
      }

      <div className="buttons">
        <button type="button" id="start-btn" onClick={startGame}>New Game</button>
        <button type="button" id="retry-btn" onClick={retryGame}>Try Again</button>
      </div>

    </div>
  )
}

export default Game
