import { loginByToken, logout, login } from '../../api/login';

const REMEMBER_TOKEN_KEY = 'rememberToken';

export default {
    actions: {
        tryToLogin(ctx) {
            let tokenFromLocalStorage = localStorage.getItem(REMEMBER_TOKEN_KEY);
            if(!tokenFromLocalStorage) return;

            return loginByToken(tokenFromLocalStorage)
                .then(response => {
                    ctx.commit('updateUserData', response.user);
                });
        },
        logout(ctx) {
            return logout()
                .then(() => {
                    ctx.commit('clearUserData');
                })
        },
        login(ctx, userData) {
            return login(userData)
                .then((response) => {
                    ctx.dispatch('saveUserData', response.user);
                })
        },
        saveUserData(ctx, userData) {
            if(userData.remember_token) {
                localStorage.setItem(REMEMBER_TOKEN_KEY, userData.remember_token);
            }

            ctx.commit('updateUserData', userData);
        }
    },
    mutations: {
        updateUserData(state, newData) {
            state.user = newData;
            state.remember_token = newData.remember_token;
        },
        clearUserData(state) {
            state.user = {};
            state.remember_token = null;
            localStorage.removeItem(REMEMBER_TOKEN_KEY);
        }
    },
    state: {
        user: {},
        remember_token: null
    },
    getters: {
        user: (state) => {
            return state.user;
        },
        rememberToken: (state) => {
            return state.remember_token
        },
        isUserLogged: (state) => {
            return !!state.remember_token
        },
        isUserAdmin: (state) => {
            return state.user.is_admin;
        }
    }
};