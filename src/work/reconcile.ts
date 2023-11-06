import { Component } from "../dom/types"
import { PuppyState } from "../state"
import { MutationType } from "./types"


export const reconcileChildren = (wipComponent: Component, elements: Component[]) => {

    let oldComponent = wipComponent.alternate?.child
    let prevSibling: Component | undefined = undefined
   
    //console.log(wipComponent)
    //console.log(wipComponent.child)
    //console.log(Object.keys(wipComponent))
    let idx = 0
    while (idx < elements.length || oldComponent != undefined) {
        const element = elements[idx]
        let newComp : Component | undefined = undefined

        // compare old comp to element
        // if the old fiber and the new element have the same type, 
        //      we can keep the DOM node and just update it with the new props
        // else 
        //     there is a new element, it means we need to create a new DOM node
        //
        //     there is an old fiber, we need to remove the old node



        const sameType = oldComponent && element && oldComponent.type === element.type
        if(sameType) {
            // update node
            newComp = {
                type: oldComponent?.type,
                props: {
                    ...oldComponent?.props,
                    ...element.props
                },
                dom: oldComponent?.dom,
                parent: wipComponent,
                alternate: oldComponent,
                effectTag: MutationType.PATCH 
            }
        } else {
            
            if(element) {
                // add new node
                newComp = {
                    type: element.type,
                    props: element.props,
                    dom: undefined, 
                    parent: wipComponent,
                    alternate: undefined,
                    effectTag: MutationType.PUT
                }
            }

            if(oldComponent) {
                // delete old component
                oldComponent.effectTag = MutationType.DELETE
                PuppyState.deletions.push(oldComponent)
            }

        }
        
        if(oldComponent) oldComponent = oldComponent.sibiling
        
        if(idx==0) 
            wipComponent.child = newComp
        else 
            if(prevSibling) // no way it can be undfined (to satisfy ts)
                prevSibling.sibiling = newComp 

        prevSibling = newComp
        idx++
    }

}
