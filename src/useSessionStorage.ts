import { Dispatcher } from "./dispatcher";

const useSessionStorage = {
  string: Dispatcher(globalThis.sessionStorage).useString,
  boolean: Dispatcher(globalThis.sessionStorage).useBoolean,
  number: Dispatcher(globalThis.sessionStorage).useNumber,
  json: Dispatcher(globalThis.sessionStorage).useJSON,
};

export { useSessionStorage };
