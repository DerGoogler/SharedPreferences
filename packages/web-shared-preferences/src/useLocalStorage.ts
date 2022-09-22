import { Dispatcher } from "./Dispatcher";
import { LocalStorage } from "./utils";

const dispatcher = new Dispatcher(LocalStorage);
const useLocalStorage = {
  string: dispatcher.useString,
  boolean: dispatcher.useBoolean,
  number: dispatcher.useNumber,
  json: dispatcher.useJSON,
};

export { useLocalStorage };
