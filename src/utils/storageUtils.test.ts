import { getFromLocalStorage, saveToLocalStorage } from './storageUtils';

describe('storageUtils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const key = 'item';
  const value = 'value';

  test('saveToLocalStorage save data to localStorage', () => {
    saveToLocalStorage(key, value);
    expect(localStorage.getItem(key)).toBe(JSON.stringify(value));
  });

  test('getFromLocalStorage get data from localStorage', () => {
    localStorage.setItem(key, JSON.stringify(value));
    expect(getFromLocalStorage(key)).toBe(value);
  });

  test('getFromLocalStorage return null for a non-existing key', () => {
    expect(getFromLocalStorage(key)).toBeNull();
  });
});
