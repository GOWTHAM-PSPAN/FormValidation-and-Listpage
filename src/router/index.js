import { createRouter, createWebHistory } from 'vue-router'
import ListPage from '@/components/listpage.vue'
import Home from '@/components/Form-student.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/Listpage', component: ListPage },
    ]
});

export default router;