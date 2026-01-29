// Utilidad para reproducir sonidos usando Web Audio API
export const playSound = (type) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  
  let frequency
  let duration
  
  switch (type) {
    case 'success':
      // Sonido de éxito - tono ascendente
      frequency = 523.25 // Do
      duration = 0.2
      break
    case 'match':
      // Sonido de coincidencia - dos tonos
      frequency = 659.25 // Mi
      duration = 0.15
      break
    case 'error':
      // Sonido de error - tono bajo
      frequency = 220 // La bajo
      duration = 0.2
      break
    default:
      frequency = 440
      duration = 0.1
  }
  
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = frequency
  oscillator.type = type === 'success' ? 'sine' : 'square'
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration)
}

// Sonido especial para match en memorama - dos tonos
export const playMatchSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  
  // Primer tono
  const oscillator1 = audioContext.createOscillator()
  const gainNode1 = audioContext.createGain()
  
  oscillator1.connect(gainNode1)
  gainNode1.connect(audioContext.destination)
  
  oscillator1.frequency.value = 523.25 // Do
  oscillator1.type = 'sine'
  
  gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
  
  oscillator1.start(audioContext.currentTime)
  oscillator1.stop(audioContext.currentTime + 0.15)
  
  // Segundo tono (más alto)
  setTimeout(() => {
    const oscillator2 = audioContext.createOscillator()
    const gainNode2 = audioContext.createGain()
    
    oscillator2.connect(gainNode2)
    gainNode2.connect(audioContext.destination)
    
    oscillator2.frequency.value = 659.25 // Mi
    oscillator2.type = 'sine'
    
    gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
    
    oscillator2.start(audioContext.currentTime)
    oscillator2.stop(audioContext.currentTime + 0.2)
  }, 100)
}

// Sonido de éxito para trivia
export const playSuccessSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  
  // Secuencia de tres tonos ascendentes
  const notes = [523.25, 659.25, 783.99] // Do, Mi, Sol
  
  notes.forEach((freq, index) => {
    setTimeout(() => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = freq
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.15)
    }, index * 80)
  })
}

// Sonido de error
export const playErrorSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = 220 // La bajo
  oscillator.type = 'sawtooth'
  
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.3)
}

// Fanfarria de victoria estilo Final Fantasy (melodía ascendente triunfal)
export const playVictoryFanfare = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()

  // Melodía tipo victoria FF: notas ascendentes y acorde final (Eb major)
  const notes = [
    { freq: 311.13, duration: 0.2 },   // Eb4
    { freq: 369.99, duration: 0.2 },   // G4
    { freq: 415.30, duration: 0.2 },   // Ab4
    { freq: 523.25, duration: 0.35 },  // C5
    { freq: 622.25, duration: 0.2 },   // Eb5
    { freq: 523.25, duration: 0.25 }, // C5
    { freq: 415.30, duration: 0.4 },  // Ab4 (sostenido)
    { freq: 311.13, duration: 0.2 },   // Eb4
    { freq: 369.99, duration: 0.2 },   // G4
    { freq: 466.16, duration: 0.5 },  // Bb4 - final
  ]

  let time = audioContext.currentTime

  notes.forEach(({ freq, duration }) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = freq
    oscillator.type = 'square'

    gainNode.gain.setValueAtTime(0, time)
    gainNode.gain.linearRampToValueAtTime(0.2, time + 0.02)
    gainNode.gain.setValueAtTime(0.2, time + duration - 0.05)
    gainNode.gain.linearRampToValueAtTime(0.01, time + duration)

    oscillator.start(time)
    oscillator.stop(time + duration)

    time += duration + 0.05
  })
}
