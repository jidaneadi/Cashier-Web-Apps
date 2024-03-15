import{ jwtDecode} from 'jwt-decode';

export const state = () => ({
  acces_token: null,
  refresh_token: null,
  role: null,
})

export const getters = {
  authitencated(state) {
    if (state.acces_token) {
      const cek = jwtDecode(state.acces_token)
      console.log(cek)
      if (cek.role == 'admin') {
        return true
      }
      return false
    }
    return false
  },
  user: (state) => {
    if (state.acces_token) {
      return jwtDecode(state.acces_token)
    }
    return nil
  },
}

export const mutations = {
  setRole(state, role) {
    state.role = role
  },
  setAccesToken(state, acces_token) {
    state.acces_token = acces_token
  },
  setRefreshToken(state, refresh_token) {
    state.refresh_token = refresh_token
  },
}
export const actions = {
  async login({ commit }, payload) {
    const response = await this.$axios.$post(
      '/login',
      payload
    )
    console.log(response)
    if (!response) {
      return false
    }
    commit('setAccesToken', response.message.acces_token)
    commit('setRefreshToken', response.message.refresh_token)
    commit('setRole', response.message.role)

    return response
  },
}
