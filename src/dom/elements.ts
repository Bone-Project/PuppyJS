
import { DOMType } from "./types"




export function createElement(type: string, props: any, ...children: any[]) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === "object"
                    ? child
                    : createTextElement(child),
            ),
        },
    }
}



export function createTextElement(text: string) {
    return {
        type: DOMType.TextElement,
        props: {
            nodeValue: text,
            children: []
        }
    }
}
