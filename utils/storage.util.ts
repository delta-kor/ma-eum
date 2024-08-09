class Storage {
  constructor() {}

  public static getItem(key: string) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  public static removeItem(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  public static setItem(key: string, item: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, item);
    }
  }
}

class SessionStorage {
  constructor() {}

  public static getItem(key: string) {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  public static removeItem(key: string) {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  }

  public static setItem(key: string, item: string) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, item);
    }
  }
}

export { SessionStorage };
export default Storage;
