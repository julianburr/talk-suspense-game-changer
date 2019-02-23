import api from './api';

let cache = {};

function getKey (type, args) {
  return `${type}--${JSON.stringify(args)}`;
}

export default {
  read: (type, args) => {
    const key = getKey(type, args);

    if (cache[key] instanceof Promise) {
      throw cache[key];
    }

    if (cache[key]) {
      return cache[key];
    }

    const load = api(type, args).then((data) => {
      cache[key] = data;
    });
    cache[key] = load;

    throw load;
  }
};
