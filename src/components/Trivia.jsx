import React, { useState, useEffect } from 'react'
import './Trivia.css'
import { triviaQuestions } from '../data/trivia'
import { playSuccessSound, playErrorSound } from '../utils/sounds'

function Trivia({ onPointsUpdate }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  useEffect(() => {
    // Mezclar las preguntas al iniciar
    const shuffled = [...triviaQuestions].sort(() => Math.random() - 0.5)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameFinished(false)
  }, [])

  const handleAnswerSelect = (answer) => {
    if (showResult) return
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return

    const isCorrect = selectedAnswer === triviaQuestions[currentQuestion].correctAnswer
    setShowResult(true)

    if (isCorrect) {
      playSuccessSound() // Sonido de éxito
      setScore(score + 10)
      onPointsUpdate(10)
    } else {
      playErrorSound() // Sonido de error
    }
  }

  const handleNext = () => {
    if (currentQuestion < triviaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameFinished(true)
    }
  }

  const handleRestart = () => {
    const shuffled = [...triviaQuestions].sort(() => Math.random() - 0.5)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameFinished(false)
  }

  if (gameFinished) {
    return (
      <div className="trivia">
        <div className="trivia-header">
          <h2>❓ Trivia K-Pop</h2>
        </div>
        <div className="final-score">
          <h3>🎉 ¡Juego Terminado! 🎉</h3>
          <div className="score-display">
            <p className="score-label">Puntos Totales:</p>
            <p className="score-value">{score}</p>
          </div>
          <p className="score-description">
            Respondiste {triviaQuestions.length} preguntas
          </p>
          <button onClick={handleRestart} className="restart-button">
            Jugar de Nuevo
          </button>
        </div>
      </div>
    )
  }

  const question = triviaQuestions[currentQuestion]

  return (
    <div className="trivia">
      <div className="trivia-header">
        <h2>❓ Trivia K-Pop</h2>
        <div className="trivia-stats">
          <div className="stat">
            <span className="stat-label">Pregunta</span>
            <span className="stat-value">{currentQuestion + 1}/{triviaQuestions.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Puntos</span>
            <span className="stat-value">{score}</span>
          </div>
        </div>
      </div>

      <div className="question-container">
        <div className="question-card">
          <h3 className="question-text">{question.question}</h3>
          
          <div className="answers-grid">
            {question.answers.map((answer, index) => {
              let answerClass = 'answer-button'
              if (showResult) {
                if (answer === question.correctAnswer) {
                  answerClass += ' correct'
                } else if (answer === selectedAnswer && answer !== question.correctAnswer) {
                  answerClass += ' incorrect'
                }
              } else if (selectedAnswer === answer) {
                answerClass += ' selected'
              }

              return (
                <button
                  key={index}
                  className={answerClass}
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={showResult}
                >
                  {answer}
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className={`result-message ${selectedAnswer === question.correctAnswer ? 'correct' : 'incorrect'}`}>
              {selectedAnswer === question.correctAnswer ? (
                <>
                  <span className="result-icon">✅</span>
                  <p>¡Correcto! +10 puntos</p>
                </>
              ) : (
                <>
                  <span className="result-icon">❌</span>
                  <p>Incorrecto. La respuesta correcta es: {question.correctAnswer}</p>
                </>
              )}
            </div>
          )}

          <div className="question-actions">
            {!showResult ? (
              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!selectedAnswer}
              >
                Enviar Respuesta
              </button>
            ) : (
              <button className="next-button" onClick={handleNext}>
                {currentQuestion < triviaQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trivia
