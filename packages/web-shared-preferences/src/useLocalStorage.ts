import { Dispatcher } from "./dispatcher";

const dispatcher = new Dispatcher(window.localStorage);
const useLocalStorage = {
  string: dispatcher.useString,
  boolean: dispatcher.useBoolean,
  number: dispatcher.useNumber,
  json: dispatcher.useJSON,
};

export { useLocalStorage };
