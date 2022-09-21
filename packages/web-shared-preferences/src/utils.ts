import { TempLocalStorage } from "./TempLocalStorage";

/** For browsers will `window.localStorage` used, for Node.js will an temp local storage used */
export const LocalStorage = typeof window !== "undefined" ? window.localStorage : new TempLocalStorage();
