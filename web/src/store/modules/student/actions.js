export function listStudentsRequest() {
    return {
        type: '@student/LIST_STUDENTS_REQUEST',
    };
}

export function listStudentsSuccess(students) {
    return {
        type: '@student/LIST_STUDENTS_SUCCESS',
        payload: { students },
    };
}
