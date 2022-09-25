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

const times = (n) => (f) => {
  let iter = (i) => {
    if (i === n) return;
    f(i);
    iter(i + 1);
  };
  return iter(0);
};

times(10000)((f) => {
  console.log(`New preference "name_${f}"`);
  pref.setBoolean(`name_${f}`, true);
});

pref.clearPrefs();
