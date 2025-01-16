import { createStore } from 'vuex'

export default createStore({
    state: {
        username: localStorage.getItem('username') || ''
    },

    getters: {
        getUsername: (state) => state.username,
        isLoggedIn: (state) => !!state.username
    },

    mutations: {
        SET_USERNAME(state, username) {
            state.username = username
            localStorage.setItem('username', username)
        },
        CLEAR_USERNAME(state) {
            state.username = ''
            localStorage.removeItem('username')
        }
    },

    actions: {
        setUsername({ commit }, username) {
            commit('SET_USERNAME', username)
        },
        clearUsername({ commit }) {
            commit('CLEAR_USERNAME')
        }
    }
})