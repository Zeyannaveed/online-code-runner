import React from 'react'
import  "./App.css"

export default function Navbar({showValue}) {
  return (
    <div>
      
      <div className="leftt">
        <h3>CodeRunner</h3>
        <button onClick={showValue}>Show value</button>
      </div>
    </div>
  )
}
