import { makeAutoObservable } from "mobx";

export class FilterStore {
  tagFilter: string[] = [];
  contentRating: string[] = [];
  constructor() {
    // makeAutoObservable автоматически сделает все свойства наблюдаемыми,
    // а методы – экшенами.
    makeAutoObservable(this);
  }
  setContentRating(string: string) {
    this.contentRating = [string];
  }
  addTag(string: string) {
    this.tagFilter = [string];
  }

  removeTag(string: string) {
    this.tagFilter.filter((item) => item != string);
  }
}

// Экспортируем инстанс стора для удобного использования в компонентах
