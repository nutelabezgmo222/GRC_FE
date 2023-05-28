import { getUsers } from '../../api/users'; 

export default {
    actions: {
        getAllUsers(ctx) {
            return getUsers().then(responce => {
                ctx.commit('setUsers', responce.list);
            });
        },
        addUser(ctx, newUser) {
            ctx.commit('addUser', newUser);
        },
        updateUser(ctx, updatedUser) {
            ctx.commit('updateUser', updatedUser);
        },
        getUserById(ctx, id) {
            return ctx.state.users.find(user => user.id === id);
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        addUser(state, user) {
            state.users.push(user);
        },
        updateUser(state, user) {
            let idx = state.users.findIndex(u => u.id === user.id);

            if (idx === -1) return;
            console.log(idx);

            state.users[idx] = user;
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