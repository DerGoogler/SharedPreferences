import { util } from "googlers-tools";
import SharedPreferenceError from "./util/SharedPreferenceError";

/** This Web Storage API interface provides access to a particular domain's session or local storage. It allows, for example, the addition, modification, or deletion of stored data items. */
interface Storage {
  /** Returns the number of key/value pairs. */
  readonly length: number;
  /**
   * Removes all key/value pairs, if there are any.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  clear(): void;
  /** Returns the current value associated with the given key, or null if the given key does not exist. */
  getItem(key: string): string | null;
  /** Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs. */
  key(index: number): string | null;
  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  removeItem(key: string): void;
  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   *
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  setItem(key: string, value: string): void;
  [name: string]: any;
}

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

namespace SharedPreferences {
  /**
   * Default typed
   */
  export type DefType = {};
}

/**
 * Simple class to manage the web local sotrage
 */
class SharedPreferences implements SharedPreferences {
  private static readonly TAG: string = "SharedPreferences";
  private _storage: Storage;

  public constructor(storage?: Storage) {
    this._storage = storage || localStorage;
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
  public setJSON<T = Partial<SharedPreferences.DefType>>(key: string, value: Partial<T>): void {
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
      const get = this._storage.getItem(key);
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
      const get = this._storage.getItem(key);
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

  public getJSON<T = Partial<SharedPreferences.DefType>>(key: string, defValue: Partial<T>): Partial<T> {
    try {
      const get = this._storage.getItem(key);
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

type sharedpreferences = typeof sharedpreferences[keyof typeof sharedpreferences];
/**
 * Static SharedPreferences. Uses `globalThis.localStorage`.
 */
const sharedpreferences: SharedPreferences = new SharedPreferences(globalThis.localStorage);

export { SharedPreferences, sharedpreferences, Storage };
