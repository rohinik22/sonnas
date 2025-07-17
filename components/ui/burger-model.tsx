"use client"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import { SpotLight, useDepthBuffer } from "@react-three/drei"
import * as THREE from "three"
import React, { Suspense, useRef, useState, useEffect, forwardRef, useMemo, useCallback } from "react"
import { Vector3, Matrix4, Quaternion } from "three"
import { RoundedBox, Cylinder } from "@react-three/drei"

const BurgerModel = forwardRef((props, ref) => {
  const mainGroupRef = useRef()
  const isAnimatingRef = useRef(false)
  const currentRotationRef = useRef(0)
  const lastMoveAxisRef = useRef(null)
  const currentMoveRef = useRef(null)
  const animationFrameRef = useRef(null)
  const isMountedRef = useRef(true)

  const viewportSizeRef = useRef({ width: window.innerWidth, height: window.innerHeight })
  const isResizingRef = useRef(false)
  const resizeTimeoutRef = useRef(null)

  const [size, setSize] = useState(0.8) // Base size for burger components
  const [isVisible, setIsVisible] = useState(true)
  const [deviceSettings, setDeviceSettings] = useState(() => {
    const isMobile = window.innerWidth < 768
    return {
      smoothness: isMobile ? 2 : 4,
      castShadow: !isMobile,
      receiveShadow: !isMobile,
    }
  })

  const reusableVec3 = useMemo(() => new Vector3(), [])
  const reusableMatrix4 = useMemo(() => new Matrix4(), [])
  const reusableQuaternion = useMemo(() => new Quaternion(), [])

  React.useImperativeHandle(ref, () => ({
    ...mainGroupRef.current,
    reset: resetBurger,
  }))

  const resetBurger = useCallback(() => {
    if (!isMountedRef.current) return

    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.set(0, 0, 0)
    }
    isAnimatingRef.current = false
    currentRotationRef.current = 0
    lastMoveAxisRef.current = null
    currentMoveRef.current = null

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }, [])

  const handleViewportChange = useCallback(() => {
    if (!isMountedRef.current) return

    isResizingRef.current = true

    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current)
    }

    resizeTimeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return

      const width = window.innerWidth
      const height = window.innerHeight
      const visualViewportWidth = window.visualViewport ? window.visualViewport.width : width
      const visualViewportHeight = window.visualViewport ? window.visualViewport.height : height

      const effectiveWidth = Math.min(width, visualViewportWidth)
      const effectiveHeight = Math.min(height, visualViewportHeight)

      const prevSize = viewportSizeRef.current
      if (Math.abs(prevSize.width - effectiveWidth) < 10 && Math.abs(prevSize.height - effectiveHeight) < 10) {
        isResizingRef.current = false
        return
      }

      viewportSizeRef.current = { width: effectiveWidth, height: effectiveHeight }

      const isMobile = effectiveWidth < 768
      setDeviceSettings((prevSettings) => {
        const newSettings = {
          smoothness: isMobile ? 2 : 4,
          castShadow: !isMobile,
          receiveShadow: !isMobile,
        }

        if (
          prevSettings.smoothness !== newSettings.smoothness ||
          prevSettings.castShadow !== newSettings.castShadow ||
          prevSettings.receiveShadow !== newSettings.receiveShadow
        ) {
          return newSettings
        }
        return prevSettings
      })

      isResizingRef.current = false
    }, 150)
  }, [resetBurger])

  useEffect(() => {
    handleViewportChange()

    let throttleTimer = null
    const throttledHandler = () => {
      if (throttleTimer) return
      throttleTimer = setTimeout(() => {
        handleViewportChange()
        throttleTimer = null
      }, 100)
    }

    window.addEventListener("resize", throttledHandler)

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", throttledHandler)
      window.visualViewport.addEventListener("scroll", throttledHandler)
    }

    const handleOrientationChange = () => {
      if (isAnimatingRef.current) {
        resetBurger()
      }
      setTimeout(handleViewportChange, 100)
    }

    window.addEventListener("orientationchange", handleOrientationChange)

    return () => {
      window.removeEventListener("resize", throttledHandler)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", throttledHandler)
        window.visualViewport.removeEventListener("scroll", throttledHandler)
      }
      window.removeEventListener("orientationchange", handleOrientationChange)

      if (throttleTimer) {
        clearTimeout(throttleTimer)
      }
    }
  }, [handleViewportChange, resetBurger])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isMountedRef.current) return
      const isPageVisible = document.visibilityState === "visible"
      setIsVisible(isPageVisible)
      if (!isPageVisible) {
        resetBurger()
      } else {
        setTimeout(() => {
          if (isMountedRef.current) {
            handleViewportChange()
          }
        }, 100)
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [resetBurger, handleViewportChange])

  useFrame((state, delta) => {
    if (!isVisible || !isMountedRef.current) return

    // Continuous rotation for the whole burger
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.x += delta * 0.1
      mainGroupRef.current.rotation.y += delta * 0.2
      mainGroupRef.current.rotation.z += delta * 0.05
    }
  })

  const chromeMaterial = useMemo(
    () => ({
      color: "#000000",
      metalness: 0.5,
      roughness: 0.5,
      clearcoat: 0,
      clearcoatRoughness: 0,
      reflectivity: 0.5,
      iridescence: 0,
      iridescenceIOR: 0,
      iridescenceThicknessRange: [100, 400],
      envMapIntensity: 8,
    }),
    [],
  )

  const bunMaterial = useMemo(
    () => ({
      color: "#FFD700", // Golden brown for buns
      metalness: 0.1,
      roughness: 0.6,
    }),
    [],
  )

  const pattyMaterial = useMemo(
    () => ({
      color: "#8B4513", // Brown for patty
      metalness: 0.2,
      roughness: 0.7,
    }),
    [],
  )

  const cheeseMaterial = useMemo(
    () => ({
      color: "#FFD700", // Yellow for cheese
      metalness: 0.0,
      roughness: 0.3,
    }),
    [],
  )

  const lettuceMaterial = useMemo(
    () => ({
      color: "#6B8E23", // Olive green for lettuce
      metalness: 0.0,
      roughness: 0.5,
    }),
    [],
  )

  const tomatoMaterial = useMemo(
    () => ({
      color: "#FF6347", // Tomato red
      metalness: 0.0,
      roughness: 0.4,
    }),
    [],
  )

  const sharedMaterial = useMemo(() => <meshPhysicalMaterial {...chromeMaterial} />, [chromeMaterial])

  const layerHeight = 0.15 // Height of each layer
  const bunHeight = 0.2
  const pattyHeight = 0.1
  const cheeseHeight = 0.02
  const lettuceHeight = 0.05
  const tomatoHeight = 0.05

  return (
    <group ref={mainGroupRef} {...props}>
      {/* Bottom Bun */}
      <RoundedBox
        args={[size * 1.2, bunHeight, size * 1.2]}
        radius={0.05}
        smoothness={deviceSettings.smoothness}
        position={[0, -bunHeight / 2 - pattyHeight - cheeseHeight - lettuceHeight - tomatoHeight, 0]}
      >
        <meshStandardMaterial {...bunMaterial} />
      </RoundedBox>

      {/* Patty */}
      <Cylinder
        args={[size, size, pattyHeight, 32]}
        position={[0, -pattyHeight / 2 - cheeseHeight - lettuceHeight - tomatoHeight, 0]}
      >
        <meshStandardMaterial {...pattyMaterial} />
      </Cylinder>

      {/* Cheese */}
      <RoundedBox
        args={[size * 1.1, cheeseHeight, size * 1.1]}
        radius={0.01}
        smoothness={deviceSettings.smoothness}
        position={[0, cheeseHeight / 2 - lettuceHeight - tomatoHeight, 0]}
      >
        <meshStandardMaterial {...cheeseMaterial} />
      </RoundedBox>

      {/* Lettuce */}
      <Cylinder args={[size * 1.1, size * 1.1, lettuceHeight, 32]} position={[0, lettuceHeight / 2 - tomatoHeight, 0]}>
        <meshStandardMaterial {...lettuceMaterial} />
      </Cylinder>

      {/* Tomato */}
      <Cylinder args={[size * 0.9, size * 0.9, tomatoHeight, 32]} position={[0, tomatoHeight / 2, 0]}>
        <meshStandardMaterial {...tomatoMaterial} />
      </Cylinder>

      {/* Top Bun */}
      <RoundedBox
        args={[size * 1.2, bunHeight, size * 1.2]}
        radius={0.05}
        smoothness={deviceSettings.smoothness}
        position={[0, bunHeight / 2 + tomatoHeight, 0]}
      >
        <meshStandardMaterial {...bunMaterial} />
      </RoundedBox>
    </group>
  )
})

function CameraController() {
  const { camera } = useThree()

  useFrame(() => {
    camera.lookAt(0, 0, 0)
  })

  return null
}

function EnhancedSpotlight(props) {
  const light = useRef()

  useEffect(() => {
    if (light.current) {
      light.current.target.position.set(0, 0, 0)
      light.current.target.updateMatrixWorld()
    }
  }, [])

  return (
    <>
      <SpotLight castShadow={false} ref={light} {...props} />
    </>
  )
}

function SceneContent() {
  const depthBuffer = useDepthBuffer({
    size: 2048,
    frames: 1,
    disableRenderLoop: true,
  })

  const [time, setTime] = useState(0)
  useFrame((state) => {
    setTime(state.clock.getElapsedTime())
  })

  return (
    <>
      <EnhancedSpotlight
        depthBuffer={depthBuffer}
        color="#aaaace"
        position={[3, 3, 2]}
        volumetric={true}
        opacity={1}
        penumbra={1}
        distance={17}
        angle={0.8}
        attenuation={30}
        anglePower={6}
        intensity={1}
        shadowMapSize={2048}
        shadowBias={-0.0001}
        shadowAutoUpdate={true}
        castShadow={true}
      />

      <PerspectiveCamera makeDefault fov={50} position={[0, 0, 7]} near={0.1} far={1000} />
      <CameraController />
      <Suspense fallback={null}>
        <BurgerModel position={[0, 0, 0]} scale={1} />
      </Suspense>
    </>
  )
}

export function Scene() {
  const [isDesktop, setIsDesktop] = useState(true)
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    checkIsDesktop()
    window.addEventListener("resize", checkIsDesktop)
    return () => window.removeEventListener("resize", checkIsDesktop)
  }, [])
  return (
    <div className="h-svh w-screen relative bg-black">
      <Canvas
        shadows
        gl={{
          antialias: isDesktop,
          preserveDrawingBuffer: isDesktop,
          powerPreference: isDesktop ? "high-performance" : "default",
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
      >
        <SceneContent />
        {/* <Perf /> */}
      </Canvas>
    </div>
  )
}
