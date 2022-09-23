import { LocalStorage } from "./LocalStorage";
import { SharedPreferenceError } from "./SharedPreferenceError";

export interface StorageImpl {
  get length(): number;
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  clear(): void;
  removeItem(key: string): void;
  key(index: number): string | null;
  [name: string]: any;
}

/**
 * Simple class to manage the web local sotrage
 */
class SharedPreferences {
  private static readonly TAG: string = "SharedPreferences";
  private _storage: StorageImpl;

  public constructor(storage: StorageImpl) {
    this._storage = storage;
  }

  public setString(key: string, value: string): void {
    this._storage.setItem(key, String(value));
  }

  public setBoolean(key: string, value: boolean): void {
    this._storage.setItem(key, String(value));
  }

  public setNumber(key: string, value: number): void {
    this._storage.setItem(key, String(value));
  }

  /**
   * Sets an json object to the localstorage. All properties are partially
   * @param key
   * @param value
   */
  public setJSON<T = any>(key: string, value: T): void {
    this._storage.setItem(key, JSON.stringify(value));
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
      const get = this._storage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return String(get);
      }
    } catch (e) {
      throw new SharedPreferenceError((e as Error).message);
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
      const get = this._storage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return get === "true";
      }
    } catch (e) {
      throw new SharedPreferenceError((e as Error).message);
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
      const get = this._storage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return Number(get);
      }
    } catch (e) {
      throw new SharedPreferenceError((e as Error).message);
    }
  }

  public getJSON<T = any>(key: string, defValue: T): T {
    try {
      const get = this._storage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return JSON.parse(get);
      }
    } catch (e) {
      throw new SharedPreferenceError((e as Error).message);
    }
  }

  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public removePref(key: string): void {
    this._storage.removeItem(key);
  }

  /**
   * Removes all key/value pairs, if there are any.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public clearPrefs(): void {
    this._storage.clear();
  }
}

/**
 * Static SharedPreferences. Uses `window.localStorage`.
 */
const sharedpreferences: SharedPreferences = new SharedPreferences(LocalStorage());

export { SharedPreferences, sharedpreferences };
