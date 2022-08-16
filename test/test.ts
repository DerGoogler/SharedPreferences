type ISetState<T> = ((newValue: T) => void) | ((prevValue: T) => T);
type IUseStateArg<T> = T | (() => T);

// export const useString = <T extends any>(
//   defaultValue: IUseStateArg<T>
// ): [T, ISetState<T>] => {



  function useString(key, defValue): [T, ISetState<T>] {
    // const pref: SharedPreferences = new SharedPreferences();
    const pref = localStorage;
    const get = pref.getItem(key);

    const toggle = useCallback((value) => pref.setItem(key, value));

    return [get, toggle];
  }

  const [test, setTest] = useString("test");

  setTest("this-test");

  console.log(test);