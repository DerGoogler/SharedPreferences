// import * as fs from "fs";
// import { SharedPreferences, Storage } from "../dist";
const fs = require("fs");
const {
  SharedPreferences,
  useLocalStorage,
  Dispatcher,
} = require("./../packages/web-shared-preferences/dist/index");
const {
  SharedPreferencesFsPollyfill,
} = require("./../packages/web-shared-preferences-fs-pollyfill/dist/index");

const pref = new SharedPreferences(
  new SharedPreferencesFsPollyfill("./test/local.json")
);
export function usePref(key, defValue) {
  const getter = pref.getString(key, defValue);
  const setter = (value) => {
    pref.setString(key, typeof value == "function" ? value(getter) : value);
  };
  return [getter, setter];
}

const [name, setName] = usePref("name", "");

setName((pp) => {
  return pp + " ya";
});

console.log(name);
