import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PAGE_SIZE } from '~/util/constants';

import {
    ContentWrapper,
    ContentHeader,
    Button,
    Table,
    EmptyState,
    Spinner,
    Footer,
} from '~/components';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

const { ActionType } = Table.Action;

export default function List() {
    const [filter, setFilter] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        async function loadStudents() {
            await fetchStudents();
        }

        loadStudents();
    }, []);

    useEffect(() => {
        async function filterStudents() {
            await fetchStudents({ filter, page: 1 });
        }

        filterStudents();
    }, [filter]);

    useEffect(() => {
        async function fetchPage() {
            await fetchStudents({ filter, page });
        }

        fetchPage();
    }, [page]); //eslint-disable-line

    async function fetchStudents(params = {}) {
        setLoading(true);

        const { data } = await api.get('students', {
            params: {
                ...params,
                pageSize: PAGE_SIZE,
            },
        });

        setStudents(data.rows);
        setCount(data.count);
        setLoading(false);
    }

    async function handleRemove(id) {
        setLoading(true);
        try {
            await api.delete(`/students/${id}`);
            toast.success('Aluno removido com sucesso');
        } catch (error) {
            toast.error('Falha ao remover aluno');
        }

        await fetchStudents();
    }

    return (
        <Container>
            <ContentHeader title="Gerenciando alunos">
                <Button
                    text="Cadastrar"
                    buttonType={Button.TYPES.Register}
                    onClick={() => history.push('/student/form')}
                />
                <input
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    placeholder="Buscar aluno"
                />
            </ContentHeader>
            <ContentWrapper>
                {loading ? (
                    <Spinner />
                ) : students.length > 0 ? (
                    <>
                        <Table>
                            <thead>
                                <tr>
                                    <th width="40%">Nome</th>
                                    <th>Email</th>
                                    <th>Idade</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.age}</td>
                                        <td>
                                            <Table.Action
                                                type={ActionType.edit}
                                                color="#4D85EE"
                                                onClick={() =>
                                                    history.push(
                                                        `/student/form/${student.id}`
                                                    )
                                                }
                                            />
                                            <Table.Action
                                                type={ActionType.delete}
                                                color="#DE3B3B"
                                                onClick={() =>
                                                    handleRemove(student.id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Footer
                            onPrev={() => setPage(page - 1)}
                            onNext={() => setPage(page + 1)}
                            page={page}
                            count={count}
                        />
                    </>
                ) : (
                    <EmptyState text="Não existem alunos cadastrados" />
                )}
            </ContentWrapper>
        </Container>
    );
}
