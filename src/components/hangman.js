import React, { Component } from 'react';
import {countryPicker} from './wordSelector';

import '../styles/hangman.css'


class Hangman extends Component {
    static defaultProps = {
        maxGuess: 5
    };

    constructor(props) {
        super(props);
        this.state = {
            mistake: 0,
            guessed: new Set(),
            answer: countryPicker()
        };
        this.handleGuess = this.handleGuess.bind(this);
    }

    guessedWord() {        
        return this.state.answer.split("").map(correct => 
            (this.state.guessed.has(correct) ? correct : correct === " " ? " " : "_"));
    }

    handleGuess(evt) {
        let letter = evt.target.value;
        console.log(evt);
        
        this.setState(st => ({
            guessed: st.guessed.add(letter),
            mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
        }));
    }

    generateButtons() {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => (
            <button
                key={letter}
                value={letter}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(letter)}
            >
                {letter}
            </button>
        ));
    }

    resetButton = () => {
        this.setState({
            mistake: 0,
            guessed: new Set(),
            answer: countryPicker()
        });
    }

    render() {
        const gameOver = this.state.mistake >= this.props.maxGuess;
        const isWinner = this.guessedWord().join("") === this.state.answer;
        let gameStat = this.generateButtons();
        let outcome;
        if (isWinner) {
            gameStat = "";
            outcome = "Parabens 🙂"
        }
        if (gameOver) {
            gameStat = "";
            outcome = "Voce perdeu 🙁"
        }

        return (
            <div className='Hangman'>
                <div className='top-part text-center'>
                    <h1>
                        {!gameOver && !isWinner ? this.props.maxGuess - this.state.mistake : outcome}
                    </h1>
                    <p className='Hangman-word'>
                        {!gameOver ? this.guessedWord() : this.state.answer}
                    </p>
                </div>

                <div className='bottom-part'>
                    <p className='text-center'>{gameStat}</p>
                </div>
                <p className='text-center'>
                    <button className='Hangman-reset' onClick={this.resetButton}>
                       Novo
					</button>
                </p>
            </div>
        );
    }
}

export default Hangman;