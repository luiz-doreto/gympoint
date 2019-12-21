import produce from 'immer';

const INITIAL_STATE = {
    token: null,
    loading: false,
    signed: false,
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST': {
                draft.loading = true;
                break;
            }
            case '@auth/SIGN_IN_SUCCESS': {
                draft.token = action.payload.token;
                draft.loading = false;
                draft.signed = true;
                break;
            }
            case '@auth/SIGN_IN_FAILURE': {
                draft.loading = false;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.token = null;
                draft.loading = false;
                draft.signed = false;
                break;
            }
            default:
        }
    });
}
