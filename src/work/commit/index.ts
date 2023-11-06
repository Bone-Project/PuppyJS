import { Component } from "../../dom/types"
import { PuppyState } from "../../state"
import { commitUnit } from "./unit"


export const commitRoot = (wipRoot: Component) => {
    PuppyState.deletions.forEach(commitUnit)
    commitUnit(wipRoot)
}
