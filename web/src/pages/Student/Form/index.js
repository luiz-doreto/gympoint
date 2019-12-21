import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form as UnForm, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import {
    ContentHeader,
    ContentWrapper,
    Button,
    InputMask,
    Spinner,
} from '~/components';
import { Container, InputContainer } from './styles';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string()
        .email('E-mail inválido')
        .required('Campo obrigatório'),
    age: Yup.number()
        .typeError('Campo obrigatório')
        .required('Campo obrigatório'),
    weight: Yup.number()
        .typeError('Campo obrigatório')
        .required('Campo obrigatório'),
    height: Yup.number()
        .typeError('Campo obrigatório')
        .required('Campo obrigatório'),
});

export default function Form() {
    const { student_id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStudent() {
            if (student_id) {
                const response = await api.get(`students/${student_id}`);

                setStudent(response.data);
            } else {
                setStudent({});
            }
            setLoading(false);
        }

        loadStudent();
    }, [student_id]);

    async function handleSave(data) {
        try {
            if (student_id) {
                await api.put('students', { id: student_id, ...data });
                toast.success('Aluno atualizado com sucesso!');
            } else {
                await api.post('students', data);
                toast.success('Aluno cadastrado com sucesso!');
            }

            history.push('/student/list');
        } catch (error) {
            toast.error(
                'Falha ao salvar registro. Por favor, verifique seus dados!'
            );
        }
    }

    return (
        <Container>
            <ContentHeader
                title={student_id ? 'Edição de aluno' : 'Cadastro de aluno'}
            >
                <Button
                    text="Voltar"
                    buttonType={Button.TYPES.Back}
                    onClick={() => history.push('/student/list')}
                />
                <Button
                    type="submit"
                    form="student"
                    text="Salvar"
                    buttonType={Button.TYPES.Save}
                />
            </ContentHeader>
            <ContentWrapper>
                {loading ? (
                    <Spinner />
                ) : (
                    <UnForm
                        id="student"
                        schema={schema}
                        initialData={student}
                        onSubmit={handleSave}
                    >
                        <label htmlFor="name">Nome</label>
                        <Input id="name" name="name" />
                        <label htmlFor="email">Email</label>
                        <Input id="email" name="email" type="email" />
                        <div>
                            <InputContainer>
                                <label htmlFor="age">Idade</label>
                                <Input id="age" name="age" />
                            </InputContainer>
                            <InputContainer>
                                <label htmlFor="weight">Peso</label>
                                <InputMask
                                    id="weight"
                                    name="weight"
                                    suffix=" kg"
                                    decimalScale={1}
                                />
                            </InputContainer>
                            <InputContainer>
                                <label htmlFor="height">altura</label>
                                <InputMask
                                    id="height"
                                    name="height"
                                    suffix=" cm"
                                    decimalScale={0}
                                />
                            </InputContainer>
                        </div>
                    </UnForm>
                )}
            </ContentWrapper>
        </Container>
    );
}
