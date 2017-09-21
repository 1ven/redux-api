import { is } from "ramda";
import * as isPlainObject from "is-plain-object";
import { Caller } from "./createApiCaller";
import { Actions } from "./createActions";

export type Settings = {
  context?: string;
  selector?: <S, T>(state: S) => S | T;
};

export type Spec = {
  [key: string]: SpecEntry | Spec;
};

export type Api = {
  [key: string]: ApiEntry | Api;
};

type FlatApi = {
  [key: string]: ApiEntry;
};

export const isFlatApi = (val: any): val is FlatApi => {
  if (!isPlainObject(val)) {
    return false;
  }

  for (let key in val) {
    if (!isApiEntry(val[key])) {
      return false;
    }
  }

  return true;
};

export type SpecEntry = {
  url: string;
  method: string;
  config?: QueryConfig;
};

export type QueryConfig = {
  endpoint: string;
};

export type ApiEntry = {
  select: (key: string) => (state, props) => any;
  type: (key: "request" | "success" | "failure") => string;
  reducer: (state, action) => typeof state;
  fetch: Caller;
  actions: Actions;
};

export const isSpecEntry = (val: any): val is SpecEntry => {
  return isPlainObject(val) && is(String, val.url) && is(String, val.method);
};

export const isApiEntry = (val: any): val is ApiEntry => {
  return (
    isPlainObject(val) &&
    isPlainObject(val.actions) &&
    is(Function, val.select) &&
    is(Function, val.type) &&
    is(Function, val.reducer) &&
    is(Function, val.fetch)
  );
};
