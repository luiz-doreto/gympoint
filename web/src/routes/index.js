import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import StudentList from '~/pages/Student/List';
import StudentForm from '~/pages/Student/Form';
import PlanList from '~/pages/Plan/List';
import PlanForm from '~/pages/Plan/Form';
import RegisterList from '~/pages/Register/List';
import RegisterForm from '~/pages/Register/Form';
import HelpOrderList from '~/pages/HelpOrder/List';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />

            <Route path="/student/list" component={StudentList} isPrivate />
            <Route
                path={['/student/form/:student_id', '/student/form']}
                component={StudentForm}
                isPrivate
            />
            <Route path="/plan/list" component={PlanList} isPrivate />
            <Route
                path={['/plan/form/:plan_id', '/plan/form']}
                component={PlanForm}
                isPrivate
            />
            <Route path="/register/list" component={RegisterList} isPrivate />
            <Route
                path={['/register/form/:register_id', '/register/form']}
                component={RegisterForm}
                isPrivate
            />
            <Route
                path="/help-order/list"
                component={HelpOrderList}
                isPrivate
            />
        </Switch>
    );
}
