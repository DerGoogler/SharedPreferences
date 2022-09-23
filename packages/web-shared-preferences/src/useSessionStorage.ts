import { Dispatcher } from "./Dispatcher";
import { SessionStorage } from "./SessionStorage";

const dispatcher = Dispatcher(SessionStorage());
const useSessionStorage = {
  string: dispatcher.useString,
  boolean: dispatcher.useBoolean,
  number: dispatcher.useNumber,
  json: dispatcher.useJSON,
};

export { useSessionStorage };
