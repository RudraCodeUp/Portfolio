"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  age: number
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      
      // Add new point
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
      })

      // Limit number of points
      if (pointsRef.current.length > 30) {
        pointsRef.current.shift()
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas completely (no fade impressions)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw points
      pointsRef.current = pointsRef.current.filter((point) => {
        point.age += 1
        return point.age < 60 // Remove old points
      })

      if (pointsRef.current.length > 1) {
        // Create gradient stroke
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        // Draw the brush stroke
        for (let i = 1; i < pointsRef.current.length; i++) {
          const point = pointsRef.current[i]
          const prevPoint = pointsRef.current[i - 1]

          // Calculate opacity based on age
          const opacity = Math.max(0, 1 - point.age / 60)
          
          // Calculate width based on position in trail
          const progress = i / pointsRef.current.length
          const width = 15 * (1 - progress) + 3

          // Create gradient for magical effect
          const gradient = ctx.createLinearGradient(
            prevPoint.x,
            prevPoint.y,
            point.x,
            point.y
          )
          
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.8})`)
          gradient.addColorStop(0.5, `rgba(200, 200, 255, ${opacity * 0.6})`)
          gradient.addColorStop(1, `rgba(150, 150, 255, ${opacity * 0.4})`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = width
          
          ctx.beginPath()
          ctx.moveTo(prevPoint.x, prevPoint.y)
          ctx.lineTo(point.x, point.y)
          ctx.stroke()

          // Add glow effect
          ctx.shadowBlur = 10
          ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.5})`
        }

        // Reset shadow
        ctx.shadowBlur = 0
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
