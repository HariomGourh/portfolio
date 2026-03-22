import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * ThreeBackground
 * ───────────────
 * Fixed full-screen canvas behind all content.
 * Contains:
 *  • 3000 coloured particles (cyan / violet / coral)  — tuned for light bg
 *  • 5 rotating wireframe geometries
 *  • Mouse-parallax camera movement
 */
export default function ThreeBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    /* ── Particle System ── */
    const geo = new THREE.BufferGeometry()
    const N   = 3000
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)

    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22
      const r = Math.random()
      /* Deeper, more saturated colours that read well on white */
      if (r < 0.5)       { col[i*3]=0.03; col[i*3+1]=0.57; col[i*3+2]=0.69 } // teal  #0891b2
      else if (r < 0.82) { col[i*3]=0.49; col[i*3+1]=0.23; col[i*3+2]=0.93 } // violet #7c3aed
      else                { col[i*3]=0.88; col[i*3+1]=0.11; col[i*3+2]=0.28 } // coral  #e11d48
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.026, vertexColors: true,
      transparent: true, opacity: 0.38, sizeAttenuation: true,
    })
    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    /* ── Wireframe Shapes ── */
    const shapes = []
    const geoList = [
      new THREE.IcosahedronGeometry(0.65, 1),
      new THREE.OctahedronGeometry(0.55),
      new THREE.TetrahedronGeometry(0.52),
      new THREE.TorusGeometry(0.42, 0.13, 8, 24),
      new THREE.DodecahedronGeometry(0.5),
    ]
    /* Shapes use same palette but even lower opacity */
    const shapeColors = [0x0891b2, 0x7c3aed, 0xe11d48, 0xd97706, 0x22c55e]

    geoList.forEach((g, i) => {
      const m = new THREE.MeshBasicMaterial({
        color: shapeColors[i], wireframe: true, opacity: 0.07, transparent: true,
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

    /* ── Mouse Parallax ── */
    let mx = 0, my = 0
    const onMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    document.addEventListener('mousemove', onMouseMove)

    /* ── Animation Loop ── */
    let t = 0, animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      t += 0.004
      particles.rotation.y = t * 0.04
      particles.rotation.x = t * 0.018
      shapes.forEach((s, i) => {
        s.rotation.x += 0.004 * (i + 1) * 0.4
        s.rotation.y += 0.006 * (i + 1) * 0.4
        s.position.y += Math.sin(t + i * 1.3) * 0.002
      })
      camera.position.x += (mx * 0.35  - camera.position.x) * 0.04
      camera.position.y += (-my * 0.25 - camera.position.y) * 0.04
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    /* ── Resize Handler ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

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
