import { util } from "googlers-tools";
import SharedPreferenceError from "./util/SharedPreferenceError";

interface SharedPreferences {
  setString(key: string, value: string): void;
  setBoolean(key: string, value: boolean): void;
  setNumber(key: string, value: number): void;
  setJSON<T = any>(key: string, value: T): void;
  getString(key: string, defValue: string): string;
  getBoolean(key: string, defValue: boolean): boolean;
  getNumber(key: string, defValue: number): number;
  getJSON<T = any>(key: string, defValue: T): T;
  removePref(key: string): void;
  clearPrefs(): void;
}

/**
 * Default typed
 */
type DefType = {};
export type KeyType<T> = {
  [key in keyof T]: (defValue: T[key]) => T[key];
};
export type DefaultKeys = { length: number };
/**
 * Simple class to manage the web local sotrage
 */
class SharedPreferences implements SharedPreferences {
  private static readonly TAG: string = "SharedPreferences";

  public constructor() {}

  public readonly length: number = localStorage.length;

  public setString(key: string, value: string): void {
    localStorage.setItem(key, String(value));
  }

  public setBoolean(key: string, value: boolean): void {
    localStorage.setItem(key, String(value));
  }

  public setNumber(key: string, value: number): void {
    localStorage.setItem(key, String(value));
  }

  /**
   * Sets an json object to the localstorage. All properties are partially
   * @param key
   * @param value
   */
  public setJSON<T = Partial<DefType>>(key: string, value: Partial<T>): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieve a String value from the preferences.
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @return Returns the preference value if it exists, or defValue. Throws SharedPreferenceError if there is a preference with this name that is not a String.
   *
   * @throws SharedPreferenceError
   */
  public getString(key: string, defValue: string): string {
    try {
      const get = localStorage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return String(get);
      }
    } catch (e) {
      if (e instanceof SharedPreferenceError) {
        throw new SharedPreferenceError(`[${SharedPreferences.TAG}] ${e.message}`);
      } else {
        throw new SharedPreferenceError("Error thrown an error");
      }
    }
  }

  /**
   * Retrieve a boolean value from the preferences.
   *
   * @remember if it's from an Switch or Select, put `_switch` or `_select` after the name
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @returns Returns the preference value if it exists, or defValue. Throws SharedPreferenceError if there is a preference with this name that is not a boolean.
   *
   * @throws SharedPreferenceError
   */
  public getBoolean(key: string, defValue: boolean): boolean {
    try {
      const get = localStorage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return util.stringToBoolean(get);
      }
    } catch (e) {
      if (e instanceof SharedPreferenceError) {
        throw new SharedPreferenceError(`[${SharedPreferences.TAG}] ${e.message}`);
      } else {
        throw new SharedPreferenceError("Error thrown an error");
      }
    }
  }

  /**
   * Retrieve a int value from the preferences.
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @returns Returns the preference value if it exists, or defValue. Throws SharedPreferenceError if there is a preference with this name that is not an int.
   *
   * @throws SharedPreferenceError
   */
  public getNumber(key: string, defValue: number): number {
    try {
      const get = localStorage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return Number(get);
      }
    } catch (e) {
      if (e instanceof SharedPreferenceError) {
        throw new SharedPreferenceError(`[${SharedPreferences.TAG}] ${e.message}`);
      } else {
        throw new SharedPreferenceError("Error thrown an error");
      }
    }
  }

  public getJSON<T = Partial<DefType>>(key: string, defValue: Partial<T>): Partial<T> {
    try {
      const get = localStorage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return JSON.parse(get);
      }
    } catch (e) {
      if (e instanceof SharedPreferenceError) {
        throw new SharedPreferenceError(`[${SharedPreferences.TAG}] ${e.message}`);
      } else {
        throw new SharedPreferenceError("Error thrown an error");
      }
    }
  }

  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public removePref(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Removes all key/value pairs, if there are any.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public clearPrefs(): void {
    localStorage.clear();
  }
}

type sharedpreferences = typeof sharedpreferences[keyof typeof sharedpreferences];
/**
 * Static SharedPreferences
 */
const sharedpreferences: SharedPreferences = new SharedPreferences();

function prefs<K extends DefaultKeys = DefaultKeys>(): KeyType<K> {
  // @ts-ignore
  let pref: KeyType<K> = Object.keys(localStorage);

  const hasJsonStructure = (str: string) => {
    if (typeof str !== "string") return false;
    try {
      const result = JSON.parse(str);
      const type = Object.prototype.toString.call(result);
      return type === "[object Object]" || type === "[object Array]";
    } catch (err) {
      return false;
    }
  };

  Object.keys(localStorage).forEach(method => {
    switch (typeof localStorage[method]) {
      case "string":
        if (hasJsonStructure(localStorage[method])) {
          pref[method] = <T = Partial<DefType>>(defValue: Partial<T>): Partial<T> => {
            return sharedpreferences.getJSON<T>(method, defValue);
          };
        } else {
          pref[method] = (defValue: string): string => {
            return sharedpreferences.getString(method, defValue);
          };
        }
        break;
      case "number":
        pref[method] = (defValue: number): number => {
          return sharedpreferences.getNumber(method, defValue);
        };
        break;
      case "boolean":
        pref[method] = (defValue: boolean): boolean => {
          return sharedpreferences.getBoolean(method, defValue);
        };
        break;
    }
  });

  return pref;
}

export { SharedPreferences, sharedpreferences, prefs, SharedPreferenceError };
