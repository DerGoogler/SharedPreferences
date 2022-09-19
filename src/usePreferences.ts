import { useReducer } from "react";
import { SharedPreferences } from ".";

function useForceRender() {
  const [, forceRender] = useReducer(x => x + 1, 0);
  return forceRender;
}

const pref = new SharedPreferences();

/**
 * Used to build different hooks for the `localStorage` implementation
 * @param key To get the value from the local storage
 * @param defValue Default value to return if the key does not exist
 * @param core_getter
 * @param core_setter
 * @returns
 */
function usePrefCore<T = any>(key: string, defValue: T, core_getter: (key: string, defValue: T) => T, core_setter: (key: string, value: T) => void): [T, (value: T) => void] {
  const forceRender = useForceRender();
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
  return usePrefCore<string>(
    key,
    defValue,
    (key, defValue) => pref.getString(key, defValue),
    (key, value) => pref.setString(key, value)
  );
}

function useBoolean(key: string, defValue: boolean): [boolean, (value: boolean) => void] {
  return usePrefCore<boolean>(
    key,
    defValue,
    (key, defValue) => pref.getBoolean(key, defValue),
    (key, value) => pref.setBoolean(key, value)
  );
}

function useNumber(key: string, defValue: number): [number, (value: number) => void] {
  return usePrefCore<number>(
    key,
    defValue,
    (key, defValue) => pref.getNumber(key, defValue),
    (key, value) => pref.setNumber(key, value)
  );
}

function useJSON<T = any>(key: string, defValue: T): [T, (value: T) => void] {
  return usePrefCore<T>(
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

export { useBoolean, useString, useNumber, usePrefCore, useJSON, usePreferences };
