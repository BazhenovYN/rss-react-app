export class LocalStorageMock {
  store: Map<string, string>;
  length: number;

  constructor() {
    this.store = new Map();
    this.length = 0;
  }

  key = (idx: number): string | null => {
    const keys = Array.from(this.store.keys());
    return idx < keys.length ? keys[idx] : null;
  };

  clear() {
    this.store.clear();
    this.length = 0;
  }

  getItem(key: string): string | null {
    return this.store.get(key) || null;
  }

  setItem(key: string, value: string | number) {
    this.store.set(key, String(value));
    this.length = this.store.size;
  }

  removeItem(key: string) {
    if (this.store.has(key)) {
      this.store.delete(key);
      this.length = this.store.size;
    }
  }
}
