import React,{useState} from 'react'
import '../styles/Keyboard.css'

export default function Keyboard({ handleEnterKey, handleDeleteKey, handleLetterKey, answer, guesses, tryNum }) {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
  
  const selectLetter = (e) => {
    if (e.target.innerHTML === "ENTER") {
      handleEnterKey()
      setKeyColor(e.target.innerHTML)
    }
    if (e.target.innerHTML === "DELETE") {
      handleDeleteKey()
    }
    if (e.target.innerHTML.match(/^[A-z]$/)) {
      handleLetterKey(e.target.innerHTML.toLowerCase())
    }
  }

  //creates an array of all the guessed letters
  const allGuessedLettersArray = () => {
    // return guess.slice(0,tryNum).join('').split('')
    return (
      guesses
      .slice(0,tryNum)  // Ensures that letters entered before submitting guess are not included
      .join('')         // makes all the leters a single string
      .split('')        //separates each letter as an item of an array
    )
  }

  //creates an array of all the correctly positioned guessed letters
  const exactGuessedLettersArray = () => {
    return (
      answer
        .split('') // creates an array of the letters of the answers
        .filter((letter, index) => { //filter the array of "letter"s of the answer, along with the position of the letter in the word in "index"
          return (
            guesses
            .slice(0,tryNum)  // Ensures that letters entered before submitting guess are not included
              .map(word => word[index]) // checks each guessed word, and return the only letter at corresponding index from each guess word ( as an array)
              .includes(letter))  //checks above array to see if "letter" from answer can be found in the array.
          // if the letter is found in the array it means in one of the guesses , letter was predicted in the correct index, making it an exact guess.
        })
    )
  }

  //creates an array of all the letters from the answer that have been guessed , irrespective of thier position
  const inexactGuessedLettersArray = () => {
    return (
      answer
        .split('')          // the answer word is converted to an array
        .filter(letter => allGuessedLettersArray().includes(letter))   //the array of letters is filtered by checkng wether it is present in the allGuessedLettersArray
    )
  }

  let bgColor
  const setKeyColor = (char) => {
   if (exactGuessedLettersArray().includes(char))
      bgColor = "bg-correct";
    else if (inexactGuessedLettersArray().includes(char))
      bgColor = "bg-present";
    else if (allGuessedLettersArray().includes(char))
      bgColor = "bg-wrong"
    else
      bgColor= ""
  }

  return (
    <div className="keyboard">
      <div className="line">
        {keys1.map((char) => {
          setKeyColor(char.toLowerCase())
          return <div key={char} className={`key ${bgColor}`} onClick={selectLetter}>{char}</div>
        })
        }
      </div>
      <div className="line">
        <div className="key spacer"></div>
        {keys2.map((char) => {
          setKeyColor(char.toLowerCase())
          return <div key={char} className={`key ${bgColor}`} onClick={selectLetter}>{char}</div>
        })}
        <div className="key spacer"></div>
      </div>
      <div className="line">
        <div className="key big-key" onClick={selectLetter}>ENTER</div>
        {keys3.map((char) => {
          setKeyColor(char.toLowerCase())
          return <div key={char} className={`key ${bgColor}`} onClick={selectLetter}>{char}</div>
        })}
        <div className="key big-key" onClick={selectLetter}>DELETE</div>
      </div>
    </div>
  )
}
