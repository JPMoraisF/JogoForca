import React from 'react';
import './styles/App.css';
import Hangman  from './components/hangman';

function App() {
  return (
    <div className="App">
      <div id="section">
        <h1>Adivinhe o país</h1>
      </div>
      <div id="section">
        <h1><Hangman/></h1>
      </div>
    </div>
  );
}

export default App;
