import { Component } from "../dom/types";


export const isFunctionComponent = (comp: Component) => comp.type instanceof Function;
