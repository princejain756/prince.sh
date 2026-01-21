// Utility to play click sound
export const playClickSound = () => {
    const audio = new Audio('/clicksound.mp3')
    audio.volume = 0.5
    audio.play().catch(() => { })
}
