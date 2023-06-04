import RiskEntryPage from '../components/Pages/Risks/RiskEntryPage.vue';
import ControlEntryPage from '../components/Pages/Controls/ControlEntryPage.vue';
import UserEntryPage from '../components/Pages/User/UserEntryPage.vue';

import { ObjectTypes } from '../constants/ObjectTypes';

export const getItemComponentByObj = (item) => {
    switch(item.objType) {
        case ObjectTypes.RISK:
            return {
                component: RiskEntryPage,
                props: {
                    id: item.id,
                    fullViewUrl: '/risk/' + item.id
                },
            };
        case ObjectTypes.CONTROL:
            return {
                component: ControlEntryPage,
                props: {
                    id: item.id,
                    fullViewUrl: '/control/' + item.id
                },
            };
        case ObjectTypes.USER:
            return {
                component: UserEntryPage,
                props: {
                    id: item.id,
                    fullViewUrl: '/user/' + item.id
                },
            };
        default: return null;
    };
};

export const isEmailValid = (mail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

export const isPasswordValid = (password) => {
    return password.length >= 4;
}