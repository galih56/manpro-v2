const storagePrefix = 'manpro_v2_';

const storage = {
  getToken: () => {
    var storageItem = window.localStorage.getItem(`${storagePrefix}token`);
    if(storageItem !== undefined && storageItem !== 'undefined' && storageItem !== null){
      storageItem = JSON.parse(storageItem);
    }
    return storageItem;
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;