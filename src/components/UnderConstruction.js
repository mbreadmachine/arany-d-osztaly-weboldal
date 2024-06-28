import React from 'react'

export const UnderConstruction = ({props, children}) => {
  return (
    <div style={{display: "flex", alignItems: "center", flexDirection: "column", minWidth: "70%"}}>
      <img src="./under-construction/banner.gif" alt="Átépítés alatt" style={{objectFit: "contain", height: "100px", width: "80%"}}/>
        <img src="./under-construction/bob_the_builder.gif" alt="Átépítés alatt" />
        <div style={{padding: "20px"}}>
            {children}
        </div>
        <img src="./under-construction/bob_the_builder.gif" alt="Átépítés alatt" />
      <img src="./under-construction/banner.gif" alt="Átépítés alatt" style={{objectFit: "contain", height: "100px", width: "80%"}}/>
    </div>
  )
}
