// import * as fs from "fs";
// import { SharedPreferences, Storage } from "../dist";
const fs = require("fs");
const {
  SharedPreferences,
  useLocalStorage,
  Dispatcher,
  usePref,
} = require("./../packages/web-shared-preferences/dist/index");
const {
  SharedPreferencesFsPollyfill,
} = require("./../packages/web-shared-preferences-fs-pollyfill/dist/index");

const pref = new SharedPreferences(
  new SharedPreferencesFsPollyfill("./test/local.json")
);

const dispatcher = new Dispatcher(
  new SharedPreferencesFsPollyfill("./test/local.json")
);

const [name, setName] = dispatcher.useString("name", "");

setName((pp) => {
  return pp + " ya";
});

console.log(name);
