import React, { useEffect, useRef, useContext } from "react"

import ShowcaseContext from "../context/showcaseContext"

export const Options = () => {
  const { showcase } = useContext(ShowcaseContext)

  const optionsArr = showcase.optionInputAttributes
  const aboutUrl = showcase.aboutUrl

  return (
    <div style={{ width: showcase.optionInputWidth || "200px" }}>
      {optionsArr.map(opt => (
        <div className="option" key={opt.attr.id || opt.attr.name}>
          <label htmlFor={opt.attr.id || opt.attr.name}>{opt.desc}</label>
          {opt.attr.type === "range" ? (
            <input
              {...opt.attr}
              defaultValue={opt.init}
              onChange={evt => {
                showcase.setOption(opt.option, evt.target.value)
              }}
            />
          ) : (
            <input
              {...opt.attr}
              defaultChecked={opt.init}
              onChange={evt => {
                showcase.setOption(opt.option, evt.target.checked)
              }}
            />
          )}
        </div>
      ))}
      <div className="option">
        <button className="button" onClick={showcase.reset}>
          Reset
        </button>
      </div>
      {aboutUrl && (
        <div className="option">
          <a
            className="button"
            href={aboutUrl}
            target="_blank"
            rel="noreferrer"
          >
            About
          </a>
        </div>
      )}
    </div>
  )
}

const Showcase = () => {
  const canvasRef = useRef(null)
  const { showcase, initOption } = useContext(ShowcaseContext)

  useEffect(() => {
    if (canvasRef.current) {
      showcase.init(canvasRef.current, initOption || undefined)
      showcase.draw()
      return () => showcase.clearDraw()
    }
  }, [canvasRef, showcase, initOption])

  return <canvas ref={canvasRef} className="showcase"></canvas>
}

export default Showcase
