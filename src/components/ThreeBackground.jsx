import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * ThreeBackground
 * ───────────────
 * Fixed full-screen canvas. Theme-aware particle colours:
 *  • Dark  → bright glowing cyan / violet / coral
 *  • Light → deeper, more saturated equivalents
 */
export default function ThreeBackground({ theme }) {
  const canvasRef   = useRef(null)
  const themeRef    = useRef(theme)

  /* Track theme changes without re-mounting */
  useEffect(() => { themeRef.current = theme }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    /* ── Particle system ── */
    const geo = new THREE.BufferGeometry()
    const N   = 2800
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)

    const updateColors = (isDark) => {
      for (let i = 0; i < N; i++) {
        const r = Math.random()
        if (isDark) {
          if (r < 0.50)      { col[i*3]=0.22; col[i*3+1]=0.74; col[i*3+2]=0.97 } // #38bdf8 cyan
          else if (r < 0.82) { col[i*3]=0.65; col[i*3+1]=0.55; col[i*3+2]=0.98 } // #a78bfa violet
          else               { col[i*3]=0.98; col[i*3+1]=0.44; col[i*3+2]=0.51 } // #fb7185 coral
        } else {
          if (r < 0.50)      { col[i*3]=0.01; col[i*3+1]=0.52; col[i*3+2]=0.78 } // #0284c7
          else if (r < 0.82) { col[i*3]=0.49; col[i*3+1]=0.23; col[i*3+2]=0.93 } // #7c3aed
          else               { col[i*3]=0.88; col[i*3+1]=0.11; col[i*3+2]=0.28 } // #e11d48
        }
      }
      geo.attributes.color.needsUpdate = true
    }

    for (let i = 0; i < N; i++) {
      pos[i*3]     = (Math.random() - 0.5) * 22
      pos[i*3 + 1] = (Math.random() - 0.5) * 22
      pos[i*3 + 2] = (Math.random() - 0.5) * 22
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    updateColors(theme !== 'light')

    const mat = new THREE.PointsMaterial({
      size: 0.022, vertexColors: true,
      transparent: true,
      opacity: theme === 'light' ? 0.38 : 0.6,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    /* ── Wireframe shapes ── */
    const shapes = []
    const geoList = [
      new THREE.IcosahedronGeometry(0.62, 1),
      new THREE.OctahedronGeometry(0.52),
      new THREE.TetrahedronGeometry(0.50),
      new THREE.TorusGeometry(0.40, 0.12, 8, 24),
      new THREE.DodecahedronGeometry(0.48),
    ]
    const shapeColorsDark  = [0x38bdf8, 0xa78bfa, 0xfb7185, 0xfbbf24, 0x34d399]
    const shapeColorsLight = [0x0284c7, 0x7c3aed, 0xe11d48, 0xd97706, 0x059669]

    geoList.forEach((g, i) => {
      const m = new THREE.MeshBasicMaterial({
        color: theme === 'light' ? shapeColorsLight[i] : shapeColorsDark[i],
        wireframe: true, opacity: theme === 'light' ? 0.07 : 0.1, transparent: true,
      })
      const mesh = new THREE.Mesh(g, m)
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      )
      scene.add(mesh)
      shapes.push(mesh)
    })

    /* ── Mouse parallax ── */
    let mx = 0, my = 0
    const onMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    document.addEventListener('mousemove', onMouseMove)

    /* ── Animation loop ── */
    let t = 0, animId
    let prevTheme = themeRef.current
    const animate = () => {
      animId = requestAnimationFrame(animate)
      t += 0.004

      /* React to theme change */
      if (themeRef.current !== prevTheme) {
        const isDark = themeRef.current !== 'light'
        updateColors(isDark)
        mat.opacity = isDark ? 0.6 : 0.38
        shapes.forEach((s, i) => {
          s.material.color.setHex(isDark ? shapeColorsDark[i] : shapeColorsLight[i])
          s.material.opacity = isDark ? 0.1 : 0.07
        })
        prevTheme = themeRef.current
      }

      particles.rotation.y = t * 0.035
      particles.rotation.x = t * 0.016
      shapes.forEach((s, i) => {
        s.rotation.x += 0.004 * (i + 1) * 0.38
        s.rotation.y += 0.006 * (i + 1) * 0.38
        s.position.y += Math.sin(t + i * 1.3) * 0.002
      })
      camera.position.x += (mx * 0.32  - camera.position.x) * 0.04
      camera.position.y += (-my * 0.22 - camera.position.y) * 0.04
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    /* Resize */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, []) // eslint-disable-line

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  )
}
