import type { IURI } from "./types";

export const isEquals = <U>(a: IURI<U>, b: IURI<U>): boolean => a._uri === b._uri;
