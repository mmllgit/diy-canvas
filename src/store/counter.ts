import { makeAutoObservable, runInAction } from "mobx";
class Counter {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  count = 0;
  increment() {
    this.count++;
  }

  reset() {
    setTimeout(() => {
      runInAction(() => {
        this.count = 0;
      });
    }, 1000);
  }

  get double() {
    return this.count * 2;
  }
}

const counter = new Counter();

export default counter;
