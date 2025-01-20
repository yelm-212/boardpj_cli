import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export const postAPI = {
    getList(page = 1, size = 10) {
        return api.get(`/posts?page=${page}&size=${size}`)
    },

    getPost(id, username) {
        return api.get(`/posts/${id}?username=${username}`)
    },

    createPost(data) {
        return api.post('/posts', data)
    },

    updatePost(data) {
        return api.patch(`/posts`, data)
    },

    deletePost(id, username) {
        return api.delete(`/posts/${id}?username=${username}`)
    },

    likePost(data) {
        return api.post('/posts/like', data)
    },

    unlikePost(data) {
        return api.delete('/posts/like', data)
    }
}