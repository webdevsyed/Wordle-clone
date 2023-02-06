import React from 'react'
import '../styles/Board.css'

export default function Board({ answer, guess, isGuessed }) {
  // placeholder is for length five as we are guessing 5 letter words
  const placeholderArr = new Array(5).fill("");
  return (
    <div className='row'>
      {
        placeholderArr.map((_, i) => {
          //logic to set backgrond color of the key 
          let bgColor
          if (!isGuessed) {
            if (guess[i])
              bgColor = "bg-justfilled";
            else
              bgColor = "bg-empty";
          }
          else if (guess[i] == " " || guess[i] === undefined)
            bgColor = "bg-empty";
          else if (guess[i] == answer[i])
            bgColor = "bg-correct";
          else if (answer.includes(guess[i]))
            bgColor = "bg-present";
          else
            bgColor = "bg-wrong"

          return <div key={i} className={`tile ${bgColor}`}>{guess[i]}</div>
        })
      }
    </div>
  )
}
