import React from "react"

const initState = {
  currentShowcaseIdx: 0,
}

const ctx = React.createContext(initState)

export default ctx
