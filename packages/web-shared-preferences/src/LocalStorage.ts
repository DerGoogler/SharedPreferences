import { StorageImpl } from "./SharedPreferences";
import { TempLocalStorage } from "./TempLocalStorage";

/** For browsers will `window.localStorage` used, for Node.js will an temp local storage used */
export function LocalStorage(): StorageImpl {
  const localStorage = typeof window !== "undefined" ? window.localStorage : new TempLocalStorage();

  return {
    get length(): number {
      return localStorage.length;
    },

    setItem(key: string, value: string): void {
      localStorage.setItem(key, value);
    },

    getItem(key: string): string | null {
      return localStorage.getItem(key);
    },

    clear(): void {
      localStorage.clear();
    },

    removeItem(key: string): void {
      localStorage.removeItem(key);
    },

    key(index: number): string | null {
      return localStorage.key(index);
    },
  };
}
