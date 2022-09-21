// import * as fs from "fs";
// import { SharedPreferences, Storage } from "../dist";
const fs = require("fs");
const {
  SharedPreferences,
} = require("./../packages/web-shared-preferences/dist/index");
const {
  SharedPreferencesFsPollyfill,
} = require("./../packages/web-shared-preferences-fs-pollyfill/dist/index");

// const SharedPreferencesPollyfill = (path) => {
//   let firstValue = {};

//   const coreSetItem = (key, value) => {
//     firstValue[key] = value;
//     fs.writeFileSync(path, JSON.stringify(firstValue), "utf8");
//   };
//   const coreGetItem = (key) => {
//     return JSON.parse(fs.readFileSync(path, "utf8"))[key];
//   };

//   return {
//     length: 0,
//     setItem: coreSetItem,
//     getItem: coreGetItem,
//     clear: () => {},
//     key: (index) => {
//       return null;
//     },
//     removeItem: (key) => {},
//   };
// };

const pref = new SharedPreferences(
  new SharedPreferencesFsPollyfill("./test/local.json")
);

pref.setString("name", "Kevin");
pref.setString("last", "Olaf");
pref.setJSON("json", {
  name: "Hellow",
});

console.log(`${pref.getString("name", null)} (${pref.getString("last", "")})`);

// function ke(gg) {
//   return Object.entries(gg).map(([key, value]) => {
//     return [key, value];
//   });
// }

// const map = new Map(ke({ name: "ke" }));
// console.log(ke({ name: "ke" }));
// // map.set("name", "Kevin");
// map.set("age", "sdfsfdgdg");

// var obj = Object.fromEntries(map);
// console.log(JSON.stringify(obj));
