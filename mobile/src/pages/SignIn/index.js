import React, { useState } from 'react';
import { Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import logo from '~/assets/logo.png';
import { Container, TextInput, SubmitButton } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
    const [studentId, setStudentId] = useState('');

    const loading = useSelector(state => state.auth.loading);
    const dispatch = useDispatch();

    async function handleSignIn() {
        dispatch(signInRequest(studentId));
    }

    return (
        <Container>
            <Image source={logo} />
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Informe seu ID de cadastro"
                value={studentId}
                onChangeText={setStudentId}
            />
            <SubmitButton loadging={loading} onPress={handleSignIn}>
                Entrar no sistema
            </SubmitButton>
        </Container>
    );
}
