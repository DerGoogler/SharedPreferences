# NOTE!
This package has been moved to https://repo.dergoogler.com/DerGoogler/SharedPreferences

# Web SharedPreferences

An simple class to manage the loacal storage

## Install

```bash
bun add web-shared-preferences
bun add -d tslib
```

### Setup

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
