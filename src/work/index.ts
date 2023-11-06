import { commitRoot } from "./commit";
import { Component } from "../dom/types";
import { RequestIdleCallbackDeadline } from "../globals";
import { executeUnitOfWork } from "./unit";
import { PuppyState } from "../state";

export const workLoop = (deadline: RequestIdleCallbackDeadline) => {
    let pause = false

    while (!pause && PuppyState.nextWork) {
        PuppyState.nextWork = executeUnitOfWork(PuppyState.nextWork)
        pause = deadline.timeRemaining() < 1
    }
    
    // no work remaining and we still have to update the WIP root
    if(!PuppyState.nextWork && PuppyState.wipRoot){
        commitRoot(PuppyState.wipRoot)
        PuppyState.root = PuppyState.wipRoot
        PuppyState.wipRoot = undefined
    }

    window.requestIdleCallback(workLoop)
}







export function render(element: Component, container: HTMLElement) {
    console.log("RENDERING")
    PuppyState.wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: PuppyState.root
    }

    PuppyState.nextWork = PuppyState.wipRoot
    PuppyState.deletions = []

}

