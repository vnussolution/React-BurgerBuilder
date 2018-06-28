export default class Helper {
  constructor() {
    console.log("Helper is here:");
  }
  static deplay(func, timeout) {
    console.log(`helper's delay : ${timeout}`);
    setTimeout(() => {
      func();
    }, timeout ? timeout : 999);
  }
}
