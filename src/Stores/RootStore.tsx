import { FilterStore } from "./FilterStore";

export class RootStore {
  filterStore: FilterStore;

  constructor() {
    this.filterStore = new FilterStore();
    // Если у вас есть дополнительные сторы – создавайте их здесь.
  }
}
