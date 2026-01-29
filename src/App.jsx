import React, { useState, useEffect, useRef } from 'react'
import Memorama from './components/Memorama'
import Trivia from './components/Trivia'
import { playVictoryFanfare } from './utils/sounds'
import './App.css'

function App() {
  const [currentGame, setCurrentGame] = useState(null)
  const [totalPoints, setTotalPoints] = useState(0)
  const [triviaCompletions, setTriviaCompletions] = useState(0)
  const [memoramaFirstTryStar, setMemoramaFirstTryStar] = useState(false)
  const [showThirdStarModal, setShowThirdStarModal] = useState(false)
  const prevStarsRef = useRef(0)
  const MAX_STARS = 3

  const handlePointsUpdate = (points) => {
    setTotalPoints(prev => prev + points)
  }

  const handleTriviaComplete = () => {
    setTriviaCompletions(prev => prev + 1)
  }

  const handleMemoramaCompleteFirstTry = () => {
    setMemoramaFirstTryStar(true)
  }

  // Estrella 3 solo si ya tienes las otras dos (trivia + memorama a la primera) y completas trivia de nuevo
  const star1 = triviaCompletions >= 1 ? 1 : 0
  const star2 = memoramaFirstTryStar ? 1 : 0
  const star3 = triviaCompletions >= 2 && memoramaFirstTryStar ? 1 : 0
  const totalStars = Math.min(MAX_STARS, star1 + star2 + star3)

  useEffect(() => {
    if (totalStars === 3 && prevStarsRef.current < 3) {
      playVictoryFanfare()
      setShowThirdStarModal(true)
    }
    prevStarsRef.current = totalStars
  }, [totalStars])

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 K-Pop Games 🎵</h1>
        <div className="header-right">
          {totalStars > 0 && (
            <span className="stars-badge" title="Estrella 1: trivia sin errores | Estrella 2: memorama a la primera | Estrella 3: trivia sin errores de nuevo (solo si tienes las otras dos)">
              {'⭐'.repeat(totalStars)}{'☆'.repeat(MAX_STARS - totalStars)}
            </span>
          )}
          <div className="points-display">
            <span className="points-label">Puntos Totales:</span>
            <span className="points-value">{totalPoints}</span>
          </div>
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
            <Memorama onPointsUpdate={handlePointsUpdate} onMemoramaCompleteFirstTry={handleMemoramaCompleteFirstTry} />
          )}
          {currentGame === 'trivia' && (
            <Trivia onPointsUpdate={handlePointsUpdate} onTriviaComplete={handleTriviaComplete} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
