
import { Component } from "../dom/types";
import { Work } from "../work/types";

interface IPuppyState{
 
    root: Component,
    wipRoot?: Component,

    deletions: Component[],
    nextWork?: Work
    
    hookIdx : number
}


let nextWork: Work | undefined = undefined
let wipRoot: Component | undefined = undefined
let root: Component | undefined = undefined
let deletions : Component[] = []
let hookIdx: number = 0

export const PuppyState = {
    nextWork,
    wipRoot,
    root,
    deletions,
    hookIdx
} as IPuppyState;
