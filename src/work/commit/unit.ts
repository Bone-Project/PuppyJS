import { updateDOM } from "../../dom";
import { Component, DOMNode } from "../../dom/types";
import { MutationType } from "../../work/types";


export const commitUnit = (component: Component | undefined) => {
    if (!component) return;
    console.log("COMMITING A SINGLE UNIT")
    console.log(component)
    console.log(component.effectTag)
    console.log("----------")

    //let parent = component.parent!
    //while(!parent.dom) parent = parent.parent! // go up the component tree until we find a fiber with a DOM node.
    //const parentDom = parent.dom
    //let domParentFiber = component.parent
    //while (!domParentFiber.dom) {
    //   domParentFiber = domParentFiber.parent
    //}
    // const parentDom = component.parent.dom

    let domParentFiber = component.parent

    while (domParentFiber && !domParentFiber.dom) {
        domParentFiber = domParentFiber.parent
    }

    let domParent: DOMNode | undefined = undefined

    if (domParentFiber) {
        domParent = domParentFiber.dom
    }


    switch (component.effectTag) {
        case MutationType.PATCH:
            if (component.dom)
                updateDOM(component.dom, component.alternate!.props, component.props)
            break;
        case MutationType.PUT:
            if (domParent)
                domParent.appendChild(component.dom!)
            break;

        case MutationType.DELETE:
            let deleteFiber = component
            while (!deleteFiber.dom) deleteFiber.parent
            domParent.removeChild(deleteFiber.dom!)
            break;
    }

    commitUnit(component.child)
    commitUnit(component.sibiling)
}
