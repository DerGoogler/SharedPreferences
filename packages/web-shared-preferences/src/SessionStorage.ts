import { StorageImpl } from "./SharedPreferences";
import { TempLocalStorage } from "./TempLocalStorage";

/** For browsers will `window.sessionStorage` used, for Node.js will an temp local storage used */
export const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : new TempLocalStorage();

export class SessionStorage implements StorageImpl {
  public constructor() {}

  [name: string]: any;

  public get length(): number {
    return sessionStorage.length;
  }

  public setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  public clear(): void {
    sessionStorage.clear();
  }

  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public key(index: number): string | null {
    return sessionStorage.key(index);
  }
}
