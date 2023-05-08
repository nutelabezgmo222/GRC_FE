import LoginPage from '../components/Pages/LoginPage.vue';
import MainPage from '../components/Pages/MainPage.vue';
import GeneralHeader from '../components/Molecules/GeneralHeader.vue';

import RisksOverviewPage from '../components/Pages/Risks/RisksOverviewPage.vue';
import ControlsOverviewPage from '../components/Pages/Controls/ControlsOverviewPage.vue';

import RiskEntryPage from '../components/Pages/Risks/RiskEntryPage.vue';

const routes = [
    { path: '/', redirect: { name: 'LoginPage' }},
    { path: '/login', component: LoginPage, name: 'LoginPage' },
    {
        path: '/logout',
        component: LoginPage,
        props: {
            logout: true
        }
    },
    { path: '/main', component: MainPage, name: 'MainPage' },
    {
        path: '/risks',
        name: 'RisksWrapper',
        redirect: { name: 'RiskOverviewPage' },
        children: [{
            path: 'overview',
            components: {
                default: RisksOverviewPage,
                header: GeneralHeader
            },
            props: {
                header: {
                    title: 'Risks overview'
                }
            },
            name: 'RiskOverviewPage',
        }],
    },
    {
        path: '/risk/:id',
        component: RiskEntryPage,
        props: true,
        name: 'RiskEntryPage'
    },
    {
        path: '/controls',
        name: 'ControlsWrapper',
        redirect: { name: 'ControlsOverviewPage' },
        children: [{
            path: 'overview',
            components: {
                default: ControlsOverviewPage,
                header: GeneralHeader
            },
            props: {
                header: {
                    title: 'Controls overview'
                }
            },
            name: 'ControlsOverviewPage',
        }],
    },
]

export default routes;