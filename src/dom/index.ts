import { Component, DOMNode, DOMType, Props } from "./types";
import { isEvent, isNew, isOld, isProperty } from "./utils";


export function createDOM(element: Component | undefined): HTMLElement | Text | undefined {
    if(!element) return
    // Createthe DOM element or text node depending on the element type 
    const dom: DOMNode = element.type === "TEXT_ELEMENT"
        ? document.createTextNode(element.props.nodeValue)
        : document.createElement(element.type as unknown as string)

    updateDOM(dom, {}, element.props);
    return dom
}


export const updateDOM = (element: DOMNode, prevProps: Props, nextProps: Props) => {
    
    // Removing old or changed events
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => isOld(nextProps)(key) || isNew(prevProps, nextProps)(key))
        .forEach(key => {
            const evtType = key.substring(2).toLowerCase() // onMouseEvent => mouseevent
            element.removeEventListener(evtType, prevProps[key])
        })

    // Add new events
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(key => {
            const evtType = key.substring(2).toLowerCase()
            element.addEventListener(evtType, nextProps[key])
        })


    // Removing old props
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isOld(nextProps))
        .forEach(key => {
            element[key] = ''
        })

    // Update new props
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(key => {
            element[key] = nextProps[key]
        })
}


