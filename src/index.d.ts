declare const memoize = (
  limit?: number,
  equals?: (a: any, b: any) => boolean,
  deepObjects?: boolean
) => <T extends Function>(func: T) => T;
export default memoize;
