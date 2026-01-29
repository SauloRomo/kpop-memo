// Sound utilities using Web Audio API
import victoryFanfareMp3 from './Final Fantasy Victory Fanfare - Sound Effect [HQ].mp3'

const victoryAudio = new Audio(victoryFanfareMp3)

/** Call once after the user's first click to unlock audio (browser policy) */
export const unlockVictoryAudio = () => {
  victoryAudio.play().then(() => {
    victoryAudio.pause()
    victoryAudio.currentTime = 0
  }).catch(() => {})
}

export const playSound = (type) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  
  let frequency
  let duration
  
  switch (type) {
    case 'success':
      // Success sound - ascending tone
      frequency = 523.25 // C
      duration = 0.2
      break
    case 'match':
      // Match sound - two tones
      frequency = 659.25 // E
      duration = 0.15
      break
    case 'error':
      // Error sound - low tone
      frequency = 220 // Low A
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

// Special sound for memorama match - two tones
export const playMatchSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  
  // First tone
  const oscillator1 = audioContext.createOscillator()
  const gainNode1 = audioContext.createGain()
  
  oscillator1.connect(gainNode1)
  gainNode1.connect(audioContext.destination)
  
  oscillator1.frequency.value = 523.25 // C
  oscillator1.type = 'sine'
  
  gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
  
  oscillator1.start(audioContext.currentTime)
  oscillator1.stop(audioContext.currentTime + 0.15)
  
  // Second tone (higher)
  setTimeout(() => {
    const oscillator2 = audioContext.createOscillator()
    const gainNode2 = audioContext.createGain()
    
    oscillator2.connect(gainNode2)
    gainNode2.connect(audioContext.destination)
    
    oscillator2.frequency.value = 659.25 // E
    oscillator2.type = 'sine'
    
    gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
    
    oscillator2.start(audioContext.currentTime)
    oscillator2.stop(audioContext.currentTime + 0.2)
  }, 100)
}

// Success sound for trivia
export const playSuccessSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  
  // Sequence of three ascending tones
  const notes = [523.25, 659.25, 783.99] // C, E, G
  
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

// Error sound
export const playErrorSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = 220 // Low A
  oscillator.type = 'sawtooth'
  
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.3)
}

// Final Fantasy victory fanfare (MP3) — plays automatically once unlocked via unlockVictoryAudio on first click
export const playVictoryFanfare = () => {
  victoryAudio.currentTime = 0
  victoryAudio.play().catch(() => {})
}
