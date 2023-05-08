import { getUsers } from '../../api/users'; 

export default {
    actions: {
        getAllUsers(ctx) {
            return getUsers().then(responce => {
                ctx.commit('setUsers', responce.list);
            });
        },
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        }
    },
    state: {
        users: []
    },
    getters: {
        allUsers: state => {
            return state.users;
        },
    },
};