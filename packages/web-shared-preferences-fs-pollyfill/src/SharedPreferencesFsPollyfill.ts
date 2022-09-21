import * as fs from "fs";

import { Storage, TempLocalStorage } from "web-shared-preferences";

export type Path = `${string}.json`;
/**
 * Pollyfill to use SharedPreferences outside of browsers
 */
export class SharedPreferencesFsPollyfill extends TempLocalStorage implements Storage {
  private path: Path;

  public constructor(path: Path) {
    super();
    this.path = path;
  }

  private loadFile(file: string) {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  }

  private writeData(file: string, data: string) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }

  public getItem(key: string) {
    // const stringKey = String(key);
    // if (this.valueMap.has(key)) {
    //   return String(this.valueMap.get(stringKey));
    // }
    // return null;

    return this.loadFile(this.path)[key];
  }

  public setItem(key: string, value: string): void {
    let tmp = this.loadFile(this.path);
    tmp[key] = value;
    this.writeData(this.path, tmp);
  }

  public removeItem(key: string) {
    // this.valueMap.delete(key);
    // this.update();
  }

  public clear() {
    // this.valueMap.clear();
    // this.update();
  }

  public key(i: number): string {
    return "";
  }

  public get length(): number {
    return Object.keys(this.loadFile(this.path)).length;
  }
}

// export const _SharedPreferencesFsPollyfill = (path) => {
//   let firstValue = {};

//   const coreSetItem = (key, value) => {};
//   const coreGetItem = (key) => {
//     return JSON.parse(fs.readFileSync(path, "utf8"))[key];
//   };

//   return {
//     length: 0,
//     setItem: coreSetItem,
//     getItem: coreGetItem,
//     clear: () => {},
//     key: (index) => {
//       return null;
//     },
//     removeItem: (key) => {},
//   };
// };
