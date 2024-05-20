export const fetchFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const postToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
