import UsersPage from '../components/Pages/Settings/UsersPage.vue'
import AdminPage from '../components/Pages/Settings/AdminPage.vue'
import ThreatsPage from '../components/Pages/Settings/Risks/ThreatsPage.vue'
import RiskPeriodsPage from '../components/Pages/Settings/Risks/RiskPeriodsPage.vue'

import GeneralHeader from '../components/Molecules/GeneralHeader.vue';

const routes = [
    {
        path: '/settings/general',
        redirect: { name: 'UsersPage' },
        name: 'GeneralSettingsWrapper',
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
    },
    {
        path: '/settings/risks',
        redirect: { name: 'ThreatsPage' },
        name: 'RisksSettingsWrapper',
        children: [{
            path: 'threats',
            name: 'ThreatsPage',
            components: {
                default: ThreatsPage,
                header: GeneralHeader
            },
            props: {
                header: {
                    title: 'Threats and vulnerabilities'
                }
            },
        }, {
            path: 'periods',
            name: 'RiskPeriodsPage',
            components: {
                default: RiskPeriodsPage,
                header: GeneralHeader
            },
            props: {
                header: {
                    title: 'Risk periods'
                }
            },
        }],
    }
];

export default routes;