import React, { useState } from 'react'
import Memorama from './components/Memorama'
import Trivia from './components/Trivia'
import './App.css'

function App() {
  const [currentGame, setCurrentGame] = useState(null)
  const [totalPoints, setTotalPoints] = useState(0)

  const handlePointsUpdate = (points) => {
    setTotalPoints(prev => prev + points)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 K-Pop Games 🎵</h1>
        <div className="points-display">
          <span className="points-label">Puntos Totales:</span>
          <span className="points-value">{totalPoints}</span>
        </div>
      </header>

      {!currentGame ? (
        <div className="menu">
          <h2>Elige un juego:</h2>
          <div className="game-buttons">
            <button 
              className="game-button memorama-btn"
              onClick={() => setCurrentGame('memorama')}
            >
              🧠 Memorama
              <p>Encuentra las parejas de BTS y Stray Kids</p>
            </button>
            <button 
              className="game-button trivia-btn"
              onClick={() => setCurrentGame('trivia')}
            >
              ❓ Trivia
              <p>Responde preguntas sobre K-Pop</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="game-container">
          <button 
            className="back-button"
            onClick={() => setCurrentGame(null)}
          >
            ← Volver al Menú
          </button>
          {currentGame === 'memorama' && (
            <Memorama onPointsUpdate={handlePointsUpdate} />
          )}
          {currentGame === 'trivia' && (
            <Trivia onPointsUpdate={handlePointsUpdate} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
