declare module 'lru-memoize' {
    export interface EqualsFunction {
        (a: any, b: any): boolean;
    }
    export interface WrappedFunction {
        <T extends Function>(func: T): T;
    }
    /**
     * Returns a wrapper function that can be called with a target function to return a wrapped version that is memoized with a least-recently-used (LRU) cache. 
     * @param limit The number of arguments -> value mappings to keep in memory. Defaults to 1.
     * @param equals A function to compare two values for equality. Defaults to ===.
     * @param deepObjects Whether or not to perform a deep equals on Object values. Defaults to false.
     */
    export default function memoize(limit?: Number, equals?: EqualsFunction, deepObjects?: boolean): WrappedFunction;
}