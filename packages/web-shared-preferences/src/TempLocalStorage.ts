import { StorageImpl } from "./SharedPreferences";

/**
 * Used for debugging purposes only.
 */
export class TempLocalStorage implements StorageImpl {
  private valuesMap: Map<any, any>;
  
  public constructor() {
    this.valuesMap = new Map();
  }

  public getItem(key: string) {
    const stringKey = String(key);
    if (this.valuesMap.has(key)) {
      return String(this.valuesMap.get(stringKey));
    }
    return null;
  }

  public setItem(key: string, val: string): void {
    this.valuesMap.set(String(key), String(val));
  }

  public removeItem(key) {
    this.valuesMap.delete(key);
  }

  public clear() {
    this.valuesMap.clear();
  }

  public key(i: number) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."); // this is a TypeError implemented on Chrome, Firefox throws Not enough arguments to Storage.key.
    }
    var arr = Array.from(this.valuesMap.keys());
    return arr[i];
  }

  public get length() {
    return this.valuesMap.size;
  }
}
