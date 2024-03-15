import createdPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import cookie from 'cookie';

export default ({ store, req }) => {
  createdPersistedState({
      key:'token',
      paths: ['auth.nama', 'auth.acces_token', 'auth.refresh_token'],
      storage: {
          getItem: (key) => {//Untuk mengambil data cookies
              // See https://nuxtjs.org/guide/plugins/#using-process-flags
              if (process.server) {
                  const parsedCookies = cookie.parse(req.headers.cookie);
                  return parsedCookies[key];
              } else {
                  return Cookies.get(key);
              }
          },
          // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
          setItem: (key, value) =>//Utk menyimpan key dan value (cth key: name, acces_token dll)
              Cookies.set(key, value, { expires: 365, secure: false }),
          removeItem: key => Cookies.remove(key)
      }
  })(store);
};
