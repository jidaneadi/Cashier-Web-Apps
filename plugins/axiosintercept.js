import Cookies from 'js-cookie'

export default function ({ $axios, redirect, store }) {
  //Mengirim acces_token supaya dapat mengload data melalui api yg membutuhkan acces_token
  $axios.onRequest((config) => {
    if (
      store.getters['auth/authitencated']
    ) {
      config.headers['Authorization'] = `Bearer ${store.state.auth.acces_token}`
    }
  })

  $axios.onResponseError((error) => {
    console.log(error.response.data)
    if (
      error.response.status === 403 &&
      error.response.data.status === 'error in jwt'
    ) {
      if (store.state.auth.refresh_token) {
        let refresh_token = store.state.auth.refresh_token
        return $axios
          .$post('/refresh', { 'refresh_token': refresh_token })
          .then((response) => {
            const originalRequest = error.config;
            store.commit(`auth/setAccesToken`, response.acces_token)
            store.commit(`auth/setRefreshToken`, response.refresh_token)
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${response.acces_token}`
            return $axios(originalRequest)
          })
          .catch((error) => {
            if (error.response.data.status === 'error in refreshToken') {
              Cookies.remove('token')
              return (window.location.href = '/')
            }
          })
      }
    }
  })
}
