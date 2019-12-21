import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
import { Container } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required('Campo obrigatório!'),
    password: Yup.string().required('Campo obrigatório!'),
});

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit(data) {
        dispatch(signInRequest(data));
    }

    return (
        <Container>
            <img src={logo} alt="logo" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <Input id="email" name="email" type="email" />
                <label htmlFor="pass">Senha</label>
                <Input id="pass" name="password" type="password" />

                <button type="submit">
                    {loading ? 'Carregando...' : 'Entrar no sistema'}
                </button>
            </Form>
        </Container>
    );
}
