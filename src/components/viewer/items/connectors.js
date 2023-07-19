import React from 'react'

export default function Connectors(props) {

  
  var x1 = 50
  var x2 = 0
  var y1 = 100
  var y2 = 0

  console.log(props.id1)
  
  if (typeof window !== "undefined") {
    var element1 = document.getElementById(props.id1)
    var element2 = document.getElementById(props.id2)

    if (element1 & element2){
      x1 = (element1.getBoundingClientRect().left + element1.getBoundingClientRect().right)/2
      y1 = (element1.getBoundingClientRect().top + element1.getBoundingClientRect().bottom)/2
    
      x2 = (element2.getBoundingClientRect().left + element2.getBoundingClientRect().right)/2
      y2 = (element2.getBoundingClientRect().top + element2.getBoundingClientRect().bottom)/2
  }}

  

  return (
    <svg className='absolute top-0 left-0' width="1000" height="1000">
      <line x1={String(x1)} y1={String(y1)} x2={String(x2)} y2={String(y2)} stroke="black" strokeWidth={1}/>
    </svg>
  )
}
 