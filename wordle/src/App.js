import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Header from './components/Header';
import Description from './components/Description';
import Button from "./components/Button";
import WordleInput from './components/WordleInput';
import WordleComponent from './components/WordleComponent';



function App() {


  return (
    <>
      <Header/>
      <Description>
        Guess the 5 letter name!
      </Description>

      <div style={{ display: 'flex', justifyContent: "center", paddingBottom: "20px"}}>
        <Button text={"Reset"} />
      </div>
 
      

      <div className="App">
        <div >
          <WordleComponent/>
        </div>
      </div>
    </>
  );
}

export default App;
