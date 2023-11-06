import { PuppyState } from "../state"





export function useState<T> (inital): 
    [T, action: (prevState: T)  => void]  {

    const oldHook = PuppyState.wipRoot?.alternate?.hooks?.[PuppyState.hookIdx]

    const hook = {
        state: oldHook ? oldHook : inital,
        queue: [] as any[]
    }


    oldHook?.queue.forEach(action => {
        hook.state = action(hook.state)
    })


    const setState = (action: any) => {
        hook.queue.push(action)
        PuppyState.wipRoot = {
            dom: PuppyState.root.dom,
            props: PuppyState.root.props,
            alternate: PuppyState.root
        }

        PuppyState.nextWork = PuppyState.wipRoot
        PuppyState.deletions = []
    }

    if (PuppyState.wipRoot?.hooks) {
        PuppyState.wipRoot?.hooks?.push(hook)
        PuppyState.hookIdx++;
    }
    return [hook.state, setState]
}
