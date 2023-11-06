export type RequestIdleCallbackHandle = number
export type RequestIdleCallbackOptions = {
  timeout?: number
}
export type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean
  timeRemaining: () => number
}

declare global { // might be globalThis
    //interface Window {
    //     requestIdleCallback: (
    //         callback: (deadline: RequestIdleCallbackDeadline) => void,
    //         opts?: RequestIdleCallbackOptions,
    //     ) => RequestIdleCallbackHandle;
     //    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
    //}
    namespace JSX {
        interface IntrinsicElements {
            div: any;
            input: any;
            h2: any;
        }
    }
}

export default {}
//declare global {
//  interface Window {
//    requestIdleCallback: (
//      callback: (deadline: RequestIdleCallbackDeadline) => void,
//      opts?: RequestIdleCallbackOptions
//    ) => RequestIdleCallbackHandle
//    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void
//  }
//}

