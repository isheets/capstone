import React from 'react'

export default function Square({ black, children }) {
    
    const fill = black ? 'black' : 'white'
    console.log(fill);
    const stroke = black ? 'white' : 'black'
  
    return (
      <div
        style={{
          backgroundColor: fill,
          color: stroke,
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    )
  }