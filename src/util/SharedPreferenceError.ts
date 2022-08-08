interface SharedPreferenceError extends ErrorConstructor {
  new (message?: string): Error;
  (message?: string): Error;
  readonly prototype: Error;
}

class SharedPreferenceError extends Error implements SharedPreferenceError {
  public constructor(message?: string) {
    super(message);
    this.name = "SharedPreferenceError";
  }
}

export default SharedPreferenceError;
