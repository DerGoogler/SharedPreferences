# SharedPreferences

An simple class to manage the loacal storage

## Install
To use this package need you to setup our [registry](https://dergoogler.com/dergoogler/updates/wiki/Setup-registry). Then can you install outr packages

```shell
npm install --save @dergoogler/sharedpreferences
npm install --save-dev tslib
```

### Setup

```ts
import { SharedPreferences } from '@dergoogler/sharedpreferences';

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
