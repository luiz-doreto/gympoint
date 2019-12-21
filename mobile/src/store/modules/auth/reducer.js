import produce from 'immer';

const INITIAL_STATE = {
    signed: false,
    loading: false,
    token: null,
    studentId: null,
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST':
                draft.loading = true;
                break;
            case '@auth/SIGN_IN_SUCCESS':
                draft.token = action.payload.token;
                draft.studentId = action.payload.student.id;
                draft.loading = false;
                draft.signed = true;
                break;
            case '@auth/SIGN_FAILURE':
                draft.loading = false;
                break;
            case '@auth/SIGN_OUT':
                draft.signed = false;
                draft.token = null;
                draft.studentId = null;
                break;
            default:
        }
    });
}
