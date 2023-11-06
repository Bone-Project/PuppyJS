import { MutationType } from "../work/types";

export enum DOMType {
    TextElement = "TEXT_ELEMENT"
}

export type DOMNode = HTMLElement | Text


export interface Component {
    props: Props, // TODO: make a conjested type for props
    alternate?: Component, // alternate comp
    dom?: DOMNode,
    type?: "TEXT_ELEMENT" | Function,
    effectTag?: MutationType,

    parent?: Component,


    child?: Component,
    sibiling?: Component
    hooks?: any[]
}


export interface Props  {
  [key: string]: any;
  children?: Component[];
};
