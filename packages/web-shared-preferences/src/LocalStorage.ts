import { StorageImpl } from "./SharedPreferences";
import { TempLocalStorage } from "./TempLocalStorage";

/** For browsers will `window.localStorage` used, for Node.js will an temp local storage used */
export const localStorage = typeof window !== "undefined" ? window.localStorage : new TempLocalStorage();

export class LocalStorage implements StorageImpl {
  public constructor() {}

  [name: string]: any;

  public get length(): number {
    return localStorage.length;
  }

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public key(index: number): string | null {
    return localStorage.key(index);
  }
}
