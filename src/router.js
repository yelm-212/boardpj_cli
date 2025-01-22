import { createRouter, createWebHistory } from 'vue-router'
import PostList from './components/PostList.vue'
import PostDetail from './components/PostDetail.vue'
import PostCreate from './components/PostCreate.vue'
import PostEdit from './components/PostEdit.vue'
import PostEditor from "@/components/PostEditor.vue"

import store from './store'
import {postAPI} from "@/api";
import {ElMessageBox} from "element-plus";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: PostList  // 홈 경로에서 PostList를 렌더링
    },
    {
        path: '/posts/:id',
        name: 'PostDetail',
        component: PostDetail,
        props: true
    },
    {
        path: '/create',
        name: 'PostCreate',
        component: PostCreate
    },
    {
        path: '/posts/:id/edit',
        name: 'PostEdit',
        component: PostEdit,
        props: true,
        beforeEnter: async (to, from, next) => {
            try {
                // 게시글 정보 가져오기
                const response = await postAPI.getPost(to.params.id, store.getters.getUsername)
                const post = response.data

                // 현재 로그인한 사용자와 게시글 작성자 비교
                if (store.getters.getUsername !== post.author) {
                    await ElMessageBox.alert(
                        '자신의 게시글만 수정할 수 있습니다.',
                        '권한 없음',
                        {
                            type: 'error',
                            confirmButtonText: '확인'
                        }
                    )
                    next(from)  // 이전 페이지로 돌아가기
                } else {
                    next()  // 정상적으로 수정 페이지로 이동
                }
            } catch (error) {
                console.error('게시글 조회 실패:', error)
                next(from)
            }
        }
    },
    {
        path: '/posts/editor',
        name: 'PostEditor',
        component: PostEditor
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router