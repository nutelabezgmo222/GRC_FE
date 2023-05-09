import RiskEntryPage from '../components/Pages/Risks/RiskEntryPage.vue';
import ControlEntryPage from '../components/Pages/Controls/ControlEntryPage.vue';
import { ObjectTypes } from '../constants/ObjectTypes';

export const getItemComponentByObj = (item) => {
    switch(item.objType) {
        case ObjectTypes.RISK:
            return {
                component: RiskEntryPage,
                props: {
                    id: item.id
                },
            };
        case ObjectTypes.CONTROL:
            return {
                component: ControlEntryPage,
                props: {
                    id: item.id
                },
            };
        default: return null;
    };
};