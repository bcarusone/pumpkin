const SET_APP_CLAIMS = 'app/SET_APP_CLAIMS';
const SET_UTILIZATION = 'app/SET_UTILIZATION';

const appInitialState = {
    claims: null,
    utilization: null,
};

export default function appReducer(state = appInitialState, { payload, type } = {}) {
    switch (type) {
        case SET_APP_CLAIMS:
            return { ...state, claims: payload };

        case SET_UTILIZATION:
            return { ...state, utilization: payload };

        default:
            return state;
    }
}

export function setAppClaims(payload) {
    return {
        type: SET_APP_CLAIMS,
        payload,
    };
}

export function setUtilization(payload) {
    return {
        type: SET_UTILIZATION,
        payload,
    };
}