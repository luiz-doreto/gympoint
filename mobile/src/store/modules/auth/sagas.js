import { call, all, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const response = yield call(api.post, `/sessions/student`, {
            id: payload.studentId,
        });

        const { token } = response.data;
        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSuccess(response.data));
    } catch (error) {
        yield put(signFailure());
        Alert.alert(
            'Falha ao realizar login',
            'Por favor, tente novamente mais tarde'
        );
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
