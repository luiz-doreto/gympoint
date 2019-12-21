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
import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

const { ActionType } = Table.Action;

export default function List() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        async function loadPlans() {
            await fetchPlans();
        }

        loadPlans();
    }, []);

    useEffect(() => {
        async function fetchPage() {
            await fetchPlans({ page });
        }

        fetchPage();
    }, [page]);

    async function fetchPlans(params = {}) {
        setLoading(true);

        const { data } = await api.get('plans', {
            params: {
                ...params,
                pageSize: PAGE_SIZE,
            },
        });

        const dataPlans = data.rows.map(plan => ({
            ...plan,
            formattedDuration:
                plan.duration === 1
                    ? `${plan.duration} mês`
                    : `${plan.duration} meses`,
            formattedPrice: formatPrice(plan.price),
        }));

        setPlans(dataPlans);
        setCount(data.count);
        setLoading(false);
    }

    async function handleRemove(id) {
        setLoading(true);
        try {
            await api.delete(`/plans/${id}`);
            toast.success('Plano removido com sucesso');
        } catch (error) {
            toast.error('Falha ao remover plano');
        }

        await fetchPlans();
    }

    return (
        <Container>
            <ContentHeader title="Gerenciando planos">
                <Button
                    text="Cadastrar"
                    buttonType={Button.TYPES.Register}
                    onClick={() => history.push('/plan/form')}
                />
            </ContentHeader>
            <ContentWrapper>
                {loading ? (
                    <Spinner />
                ) : plans.length > 0 ? (
                    <>
                        <Table>
                            <thead>
                                <tr>
                                    <th width="40%">Título</th>
                                    <th>Duração</th>
                                    <th>Valor/mês</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {plans.map(plan => (
                                    <tr key={plan.id}>
                                        <td>{plan.title}</td>
                                        <td>{plan.formattedDuration}</td>
                                        <td>{plan.formattedPrice}</td>
                                        <td>
                                            <Table.Action
                                                type={ActionType.edit}
                                                color="#4D85EE"
                                                onClick={() =>
                                                    history.push(
                                                        `/plan/form/${plan.id}`
                                                    )
                                                }
                                            />
                                            <Table.Action
                                                type={ActionType.delete}
                                                color="#DE3B3B"
                                                onClick={() =>
                                                    handleRemove(plan.id)
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
                    <EmptyState text="Não existem planos cadastrados" />
                )}
            </ContentWrapper>
        </Container>
    );
}
