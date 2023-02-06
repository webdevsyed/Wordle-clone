import { useState } from 'react'
import Game from './components/Game'
import Header from './components/Header'
import './styles/App.css'

function App() {
  const [theme, setTheme] = useState("dark-mode")
  
const changeTheme=()=>{
      (theme === "dark-mode") ? setTheme("light-mode") : setTheme("dark-mode");
    }  

  return (
    <div className={theme} id="App">

      <Header  changeTheme={changeTheme}/>

      <Game />

    </div>
  )
}

export default App
