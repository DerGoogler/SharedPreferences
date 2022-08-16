# SharedPreferences

An simple class to manage the loacal storage

## Install

```shell
npm install --save web-shared-preferences
npm install --save-dev tslib
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
