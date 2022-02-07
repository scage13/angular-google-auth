import { Injectable, Inject } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';

type StorageType = 'local' | 'session';

@Injectable({ providedIn: 'root' })
export class VaultService {

  constructor(
    @Inject(WINDOW) private window: any,
  ) {}

  private store(type: StorageType): Storage {
    return type === 'local' ? this.window.localStorage : this.window.sessionStorage;
  }

  set(key: string, value: any, type: StorageType = 'local'): void {
    if (!key || !value) { return; }

    this.store(type).setItem(key, JSON.stringify(value));
  }

  get<T = any>(key: string, type: StorageType = 'local'): T {
    let data: any = this.store(type).getItem(key);

    try {
      data = JSON.parse(data);
    } catch (error) {
      console.warn(error);
    }

    if (!data) { return null; }

    return data;
  }

  remove(key: string, type: StorageType = 'local'): void {
    if (!this.store(type).getItem(key)) { return; }

    this.store(type).removeItem(key);
  }

  empty(type: StorageType = 'local'): void {
    this.store(type).clear();
  }

}
