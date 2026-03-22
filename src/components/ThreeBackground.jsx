import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground({ theme }) {
  const canvasRef = useRef(null)
  const themeRef  = useRef(theme)
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

    const N   = 2600
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)

    const setColors = (isDark) => {
      for (let i = 0; i < N; i++) {
        const r = Math.random()
        if (isDark) {
          if (r < 0.45)      { col[i*3]=0.61; col[i*3+1]=0.48; col[i*3+2]=0.96 } // violet #9b7af4
          else if (r < 0.72) { col[i*3]=0.78; col[i*3+1]=1.0;  col[i*3+2]=0.0  } // lime #c8ff00
          else               { col[i*3]=0.96; col[i*3+1]=0.45; col[i*3+2]=0.71 } // rose #f472b6
        } else {
          if (r < 0.55)      { col[i*3]=0.43; col[i*3+1]=0.16; col[i*3+2]=0.85 } // #6d28d9
          else if (r < 0.80) { col[i*3]=0.36; col[i*3+1]=0.47; col[i*3+2]=0.0  } // dark lime
          else               { col[i*3]=0.75; col[i*3+1]=0.09; col[i*3+2]=0.36 } // rose
        }
      }
      geo.attributes.color.needsUpdate = true
    }

    for (let i = 0; i < N; i++) {
      pos[i*3]     = (Math.random() - 0.5) * 24
      pos[i*3 + 1] = (Math.random() - 0.5) * 24
      pos[i*3 + 2] = (Math.random() - 0.5) * 24
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    setColors(theme !== 'light')

    const mat = new THREE.PointsMaterial({
      size: 0.018, vertexColors: true,
      transparent: true, opacity: theme === 'light' ? 0.32 : 0.52,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    /* Wireframe shapes */
    const shapes = []
    const geoList = [
      new THREE.OctahedronGeometry(0.58),
      new THREE.IcosahedronGeometry(0.62, 1),
      new THREE.TetrahedronGeometry(0.50),
      new THREE.TorusGeometry(0.42, 0.11, 8, 24),
    ]
    const darkColors  = [0x9b7af4, 0xc8ff00, 0xf472b6, 0xfbbf24]
    const lightColors = [0x6d28d9, 0x5b7700, 0xbe185d, 0xb45309]

    geoList.forEach((g, i) => {
      const m = new THREE.MeshBasicMaterial({
        color: theme === 'light' ? lightColors[i] : darkColors[i],
        wireframe: true, opacity: theme === 'light' ? 0.06 : 0.09, transparent: true,
      })
      const mesh = new THREE.Mesh(g, m)
      mesh.position.set((Math.random()-.5)*10, (Math.random()-.5)*8, (Math.random()-.5)*6-2)
      scene.add(mesh)
      shapes.push(mesh)
    })

    let mx = 0, my = 0
    const onMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    document.addEventListener('mousemove', onMouseMove)

    let t = 0, animId, prevTheme = themeRef.current
    const animate = () => {
      animId = requestAnimationFrame(animate)
      t += 0.004
      if (themeRef.current !== prevTheme) {
        const isDark = themeRef.current !== 'light'
        setColors(isDark)
        mat.opacity = isDark ? 0.52 : 0.32
        shapes.forEach((s, i) => {
          s.material.color.setHex(isDark ? darkColors[i] : lightColors[i])
          s.material.opacity = isDark ? 0.09 : 0.06
        })
        prevTheme = themeRef.current
      }
      particles.rotation.y = t * 0.032
      particles.rotation.x = t * 0.014
      shapes.forEach((s, i) => {
        s.rotation.x += 0.003 * (i + 1) * 0.4
        s.rotation.y += 0.005 * (i + 1) * 0.4
        s.position.y += Math.sin(t + i * 1.3) * 0.002
      })
      camera.position.x += (mx * 0.3  - camera.position.x) * 0.04
      camera.position.y += (-my * 0.2 - camera.position.y) * 0.04
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

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
      style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none' }}
    />
  )
}
