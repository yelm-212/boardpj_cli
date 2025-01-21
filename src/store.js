import { createStore } from 'vuex'

export default createStore({
    namespaced: true,

    state: {
        username: localStorage.getItem('username') || '',
        currentPage: 1
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
        },
        SET_CURRENT_PAGE(state, page) {
            state.currentPage = page
        }
    },

    actions: {
        setUsername({ commit }, username) {
            commit('SET_USERNAME', username)
        },
        clearUsername({ commit }) {
            commit('CLEAR_USERNAME')
        },
        setCurrentPage({ commit }, page) {
            commit('SET_CURRENT_PAGE', page)
        }
    }
})