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

```tsx
import { useEffect } from "react";
import { useString } from "web-shared-preference";

export function App() {
  const [name, setName] = useString("username", "");

  useEffect(() => {
    setName("Kevin");
  }, [name]);

  return <div>Hello {name}!</div>;
}
```

## Usage w/o React

```ts
import { SharedPreferences } from 'web-shared-preferences';

interface Person {
    name: string
    age:number
    weight: `${string}kg`
}

class App {
    private pref: SharedPreferences

    public constructor(...args: any[]) {
        this.pref = new SharedPreferences();
    }
    // ... your usage
}

// or functional
function App() {
    const pref: SharedPreferences = new SharedPreferences();

    pref.setJSON<Person>("myKey", {
        name: "Kevin",
        age: 36,
        weight: "90kg",
    })

    // Make it partial tp prevent runtime errors
    console.log(pref.getJSON<Partial<Person>("myKey", {}))
}

```
