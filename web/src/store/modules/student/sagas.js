import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';
import { listStudentsSuccess } from './actions';

export function* listStudents() {
    const response = yield call(api.get, 'students');

    yield put(listStudentsSuccess(response.data));
}

export default all([
    takeLatest('@student/LIST_STUDENTS_REQUEST', listStudents),
]);
