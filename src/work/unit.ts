
import { Component } from "../dom/types"
import { createDOM } from "../dom"
import { reconcileChildren } from "./reconcile"
import { isFunctionComponent } from "./utils";
import { PuppyState } from "../state";

// perform work then give next component to perform unit of work on
export const executeUnitOfWork = (component: Component | undefined): Component | undefined => {
    if (!component) return;
    // Add Dom Node
    //if(!component.dom) 
    //    component.dom = createDOM(component)

    // browser can interrupt this and user see unupdated DOM
    // therfore have a wip Dom (work in progress / virtual)
    // This is done in commit/{idx/unit}.ts 
    // (we now use reconcileChildren) instead of just appending the child to DOM during execution
    // if(component.parent)
    //    component.parent.dom.appendChild(component.dom)


    // Create new Components (reconcilation)
    if (isFunctionComponent(component)) updateFunctionComponent(component)
    else updateHostComponent(component)

    // return next unit of work
    if (component.child) return component.child
    while (component) {
        if (component.sibiling) return component.sibiling
        component = component.parent
    }
}


const updateFunctionComponent = (component: Component) => {
    PuppyState.root = component
    PuppyState.hookIdx = 0
    PuppyState.root.hooks = []

    // @ts-ignore
    const children: Component[] = [component.type(component.props)]
    reconcileChildren(component, children)
}


const updateHostComponent = (component: Component) => {

    if (!component.dom)
        component.dom = createDOM(component)

    reconcileChildren(component, component.props.children!)
}
