import UsersPage from '../components/Pages/Settings/UsersPage.vue'
import AdminPage from '../components/Pages/Settings/AdminPage.vue'
import GeneralHeader from '../components/Molecules/GeneralHeader.vue';

const routes = [
    { 
        path: '/settings/general',
        redirect: { name: 'UsersPage' },
        name: 'GeneralWrapper',
        children: [{
            path: 'users',
            components: {
                default: UsersPage,
                header: GeneralHeader
            },
            props: {
                header: {
                    title: 'Users page'
                }
            },
            name: 'UsersPage'
        }, {
            path: 'admin',
            component: AdminPage,
            name: 'AdminPage'
        }],
    }
];

export default routes;