'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Footer from './Footer'

interface Ball {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  mass: number
}

export default function InteractiveBalls() {
  const [balls, setBalls] = useState<Ball[]>([])
  const ballsRef = useRef<Ball[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const ballRadius = 60
  const gravity = 0 // ไม่มีแรงถ่วง - ลอยตลอด
  const damping = 1.001 // เพิ่มความเร็วน้อยนิด
  const friction = 0 // ไม่มีเสียดทาน
  const bounceRestitution = 1.02 // เด้งเล็กน้อย

  // สร้างลูกบอลเต็มหน้าจอ
  useEffect(() => {
    if (!containerRef.current) return

    const width = window.innerWidth
    const height = window.innerHeight

    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7',
      '#a29bfe', '#fd79a8', '#fdcb6e', '#6c5ce7', '#00b894',
      '#ff7675', '#fab1a0', '#74b9ff', '#a29bfe', '#81ecec',
    ]

    const initialBalls: Ball[] = []
    let ballId = 0
    
    // สร้างบอลใหญ่ 15 ลูก
    for (let i = 0; i < 15; i++) {
      let x, y, overlapping
      do {
        overlapping = false
        x = Math.random() * (width - ballRadius * 4) + ballRadius * 2
        y = Math.random() * (height - ballRadius * 4) + ballRadius * 2

        for (const ball of initialBalls) {
          const dx = ball.x - x
          const dy = ball.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < ballRadius * 4) {
            overlapping = true
            break
          }
        }
      } while (overlapping)

      initialBalls.push({
        id: ballId++,
        x,
        y,
        vx: (Math.random() - 0.5) * 40,
        vy: (Math.random() - 0.5) * 40,
        radius: ballRadius,
        color: colors[i % colors.length],
        mass: 1,
      })
    }

    // สร้างบอลเล็ก 20 ลูก
    const smallRadius = 25
    for (let i = 0; i < 20; i++) {
      let x, y, overlapping
      do {
        overlapping = false
        x = Math.random() * (width - smallRadius * 4) + smallRadius * 2
        y = Math.random() * (height - smallRadius * 4) + smallRadius * 2

        for (const ball of initialBalls) {
          const dx = ball.x - x
          const dy = ball.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < (ball.radius + smallRadius) * 2) {
            overlapping = true
            break
          }
        }
      } while (overlapping)

      initialBalls.push({
        id: ballId++,
        x,
        y,
        vx: (Math.random() - 0.5) * 40,
        vy: (Math.random() - 0.5) * 40,
        radius: smallRadius,
        color: colors[i % colors.length],
        mass: 1,
      })
    }

    setBalls(initialBalls)
    ballsRef.current = initialBalls
  }, [])

  // Physics simulation
  useEffect(() => {
    const animate = () => {
      if (!containerRef.current || ballsRef.current.length === 0) {
        requestAnimationFrame(animate)
        return
      }

      const width = window.innerWidth
      const height = window.innerHeight

      // อัปเดตตำแหน่งและตรวจสอบผนัง
      ballsRef.current.forEach((ball) => {
        // ความโน้มถ่วง
        ball.vy += gravity

        // แรงเสียดทาน
        ball.vx *= damping - friction
        ball.vy *= damping - friction

        // ลดความเร็วที่มากเกินไป
        const maxSpeed = 12
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy)
        if (speed > maxSpeed) {
          const ratio = maxSpeed / speed
          ball.vx *= ratio
          ball.vy *= ratio
        }

        // อัปเดตตำแหน่ง
        ball.x += ball.vx
        ball.y += ball.vy

        // เด้งชนผนัง
        if (ball.y + ball.radius > height) {
          ball.y = height - ball.radius
          ball.vy *= -bounceRestitution
        }
        if (ball.y - ball.radius < 0) {
          ball.y = ball.radius
          ball.vy *= -bounceRestitution
        }
        if (ball.x + ball.radius > width) {
          ball.x = width - ball.radius
          ball.vx *= -bounceRestitution
        }
        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius
          ball.vx *= -bounceRestitution
        }
      })

      // ตรวจสอบการชนกันแบบเรียบง่าย
      for (let i = 0; i < ballsRef.current.length; i++) {
        for (let j = i + 1; j < ballsRef.current.length; j++) {
          const ball1 = ballsRef.current[i]
          const ball2 = ballsRef.current[j]

          const dx = ball2.x - ball1.x
          const dy = ball2.y - ball1.y
          const distSquared = dx * dx + dy * dy
          const minDistSquared = (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius)

          if (distSquared < minDistSquared && distSquared > 0) {
            const dist = Math.sqrt(distSquared)
            const overlap = (ball1.radius + ball2.radius - dist) * 0.5

            // แยกบอล
            const nx = dx / dist
            const ny = dy / dist
            ball1.x -= nx * overlap
            ball1.y -= ny * overlap
            ball2.x += nx * overlap
            ball2.y += ny * overlap

            // สลับความเร็ว (เรียบง่าย)
            const tempVx = ball1.vx
            const tempVy = ball1.vy
            ball1.vx = ball2.vx
            ball1.vy = ball2.vy
            ball2.vx = tempVx
            ball2.vy = tempVy
          }
        }
      }

      setBalls([...ballsRef.current])
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  // ลบระบบติดตามเมาส์

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950"
    >
      {/* ลูกบอล */}
      {balls.map((ball) => (
        <div
          key={ball.id}
          className="absolute"
          style={{
            left: ball.x - ball.radius,
            top: ball.y - ball.radius,
            width: ball.radius * 2,
            height: ball.radius * 2,
            background: `radial-gradient(circle at 35% 35%, ${ball.color}, ${ball.color}dd 40%, ${ball.color}99)`,
            borderRadius: '50%',
            boxShadow: `
              0 10px 30px rgba(0,0,0,0.8),
              inset -2px -2px 8px rgba(0,0,0,0.6),
              inset 3px 3px 8px rgba(255,255,255,0.2),
              0 0 20px ${ball.color}66
            `,
            filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))',
          }}
        >
          {/* ไฮไลต์ (Specular) */}
          <div
            style={{
              position: 'absolute',
              width: '30%',
              height: '30%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.8), transparent)',
              borderRadius: '50%',
              top: '15%',
              left: '20%',
              filter: 'blur(2px)',
            }}
          />
        </div>
      ))}

      {/* ข้อความศูนย์กลาง */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            Flexylab
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto drop-shadow-lg">
            Experience interactive physics with dynamic spheres
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
            <button 
              onClick={() => window.location.href = '/shop'}
              className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition shadow-lg cursor-pointer"
            >
              Shop Now
            </button>
            <button 
              onClick={() => console.log("Learn More clicked")}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition shadow-lg cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
