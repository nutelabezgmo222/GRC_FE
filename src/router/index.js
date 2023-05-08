import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

router.beforeEach(async (to, _, next) => {
    let isAuthorized = store.getters.isUserLogged;
 
    if (!isAuthorized) {
        try {
            console.log('trying to login');
            await store.dispatch('tryToLogin');

            isAuthorized = store.getters.isUserLogged;
        } catch {}
    }

    if (!isAuthorized && to.name !== 'LoginPage') {
        return next({ name: 'LoginPage' });
    } else {
        next();
    }
});

export default router;