import { Component } from "../dom/types";


// A unit of work is basically component to be updated
export type Work = Component


export enum MutationType {
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE'
}
