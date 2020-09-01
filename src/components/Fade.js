import React, { useEffect, useRef } from "react"

const defaultDelay = 3

const WithFade = (
  Component,
  delay = defaultDelay,
  animationDelay = defaultDelay,
  updateFn = () => true
) => {
  const ref = useRef(null)

  useEffect(() => {
    let timer
    const makeTimer = () => {
      return setTimeout(() => {
        const shouldFade = updateFn()
        if (shouldFade) {
          ref.current.style.pointerEvents = "none"
          ref.current.style.transition = `opacity ${animationDelay}s ease`
          ref.current.style.opacity = 0
        } else {
          timer = makeTimer()
        }
      }, delay * 1000)
    }
    timer = makeTimer()

    const handleMove = () => {
      clearTimeout(timer)
      ref.current.style.pointerEvents = "auto"
      ref.current.style.transition = `opacity 0s`
      ref.current.style.opacity = 1
      timer = makeTimer()
    }
    document.addEventListener("mousemove", handleMove)
    document.addEventListener("touchstart", handleMove)

    return () => {
      console.log("clear")
      clearTimeout(timer)
      document.removeEventListener("mousemove", handleMove)
      document.addEventListener("touchstart", handleMove)
    }
  }, [])

  return props => (
    <div ref={ref}>
      <Component {...props} />
    </div>
  )
}

export default WithFade
