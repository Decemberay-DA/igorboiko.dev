import type { ID } from "./types";

export const isIDEquals = (a: ID<any>) => (b: ID<any>) => a.id === b.id;
export const isSelfEquals = (a: ID<any>) => (b: ID<any>) => a.self === b.self;
