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
  }, [tryNum])

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
    return guessWords[tryNum - 1] === answerWord;
  }
  const checkLose = () => {
    return tryNum === 6 && guessWords[tryNum - 1] != answerWord;
  }

  const handleKeyUp = (e) => {
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
    setGuessWords(currentGuessWords => currentGuessWords.map((word, index) => {
      if (currentGuessWords[tryNum].length < 5) {
        if (index === tryNum) {
          let newWord = word + char;
          return newWord;
        }
        else {
          return word;
        }
      }
      else {
        return word
      }
    }
    ));
  }

  const submitGuess = (guess) => {
    setTryNum(currentTryNum => {
      console.log(guess[tryNum])

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

      //animation and alert for easter edd
      if (guess[tryNum].length === 5 && guess[tryNum] === "majid") {
        showAlert(answerWord)
        danceTiles("bg-justfilled")
      }

      //animation and alert for submitting accpetable word
      if (words.includes(guess[currentTryNum])) {
        flipTiles("bg-justfilled")
        return currentTryNum + 1;
      }

      //animation and alert for submitting answer word
      if (guess[tryNum] === answerWord) {
        danceTiles("bg-justfilled")
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
            {{ tryNum } > 1 ? (<h2>You guessed in {tryNum} attempts.</h2>) : (<h2>You guessed in {tryNum} attempt.</h2>)}
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
        <button type="button" id="start-btn" onClick={startGame}>start again</button>
        <button type="button" id="retry-btn" onClick={retryGame}>Retry</button>
      </div>

    </div>
  )
}

export default Game
