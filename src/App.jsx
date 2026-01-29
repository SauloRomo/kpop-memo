import React, { useState, useEffect, useRef } from 'react'
import Memorama from './components/Memorama'
import Trivia from './components/Trivia'
import { playVictoryFanfare, unlockVictoryAudio } from './utils/sounds'
import './App.css'

function App() {
  const [currentGame, setCurrentGame] = useState(null)
  const [totalPoints, setTotalPoints] = useState(0)
  const [triviaCompletions, setTriviaCompletions] = useState(0)
  const [memoramaFirstTryStar, setMemoramaFirstTryStar] = useState(false)
  const [showThirdStarModal, setShowThirdStarModal] = useState(false)
  const prevStarsRef = useRef(0)
  const audioUnlockedRef = useRef(false)
  const MAX_STARS = 3

  // Unlock victory audio on first user click (browser policy)
  useEffect(() => {
    const unlock = () => {
      if (audioUnlockedRef.current) return
      audioUnlockedRef.current = true
      unlockVictoryAudio()
      document.removeEventListener('click', unlock)
      document.removeEventListener('touchend', unlock)
    }
    document.addEventListener('click', unlock, { once: true })
    document.addEventListener('touchend', unlock, { once: true })
    return () => {
      document.removeEventListener('click', unlock)
      document.removeEventListener('touchend', unlock)
    }
  }, [])

  const handlePointsUpdate = (points) => {
    setTotalPoints(prev => prev + points)
  }

  const handleTriviaComplete = () => {
    setTriviaCompletions(prev => prev + 1)
  }

  const handleMemoramaCompleteFirstTry = () => {
    setMemoramaFirstTryStar(true)
  }

  // Star 3 only if you already have the other two (trivia + memorama first try) and complete trivia again
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
      {showThirdStarModal && (
        <div className="third-star-overlay" onClick={() => setShowThirdStarModal(false)}>
          <div className="third-star-modal" onClick={e => e.stopPropagation()}>
            <div className="third-star-stars">⭐⭐⭐</div>
            <h2 className="third-star-title">¡Las 3 estrellas!</h2>
            <p className="third-star-message">Contacta al programador para tu premio</p>
            <button type="button" className="third-star-close" onClick={() => setShowThirdStarModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
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
