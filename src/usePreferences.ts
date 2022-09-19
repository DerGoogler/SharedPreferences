import { useReducer } from "react";
import { SharedPreferences } from ".";

/**
 * Used to build different hooks for the `localStorage` implementation
 * @param key To get the value from the local storage
 * @param defValue Default value to return if the key does not exist
 * @param core_getter
 * @param core_setter
 * @returns
 */
function usePref<T = any>(key: string, defValue: T, core_getter: (key: string, defValue: T) => T, core_setter: (key: string, value: T) => void): [T, (value: T) => void] {
  const [, forceRender] = useReducer(x => x + 1, 0);
  const getter: T = core_getter(key, defValue);
  const setter = (value: T) => {
    core_setter(key, value);
    if (getter !== value) {
      forceRender();
    }
  };
  return [getter, setter];
}

function useString(key: string, defValue: string): [string, (value: string) => void] {
  const pref = new SharedPreferences();
  return usePref<string>(
    key,
    defValue,
    (key, defValue) => pref.getString(key, defValue),
    (key, value) => pref.setString(key, value)
  );
}

function useBoolean(key: string, defValue: boolean): [boolean, (value: boolean) => void] {
  const pref = new SharedPreferences();
  return usePref<boolean>(
    key,
    defValue,
    (key, defValue) => pref.getBoolean(key, defValue),
    (key, value) => pref.setBoolean(key, value)
  );
}

function useNumber(key: string, defValue: number): [number, (value: number) => void] {
  const pref = new SharedPreferences();
  return usePref<number>(
    key,
    defValue,
    (key, defValue) => pref.getNumber(key, defValue),
    (key, value) => pref.setNumber(key, value)
  );
}

function useJSON<T = any>(key: string, defValue: T): [T, (value: T) => void] {
  const pref = new SharedPreferences();
  return usePref<T>(
    key,
    defValue,
    (key, defValue) => pref.getJSON(key, defValue),
    (key, value) => pref.setJSON(key, value)
  );
}

const usePreferences = {
  string: useString,
  boolean: useBoolean,
  number: useNumber,
  json: useJSON,
};

export { useBoolean, useString, useNumber, usePref, useJSON, usePreferences };
