import React from 'react';
import logo from '../images/penis.svg';
import '../styles/App.css';

import TextProcessing from './TextProcessing';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TextProcessing />
      </header>
    </div>
  );
}

export default App;
