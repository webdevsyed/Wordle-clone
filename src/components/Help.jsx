import React from 'react'
import '../styles/Help.css'

const Help = () => {

    const closeHelpModal=()=>{
        const helpModal = document.querySelector("#help-modal")
       helpModal.style.display = "none"
    }

    return (
        <div id='help-modal' style={{display:"none"}}>
            <div className="exit">
            <svg id="close-modal" onClick={closeHelpModal} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="icon" data-testid="icon-close"><path fill="var(--color-tone-1)" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
            </div>
            <h1>How To Play</h1>
            <h2>Guess the Wordle in 6 tries.</h2>
            <ul>
                <li>Each guess must be a valid 5-letter word.</li>
                <li>The color of the tiles will change to show how close your guess was to the word.</li>
            </ul>
            <p><strong>Examples</strong></p>
            <div className="example">
                <div className='row'>
                    <div className="tile bg-correct">W</div>
                    <div className="tile ">E</div>
                    <div className="tile">A</div>
                    <div className="tile">R</div>
                    <div className="tile">Y</div>
                </div>
            <p><strong>W</strong> is in the word and in the correct spot.</p>
            </div>

            <div className="example">
                <div className='row'>
                    <div className="tile">P</div>
                    <div className="tile bg-present">I</div>
                    <div className="tile">L</div>
                    <div className="tile">L</div>
                    <div className="tile">S</div>
                </div>
            <p><strong>I</strong> is in the word and in the wrong spot.</p>
            </div>

            <div className="example">
                <div className='row'>
                    <div className="tile">V</div>
                    <div className="tile">A</div>
                    <div className="tile">G</div>
                    <div className="tile bg-wrong">U</div>
                    <div className="tile">E</div>
                </div>
            <p><strong>U</strong> is not in the word and in any spot.</p>
            </div>

        </div>
    )
}

export default Help
