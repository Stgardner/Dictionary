import {useEffect, useState} from 'react'
import axios from 'axios';
import './App.css';
import { Container, withStyles, Switch } from '@material-ui/core';
import Header from './components/header/Header';
import Definitionss from './components/definitions/Definitions';
import { grey } from '@material-ui/core/colors';
import React from 'react';

function App() {
const [word, setWord] = useState("")
const [meanings, setMeanings] = useState([])
const [category, setCategory] = useState('en')
const [lightMode, setLightMode] = useState(false)

const DarkMode = withStyles({
  switchBase: {
    color: grey[300],
    '&$checked': {
      color: grey[500],
    },
    '&$checked + $track': {
      backgroundColor: grey[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

  const dictionaryAPI = async() => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
        )

        console.log(data)
        setMeanings(data.data)
    } catch (error) {
      console.log(error)
    }
  }

console.log(meanings)

  useEffect(() => {
    dictionaryAPI()
    // eslint-disable-next-line
  }, [word, category])


  return (
    <div className="App" 
    style={{
      height: '100vh',
      backgroundColor: lightMode ? 'black': "lightcoral", 
      color: "white",
      transition: "all 0.5s linear"
      }}>
      <Container maxWidth="md" style={{display: "flex", flexDirection: "column", height: '100vh', justifyContent: "space-evenly"}}>
        <div style={{position: "absolute", top: 0, right: 15, paddingTop: 10}}>
          <span>{lightMode?  "Dark" : "Light" } Mode</span>
        <DarkMode 
          checked={lightMode}
          onChange={() => setLightMode(!lightMode)}
        />
        </div>
        
      <Header 
      category={category} 
      setCategory={setCategory}
       word={word}
       setWord={setWord}
       />
      {meanings && (
        <Definitionss word={word} meanings={meanings} category={category}/>)}
      </Container>
    
    </div>
  );
}

export default App;
