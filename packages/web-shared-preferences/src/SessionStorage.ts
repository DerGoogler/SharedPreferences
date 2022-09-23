import { StorageImpl } from "./SharedPreferences";
import { TempLocalStorage } from "./TempLocalStorage";

/** For browsers will `window.sessionStorage` used, for Node.js will an temp local storage used */
export function SessionStorage(): StorageImpl {
  const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : new TempLocalStorage();

  return {
    get length(): number {
      return localStorage.length;
    },

    setItem(key: string, value: string): void {
      sessionStorage.setItem(key, value);
    },

    getItem(key: string): string | null {
      return sessionStorage.getItem(key);
    },

    clear(): void {
      sessionStorage.clear();
    },

    removeItem(key: string): void {
      sessionStorage.removeItem(key);
    },

    key(index: number): string | null {
      return sessionStorage.key(index);
    },
  };
}
