import React, { useState, useEffect } from 'react'
import './Memorama.css'
import { members } from '../data/members'
import { playMatchSound, playErrorSound } from '../utils/sounds'

function Memorama({ onPointsUpdate }) {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [points, setPoints] = useState(0)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    // Duplicar las tarjetas y mezclarlas
    const duplicatedCards = [...members, ...members].map((member, index) => ({
      ...member,
      id: `${member.name}-${index}`,
      isFlipped: false,
    }))

    // Mezclar las tarjetas
    const shuffled = duplicatedCards.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlippedCards([])
    setMatchedPairs([])
    setPoints(0)
  }

  const handleCardClick = (cardId) => {
    if (isChecking || flippedCards.length === 2) return
    
    const card = cards.find(c => c.id === cardId)
    if (card.isFlipped || matchedPairs.includes(card.name)) return

    const newCards = cards.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
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

    if (firstCard.name === secondCard.name) {
      // ¡Coincidencia!
      playMatchSound() // Sonido de éxito
      setMatchedPairs([...matchedPairs, firstCard.name])
      setPoints(points + 1)
      onPointsUpdate(1)
      
      // Mantener las tarjetas volteadas
      setFlippedCards([])
      setIsChecking(false)
    } else {
      // No coinciden, voltear de nuevo
      playErrorSound() // Sonido de error
      setTimeout(() => {
        const newCards = cards.map(card =>
          flippedIds.includes(card.id) && !matchedPairs.includes(card.name)
            ? { ...card, isFlipped: false }
            : card
        )
        setCards(newCards)
        setFlippedCards([])
        setIsChecking(false)
      }, 1000)
    }
  }

  const allMatched = matchedPairs.length === members.length

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
          <p className="final-points">Puntos obtenidos: {points}</p>
          <button onClick={initializeGame} className="restart-button">
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
                    <img src={card.image} alt={card.name} />
                    <p className="card-name">{card.name}</p>
                    <p className="card-group">{card.group}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={initializeGame} className="restart-button">
            Reiniciar Juego
          </button>
        </>
      )}
    </div>
  )
}

export default Memorama
