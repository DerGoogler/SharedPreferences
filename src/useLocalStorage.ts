import { Dispatcher } from "./dispatcher";

const useLocalStorage = {
  string: Dispatcher(globalThis.localStorage).useString,
  boolean: Dispatcher(globalThis.localStorage).useBoolean,
  number: Dispatcher(globalThis.localStorage).useNumber,
  json: Dispatcher(globalThis.localStorage).useJSON,
};

export { useLocalStorage };
