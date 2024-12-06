export const storeAtLocalStorage = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  return localStorage.setItem(key, stringifiedValue);
};

export const getLocalStorageData = (key) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};
