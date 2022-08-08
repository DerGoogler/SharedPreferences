import { SharedPreferences, prefs, DefaultKeys } from "./../src/index";

interface Keys extends DefaultKeys {
  myStr: string;
  myNumb: number;
  myBool: boolean;
  myObj: Partial<{
    test: "Hello World!";
  }>;
}

const pref = new SharedPreferences();

const key = prefs<Keys>();

pref.setString("test", "value");

// Get string
key.myStr("");
// Get number
key.myNumb(0);
// Get boolean
key.myBool(false);
// Get object
key.myObj({}).test;
