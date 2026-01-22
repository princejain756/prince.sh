import { useEffect } from 'react'

/**
 * Custom hook to prevent image downloads through various methods:
 * - Right-click context menu on images
 * - Drag and drop
 * - Keyboard shortcuts (Ctrl+S, Ctrl+Shift+S)
 */
export function useImageProtection() {
    useEffect(() => {
        // Prevent right-click context menu on images and canvas
        const handleContextMenu = (e) => {
            const target = e.target
            if (
                target.tagName === 'IMG' ||
                target.tagName === 'CANVAS' ||
                target.closest('.scrolly-sticky') ||
                target.closest('.frame-canvas')
            ) {
                e.preventDefault()
                return false
            }
        }

        // Prevent drag on images and canvas
        const handleDragStart = (e) => {
            if (
                e.target.tagName === 'IMG' ||
                e.target.tagName === 'CANVAS'
            ) {
                e.preventDefault()
                return false
            }
        }

        // Block save keyboard shortcuts on images
        const handleKeyDown = (e) => {
            // Ctrl+S or Cmd+S (Save)
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                // Allow if user is focused on an input
                if (document.activeElement?.tagName !== 'INPUT' &&
                    document.activeElement?.tagName !== 'TEXTAREA') {
                    e.preventDefault()
                    return false
                }
            }
            // Ctrl+Shift+S (Save As)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 's') {
                e.preventDefault()
                return false
            }
        }

        // Add event listeners
        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('dragstart', handleDragStart)
        document.addEventListener('keydown', handleKeyDown)

        // Cleanup
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('dragstart', handleDragStart)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])
}

export default useImageProtection
