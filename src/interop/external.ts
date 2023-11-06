
import { createElement } from "../dom/elements";
declare module JSX {
  type Element = string;
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

export const JSX = {createElement}
