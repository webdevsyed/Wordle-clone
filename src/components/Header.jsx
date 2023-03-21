import React from 'react'
import '../styles/Header.css'

export default function Header({changeTheme}) {
  
  const openHelpModal = ()=>{
      const helpModal = document.querySelector("#help-modal")
      helpModal.style.display === "none"?  
        helpModal.style.display = "block" : 
        helpModal.style.display = "none"
    }

  const refresh=()=>{
    window.location.reload();
  }

  return (
    <nav>
      <h1><span onClick={refresh}>WORDLE</span></h1>
      <div className="settings">
      <svg id="help" onClick={openHelpModal} xmlns="http://www.w3.org/2000/svg" height="28" viewBox="4 4 24 24" width="28" className="icon" data-testid="icon-help"><path fill="var(--color-tone-1)" d="M14.8333 23H17.1666V20.6667H14.8333V23ZM15.9999 4.33334C9.55992 4.33334 4.33325 9.56001 4.33325 16C4.33325 22.44 9.55992 27.6667 15.9999 27.6667C22.4399 27.6667 27.6666 22.44 27.6666 16C27.6666 9.56001 22.4399 4.33334 15.9999 4.33334ZM15.9999 25.3333C10.8549 25.3333 6.66659 21.145 6.66659 16C6.66659 10.855 10.8549 6.66668 15.9999 6.66668C21.1449 6.66668 25.3333 10.855 25.3333 16C25.3333 21.145 21.1449 25.3333 15.9999 25.3333ZM15.9999 9.00001C13.4216 9.00001 11.3333 11.0883 11.3333 13.6667H13.6666C13.6666 12.3833 14.7166 11.3333 15.9999 11.3333C17.2833 11.3333 18.3333 12.3833 18.3333 13.6667C18.3333 16 14.8333 15.7083 14.8333 19.5H17.1666C17.1666 16.875 20.6666 16.5833 20.6666 13.6667C20.6666 11.0883 18.5783 9.00001 15.9999 9.00001Z"/></svg>

      <svg id="toggle-mode" onClick={changeTheme} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 508.47" className='icon' alt="toggle-dark-mode"><path  fillRule="nonzero" d="M254.23 508.47c-3.94 0-7.87-.1-11.77-.28h-1.54v-.07c-64.9-3.34-123.37-31.04-166.45-74.12C28.46 387.99 0 324.42 0 254.23c0-70.19 28.46-133.75 74.47-179.76C117.55 31.39 176.03 3.69 240.92.34V.27h1.54c3.9-.18 7.83-.27 11.77-.27l3.46.02.08-.02c70.19 0 133.75 28.46 179.76 74.47 46 46.01 74.47 109.57 74.47 179.76S483.53 387.99 437.53 434c-46.01 46.01-109.57 74.47-179.76 74.47l-.08-.03-3.46.03zm-13.31-30.56V30.56C184.33 33.87 133.4 58.17 95.79 95.79c-40.55 40.54-65.62 96.56-65.62 158.44 0 61.89 25.07 117.91 65.62 158.45 37.61 37.61 88.54 61.91 145.13 65.23z"></path><title>Toggle Dark Mode</title></svg>
      
      </div>
    </nav>
  )
}