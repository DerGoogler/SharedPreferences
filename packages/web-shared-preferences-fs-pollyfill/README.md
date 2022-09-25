# SharedPreferences FS Pollyfill

Pollyfill to use SharedPreferences outside of browsers.

> I know, it should be an "polyfill", ignore my type mistake

[![npm](https://img.shields.io/npm/v/web-shared-preferences-fs-pollyfill.svg)](https://www.npmjs.com/package/web-shared-preferences-fs-pollyfill)
[![npm](https://img.shields.io/npm/dt/web-shared-preferences-fs-pollyfill.svg)](https://www.npmjs.com/package/web-shared-preferences-fs-pollyfill)
![NPM](https://img.shields.io/npm/l/web-shared-preferences-fs-pollyfill)

## Install

```shell
bun add web-shared-preferences-fs-pollyfill
```

## Setup

> There is currently no support for React as useString or something!

```ts
const pref = new SharedPreferences(new SharedPreferencesFsPollyfill("./local.json"));

pref.setString("name", "Kevin");
pref.setString("last", "Olaf");
pref.setJSON("json", {
  name: "Hellow",
});

console.log(`${pref.getString("name", null)} (${pref.getString("last", "")})`);
```
