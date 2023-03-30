import "./App.css";
import { React, useRef, useState } from "react";
function App() {
  const searchRef = useRef()
  const [apivalue, setapiValue] = useState()
  
  const data = (result, word) => {
    if (result?.title) {
      searchRef.current.innerHTML = `Can't find the meanings of <span>"${word}"</span>. Please, try to search for another word. `
    } else {
      result?.map((res) => {
        setapiValue(res)
      })
    }
  }

  console.log(apivalue);

  const fecthAPi = (word) => {
    searchRef.current.style.color = "#000"
    searchRef.current.innerHTML = `Searching the meaning of <span>"${word}"</span>`

    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url).then(res => res?.json()).then(result => {
      data(result, word);
    })
  }

  const handlechange = (e) => {
    if (e.key === "Enter" && e.target.value) {
      fecthAPi(e.target.value);
    }
  }

  const handleclick = () => {
    let audio = new Audio(apivalue[0]?.phonetics[2]?.audio)
    audio.play()
  }

  return (
    <>
      <div className={apivalue ? "wrapper active" : "wrapper"}>
        <header>English Dictionary</header>
        <div className="search">
          <input type="text" onKeyUp={handlechange} placeholder="Search a word" required />
          <i className="fas fa-search"></i>
          <span className="material-icons">close</span>
        </div>
        <p className="info-text" ref={searchRef}>Type a word and press enter to get meaning, example, pronunciation, and synonyms of that typed word.</p>
        <ul>
          <li className="word">
            <div className="details">
              <p>
                {apivalue?.word}
              </p>
              <span>
                {
                  `${apivalue?.meanings?.map(res=> res?.partOfSpeech)}  ${apivalue?.phonetics?.map(res=> res?.text)} `
                }
              </span>
            </div>
            <i className="fas fa-volume-up" onClick={handleclick}></i>
          </li>
          <div className="content">
            <li className="meaning">
              <div className="details">
                <p>Meaning</p>
                <span>
                  {apivalue?.meanings[0]
                    ?.definitions[0]?.definition
                  }
                </span>
              </div>
            </li>
            {
              apivalue?.meanings[0]?.definitions[0]?.example == undefined ? null :
            <li className="example">
              <div className="details">
                <p>Example</p>
                <span>
                  {
                    
                  apivalue?.meanings[0]?.definitions[0]?.example 
                  }
                </span>
              </div>
            </li> 
            }
            {
              apivalue?.meanings[0]?.definitions[0]?.synonyms[0] ||  apivalue?.meanings[0]?.synonyms[0] == undefined ? null :
            <li className="synonyms">
              <div className="details">
                <p>Synonyms</p>
                    <div className="list">
                      
                      <span>
                        
                      </span>
                  
                </div>
              </div>
            </li>
            }
          </div>
        </ul>
      </div>
    </>
  );
}

export default App;
