import React, { useState, useEffect, useRef } from 'react'
import './Memorama.css'
import { members } from '../data/members'
import { playMatchSound, playErrorSound } from '../utils/sounds'

function Memorama({ onPointsUpdate, onMemoramaCompleteFirstTry }) {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [points, setPoints] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [hasRestarted, setHasRestarted] = useState(false)
  const hasReportedFirstTry = useRef(false)

  const allMatched = matchedPairs.length === members.length

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (allMatched && !hasRestarted && !hasReportedFirstTry.current && onMemoramaCompleteFirstTry) {
      hasReportedFirstTry.current = true
      onMemoramaCompleteFirstTry()
    }
  }, [allMatched, hasRestarted, onMemoramaCompleteFirstTry])

  const initializeGame = (isRestart = false) => {
    if (isRestart) setHasRestarted(true)
    // Duplicate cards and shuffle
    const duplicatedCards = [...members, ...members].map((member, index) => ({
      ...member,
      id: `${member.name}-${index}`,
      isFlipped: false,
    }))

    // Shuffle cards
    const shuffled = duplicatedCards.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlippedCards([])
    setMatchedPairs([])
    setPoints(0)
  }

  const handleCardClick = (cardId) => {
    if (isChecking || flippedCards.length === 2) return

    const clickedCard = cards.find(c => c.id === cardId)
    if (!clickedCard || clickedCard.isFlipped || matchedPairs.includes(clickedCard.name)) return

    const newCards = cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    )
    setCards(newCards)
    setFlippedCards([...flippedCards, cardId])

    if (flippedCards.length === 1) {
      setIsChecking(true)
      setTimeout(() => {
        checkMatch([...flippedCards, cardId])
      }, 500)
    }
  }

  const checkMatch = (flippedIds) => {
    const [firstId, secondId] = flippedIds
    const firstCard = cards.find(c => c.id === firstId)
    const secondCard = cards.find(c => c.id === secondId)
    if (!firstCard || !secondCard) {
      setFlippedCards([])
      setIsChecking(false)
      return
    }

    if (firstCard.name === secondCard.name) {
      // Match!
      playMatchSound() // Success sound
      setMatchedPairs([...matchedPairs, firstCard.name])
      setPoints(points + 1)
      onPointsUpdate(1)
      
      // Keep cards flipped
      setFlippedCards([])
      setIsChecking(false)
    } else {
      // No match, flip back
      playErrorSound() // Error sound
      setTimeout(() => {
        const newCards = cards.map(c =>
          flippedIds.includes(c.id) && !matchedPairs.includes(c.name)
            ? { ...c, isFlipped: false }
            : c
        )
        setCards(newCards)
        setFlippedCards([])
        setIsChecking(false)
      }, 1000)
    }
  }

  return (
    <div className="memorama">
      <div className="memorama-header">
        <h2>🧠 Memorama K-Pop</h2>
        <div className="memorama-stats">
          <div className="stat">
            <span className="stat-label">Puntos:</span>
            <span className="stat-value">{points}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Parejas:</span>
            <span className="stat-value">{matchedPairs.length}/{members.length}</span>
          </div>
        </div>
      </div>

      {allMatched ? (
        <div className="victory-message">
          <h3>🎉 ¡Felicidades! 🎉</h3>
          <p>Has completado el memorama</p>
          {!hasRestarted && (
            <p className="memorama-star-reward">⭐ ¡Lo completaste a la primera! Ganaste la segunda estrella.</p>
          )}
          <p className="final-points">Puntos obtenidos: {points}</p>
          <button onClick={() => initializeGame(true)} className="restart-button">
            Jugar de Nuevo
          </button>
        </div>
      ) : (
        <>
          <div className="cards-grid">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`card ${card.isFlipped || matchedPairs.includes(card.name) ? 'flipped' : ''} ${matchedPairs.includes(card.name) ? 'matched' : ''}`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="card-inner">
                  <div className="card-front">
                    <span className="card-icon">🎵</span>
                  </div>
                  <div className="card-back">
                    <img 
                      src={card.image} 
                      alt={card.name} 
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(card.name)}&background=667eea&color=fff&size=400&bold=true`
                      }}
                      loading="lazy"
                    />
                    <p className="card-name">{card.name}</p>
                    <p className="card-group">{card.group}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => initializeGame(true)} className="restart-button">
            Reiniciar Juego
          </button>
        </>
      )}
    </div>
  )
}

export default Memorama
