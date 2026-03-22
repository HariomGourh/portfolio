import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground({ theme }) {
  const canvasRef = useRef(null)
  const themeRef  = useRef(theme)
  useEffect(() => { themeRef.current = theme }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return

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

    const setColors = isDark => {
      for (let i = 0; i < N; i++) {
        const r = Math.random()
        if (isDark) {
          if (r < .48)      { col[i*3]=0;    col[i*3+1]=0.85; col[i*3+2]=1    } // cyan
          else if (r < .80) { col[i*3]=0.55; col[i*3+1]=0.36; col[i*3+2]=0.96 } // violet
          else               { col[i*3]=0.96; col[i*3+1]=0.44; col[i*3+2]=0.71 } // pink
        } else {
          if (r < .48)      { col[i*3]=0.03; col[i*3+1]=0.57; col[i*3+2]=0.69 }
          else if (r < .80) { col[i*3]=0.43; col[i*3+1]=0.16; col[i*3+2]=0.85 }
          else               { col[i*3]=0.86; col[i*3+1]=0.15; col[i*3+2]=0.47 }
        }
      }
      geo.attributes.color.needsUpdate = true
    }

    for (let i = 0; i < N; i++) {
      pos[i*3]=   (Math.random()-.5)*22
      pos[i*3+1]= (Math.random()-.5)*22
      pos[i*3+2]= (Math.random()-.5)*22
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    setColors(theme !== 'light')

    const mat = new THREE.PointsMaterial({ size:.02, vertexColors:true, transparent:true, opacity:theme==='light'?.3:.5, sizeAttenuation:true })
    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    const darkColors  = [0x00d9ff, 0x8b5cf6, 0xf472b6, 0xf59e0b]
    const lightColors = [0x0891b2, 0x6d28d9, 0xdb2777, 0xd97706]
    const shapes = [
      new THREE.IcosahedronGeometry(.6,1), new THREE.OctahedronGeometry(.5),
      new THREE.TorusGeometry(.4,.11,8,24), new THREE.TetrahedronGeometry(.48),
    ].map((g, i) => {
      const m = new THREE.MeshBasicMaterial({ color:theme==='light'?lightColors[i]:darkColors[i], wireframe:true, opacity:theme==='light'?.06:.09, transparent:true })
      const mesh = new THREE.Mesh(g, m)
      mesh.position.set((Math.random()-.5)*10,(Math.random()-.5)*8,(Math.random()-.5)*6-2)
      scene.add(mesh)
      return mesh
    })

    let mx=0,my=0
    const onMM = e => { mx=(e.clientX/window.innerWidth-.5)*2; my=(e.clientY/window.innerHeight-.5)*2 }
    document.addEventListener('mousemove', onMM)

    let t=0, animId, prev=themeRef.current
    const animate = () => {
      animId=requestAnimationFrame(animate); t+=.004
      if (themeRef.current !== prev) {
        const isDark = themeRef.current !== 'light'
        setColors(isDark); mat.opacity=isDark?.5:.3
        shapes.forEach((s,i)=>{ s.material.color.setHex(isDark?darkColors[i]:lightColors[i]); s.material.opacity=isDark?.09:.06 })
        prev=themeRef.current
      }
      particles.rotation.y=t*.03; particles.rotation.x=t*.013
      shapes.forEach((s,i)=>{ s.rotation.x+=.003*(i+1)*.4; s.rotation.y+=.005*(i+1)*.4; s.position.y+=Math.sin(t+i*1.3)*.002 })
      camera.position.x+=(mx*.28-camera.position.x)*.04
      camera.position.y+=(-my*.2-camera.position.y)*.04
      camera.lookAt(scene.position); renderer.render(scene,camera)
    }
    animate()

    const onR = () => { camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth,window.innerHeight) }
    window.addEventListener('resize', onR)

    return () => { cancelAnimationFrame(animId); document.removeEventListener('mousemove',onMM); window.removeEventListener('resize',onR); renderer.dispose() }
  }, []) // eslint-disable-line

  return (
    <canvas ref={canvasRef} style={{ position:'fixed',top:0,left:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none' }} />
  )
}
