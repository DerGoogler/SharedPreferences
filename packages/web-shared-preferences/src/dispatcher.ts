import { useReducer } from "react";
import { SharedPreferences } from "./SharedPreferences";

export type Dispatch<A> = (value: A) => void;
export type SetPrefAction<P> = P | ((prevPref: P) => P);
export type CoreGetter<P> = (key: string, defValue: P) => P;
export type CoreSetter<P> = (key: string, value: P) => void;

/**
 * Used to build different hooks for the `localStorage` implementation
 * @param key To get the value from the local storage
 * @param defValue Default value to return if the key does not exist
 * @param coreGetter
 * @param coreSetter
 * @returns
 */
export function usePref<T>(key: string, defValue: T, coreGetter: CoreGetter<T>, coreSetter: CoreSetter<T>): [T, Dispatch<SetPrefAction<T>>] {
  const [, forceRender] = useReducer((x) => x + 1, 0);
  const getter: T = coreGetter(key, defValue);
  const setter = (value: SetPrefAction<T>) => {
    coreSetter(key, typeof value == "function" ? (value as any)(getter) : value);
    if (getter !== value) {
      forceRender();
    }
  };
  return [getter, setter];
}

export function Dispatcher(storage: Storage) {
  return {
    useString(key: string, defValue: string): [string, (value: string) => void] {
      const pref = new SharedPreferences(storage);
      return usePref<string>(
        key,
        defValue,
        (key, defValue) => pref.getString(key, defValue),
        (key, value) => pref.setString(key, value)
      );
    },

    useBoolean(key: string, defValue: boolean): [boolean, (value: boolean) => void] {
      const pref = new SharedPreferences(storage);
      return usePref<boolean>(
        key,
        defValue,
        (key, defValue) => pref.getBoolean(key, defValue),
        (key, value) => pref.setBoolean(key, value)
      );
    },

    useNumber(key: string, defValue: number): [number, (value: number) => void] {
      const pref = new SharedPreferences(storage);
      return usePref<number>(
        key,
        defValue,
        (key, defValue) => pref.getNumber(key, defValue),
        (key, value) => pref.setNumber(key, value)
      );
    },

    useJSON<T = any>(key: string, defValue: T): [T, (value: T) => void] {
      const pref = new SharedPreferences(storage);
      return usePref<T>(
        key,
        defValue,
        (key, defValue) => pref.getJSON(key, defValue),
        (key, value) => pref.setJSON(key, value)
      );
    },
  };
}
