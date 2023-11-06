

export const isEvent = (key: any) => key.startsWith("on")
export const isProperty = (key:any) => key !== "children" && !isEvent(key);

// some curry 🍛
export const isNew = (prev: any, next: any) => (key: any) => prev[key]!==next[key]
export const isOld = (next: any) => (key: any) => !(key in next)
