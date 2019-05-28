import React from 'react';
import logo from '../images/logo.png';
import '../styles/App.css';

import TextProcessing from './TextProcessing';

function App() {
  return (
    <div className="App">
      <div className="about">
        <div>8 вариант </div>
        <div>Квач Антон</div>
        <div>Б.ПИ.ЭК-17.08</div>
      </div>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <TextProcessing />
      </header>
    </div>
  );
}

export default App;
