export function signInRequest(studentId) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: { studentId },
    };
}

export function signInSuccess({ student, token }) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: { student, token },
    };
}

export function signFailure() {
    return {
        type: '@auth/SIGN_FAILURE',
        payload: {},
    };
}

export function signOut() {
    return {
        type: '@auth/SIGN_OUT',
        payload: {},
    };
}
