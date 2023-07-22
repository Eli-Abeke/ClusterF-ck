import React, { useEffect, useState } from 'react'

export default function Connectors(id1, id2) {

  
  var x1 = 50
  var x2 = 0
  var y1 = 100
  var y2 = 0


  const [Element, setElement] = useState({id1, id2});

    if (typeof window !== "undefined") {
      var element1 = document.getElementById(id1)
      var element2 = document.getElementById(id2)
      if (element1 ){
        x1 = (element1.getBoundingClientRect().left)
        y1 = (element1.getBoundingClientRect().top )
        x2 = (element2.getBoundingClientRect().left)
        y2 = (element2.getBoundingClientRect().top )

    
      }}
    return () => {
        <svg key={props.key} className='w-full h-full absolute top-0 left-0' width="100" height="100">
        <line x1={String(x1)} y1={String(y1)} x2={String(x2)} y2={String(y2)} stroke="black" strokeWidth={2}/>
     </svg>
    };

  


}
 