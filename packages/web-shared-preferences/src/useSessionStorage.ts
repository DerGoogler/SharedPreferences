import { Dispatcher } from "./dispatcher";

const dispatcher = new Dispatcher(window.sessionStorage);
const useSessionStorage = {
  string: dispatcher.useString,
  boolean: dispatcher.useBoolean,
  number: dispatcher.useNumber,
  json: dispatcher.useJSON,
};

export { useSessionStorage };
