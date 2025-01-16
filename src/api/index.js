import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export const postAPI = {
    getList(page = 1, size = 10) {
        return api.get(`/posts?page=${page}&size=${size}`)
    },

    getPost(id) {
        return api.get(`/posts/${id}`)
    },

    createPost(data) {
        return api.post('/posts', data)
    },

    updatePost(data) {
        return api.patch(`/posts`, data)
    },

    deletePost(id) {
        return api.delete(`/posts/${id}`)
    }
}