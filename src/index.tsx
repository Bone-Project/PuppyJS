import * as _ from "./globals";
import { render } from "./work";
import { createElement } from "./dom/elements";
import { workLoop } from "./work";
import { JSX } from "./interop/external";
import { useState } from "./hooks";

// Start the workloop (interupt when main thread active for DOM Manupulation)
window.requestIdleCallback(workLoop)



const Puppy = {
    render,
    createElement,
    useState
}



 const container = document.getElementById("root")
 
 const updateValue = e => {
   rerender(e.target.value)
 }
 
 const rerender = value => {
   const element = (
     <div>
       <input onInput={updateValue} value={value} />
       <h2>Hello {value}</h2>
     </div>
   )
 
 
   Puppy.render(element as any, container!)
 }

 rerender("World")   

//function App(props) {
//  return (<h2>Hi {props.name}</h2>)
//}
//const element = <App name="foo" />
//const container = document.getElementById("root")
//Puppy.render(element, container)



export default Puppy
