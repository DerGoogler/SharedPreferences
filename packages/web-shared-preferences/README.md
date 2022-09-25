# SharedPreferences

An simple class to manage the loacal storage, including React like useString, useJSON and more!

[![npm](https://img.shields.io/npm/v/web-shared-preferences.svg)](https://www.npmjs.com/package/web-shared-preferences)
[![npm](https://img.shields.io/npm/dt/web-shared-preferences.svg)](https://www.npmjs.com/package/web-shared-preferences.svg)
![NPM](https://img.shields.io/npm/l/web-shared-preferences)

## Install

```shell
bun add web-shared-preference
```

## Usage with React

> See an [example](https://codesandbox.io/s/wswpfr)

```tsx
import { useEffect } from "react";
import { useLocalStorage /* useSessionStorage */ } from "web-shared-preference";

export function App() {
  const [name, setName] = useLocalStorage.string("username", "");

  useEffect(() => {
    setName("Kevin");
  }, [name]);

  return <div>Hello {name}!</div>;
}
```

## Usage w/o React

```ts
import { SharedPreferences } from "web-shared-preferences";

interface Person {
  name: string;
  age: number;
  weight: `${string}kg`;
}

class App {
  private pref: SharedPreferences;

  public constructor(...args: any[]) {
    this.pref = new SharedPreferences();
  }
  // ... your usage
}

// or functional
function App() {
  const pref: SharedPreferences = new SharedPreferences();

  // Check if your wanted preferences are exist
  if (pref.hasPref("myKey")) console.log("There is a preference named 'myKey'");

  pref.setJSON<Person>("myKey", {
    name: "Kevin",
    age: 36,
    weight: "90kg",
  });

  // Make it partial tp prevent runtime errors
  console.log(pref.getJSON < Partial<Person>("myKey", {}));
}
```

# Documentation

I try my best

## Create a new hook dispatcher for React

```ts
import { Dispatcher } from "web-shared-preference";
import { SharedPreferencesFsPollyfill } from "web-shared-preferences-fs-pollyfill";

const dispatcher = new Dispatcher(new SharedPreferencesFsPollyfill("./local.json"));
const useFsStorage = {
  string: dispatcher.useString,
  boolean: dispatcher.useBoolean,
  number: dispatcher.useNumber,
  json: dispatcher.useJSON,
};

export { useFsStorage };
```

## Setting up an FS pollyfill

```js
const fs = require("fs");
const { SharedPreferences } = require("web-shared-preferences");
const { SharedPreferencesFsPollyfill } = require("web-shared-preferences-fs-pollyfill");

const pref = new SharedPreferences(new SharedPreferencesFsPollyfill("./test/local.json"));

pref.setString("name", "Kevin");
pref.setString("last", "Olaf");
pref.setJSON("json", {
  name: "Hellow",
});

console.log(`${pref.getString("name", null)} (${pref.getString("last", "")})`);
```
