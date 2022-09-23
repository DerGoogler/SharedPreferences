import { Dispatcher } from "./Dispatcher";
import { LocalStorage } from "./LocalStorage";

const dispatcher = new Dispatcher(new LocalStorage());
const useLocalStorage = {
  string: dispatcher.useString,
  boolean: dispatcher.useBoolean,
  number: dispatcher.useNumber,
  json: dispatcher.useJSON,
};

export { useLocalStorage };
