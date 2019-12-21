import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parseISO, addMonths } from 'date-fns';
import { toast } from 'react-toastify';
import { Form as UnForm } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
    ContentHeader,
    ContentWrapper,
    Button,
    Select,
    AsyncSelect,
    DatePicker,
    Spinner,
} from '~/components';
import { Container, InputGridContainer, InputContainer } from './styles';
import { formatPrice, formatDateSimple } from '~/util/format';
import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
    student_id: Yup.number()
        .typeError('Campo obrigatório')
        .required('Campo obrigatório'),
    plan_id: Yup.number()
        .typeError('Campo obrigatório')
        .required('Campo obrigatório'),
    start_date: Yup.date()
        .typeError('Formato inválido')
        .required('Campo obrigatório'),
});

export default function Form() {
    const { register_id } = useParams();
    const [register, setRegister] = useState(null);
    const [plans, setPlans] = useState(null);
    const [endDate, setEndDate] = useState('');
    const [totalValue, setTotalValue] = useState(formatPrice(0));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPlans() {
            const response = await api.get('plans');

            const data = response.data.rows.map(p => ({
                ...p,
                id: p.id,
                title: p.title,
            }));

            setPlans(data);
        }

        loadPlans();
    }, []);

    useEffect(() => {
        async function loadRegister() {
            if (register_id) {
                const response = await api.get(`registrations/${register_id}`);
                const { data } = response;

                setRegister({
                    ...data,
                    student: formatStudent(data.student),
                    start_date: parseISO(data.start_date),
                    end_date: formatDateSimple(parseISO(data.end_date)),
                    price: formatPrice(data.price),
                });
            } else {
                setRegister({});
            }
            setLoading(false);
        }

        loadRegister();
    }, [register_id]);

    useEffect(() => {
        if (register && plans) {
            const { start_date, plan_id } = register;
            const plan = plans.find(p => p.id === plan_id);

            if (plan) {
                setTotalValue(formatPrice(plan.total_price));

                if (start_date) {
                    setEndDate(
                        formatDateSimple(addMonths(start_date, plan.duration))
                    );
                }
            }
        }
    }, [register, plans]); //eslint-disable-line

    function formatStudent(student) {
        return {
            ...student,
            title: student.name,
        };
    }

    async function fetchStudents(filter) {
        const response = await api.get(`/students?filter=${filter}`);

        const data = response.data.rows.map(std => formatStudent(std));

        return data;
    }

    function handleChange(field, value) {
        setRegister({ ...register, [field]: value });
    }

    async function handleSave(data) {
        try {
            if (register_id) {
                await api.put(`registrations/${register_id}`, data);
                toast.success('Matrícula atualizada com sucesso!');
            } else {
                await api.post('registrations', data);
                toast.success('Matrícula realizada com sucesso!');
            }
        } catch (error) {
            toast.error('Falha ao matricular aluno');
        }

        history.push('/register/list');
    }

    return (
        <Container>
            <ContentHeader
                title={
                    register_id
                        ? 'Edição de matrícula'
                        : 'Cadastro de matrícula'
                }
            >
                <Button
                    text="Voltar"
                    buttonType={Button.TYPES.Back}
                    onClick={() => history.push('/register/list')}
                />
                <Button
                    type="submit"
                    form="register"
                    text="Salvar"
                    buttonType={Button.TYPES.Save}
                />
            </ContentHeader>

            <ContentWrapper>
                {loading ? (
                    <Spinner />
                ) : (
                    register &&
                    plans && (
                        <UnForm
                            id="register"
                            schema={schema}
                            initialData={register}
                            onSubmit={handleSave}
                        >
                            <label htmlFor="student">Aluno</label>
                            <AsyncSelect
                                id="student"
                                name="student"
                                loadOptions={fetchStudents}
                            />
                            <InputGridContainer>
                                <InputContainer>
                                    <label htmlFor="plan">Plano</label>
                                    <Select
                                        id="plan"
                                        name="plan_id"
                                        options={plans}
                                        onChange={p =>
                                            handleChange('plan_id', p.id)
                                        }
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <label htmlFor="start_date">
                                        Data de início
                                    </label>
                                    <DatePicker
                                        id="start_date"
                                        name="start_date"
                                        onChange={date =>
                                            handleChange('start_date', date)
                                        }
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <label htmlFor="end_date">
                                        Data de término
                                    </label>
                                    <input
                                        id="end_date"
                                        value={endDate}
                                        disabled
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <label htmlFor="price">Valor Total</label>
                                    <input
                                        id="price"
                                        value={totalValue}
                                        disabled
                                    />
                                </InputContainer>
                            </InputGridContainer>
                        </UnForm>
                    )
                )}
            </ContentWrapper>
        </Container>
    );
}
