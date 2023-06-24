export const STORAGE = {
    LANGUAGE: "LANGUAGE",
    USER_TOKEN: "USER_TOKEN",
    USER_DATA: "USER_DATA",
    currentUser: "currentUser",
    startpoint: "startpoint",
    endpoint: "endpoint",
    date: "date",
    POSITION : "POSITION",
  };
  
  export function getLocalStorage(key) {
    return localStorage.getItem(key);
  }
  
  export function setLocalStorage(key, value) {
    return localStorage.setItem(key, value);
  }
  
  export function removeLocalStorage(key) {
    return localStorage.removeItem(key);
  }
  