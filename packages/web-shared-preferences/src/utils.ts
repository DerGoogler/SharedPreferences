import { TempLocalStorage } from "./TempLocalStorage";

/** For browsers will `window.localStorage` used, for Node.js will an temp local storage used */
export const LocalStorage = typeof window !== "undefined" ? window.localStorage : new TempLocalStorage();
/** For browsers will `window.sessionStorage` used, for Node.js will an temp local storage used */
export const SessionStorage = typeof window !== "undefined" ? window.sessionStorage : new TempLocalStorage();
