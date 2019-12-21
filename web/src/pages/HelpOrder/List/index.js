import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { PAGE_SIZE } from '~/util/constants';

import {
    ContentWrapper,
    ContentHeader,
    Table,
    EmptyState,
    Spinner,
    Footer,
} from '~/components';
import AnswerDialog from '../AnswerDialog';
import { Container } from './styles';
import api from '~/services/api';

const { ActionType } = Table.Action;

export default function List() {
    const [helpOrders, setHelpOrders] = useState([]);
    const [helpOrder, setHelpOrder] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        async function loadHelpOrders() {
            await fetchHelpOrders();
        }

        loadHelpOrders();
    }, []);

    useEffect(() => {
        async function loadHelpOrders() {
            await fetchHelpOrders({ page });
        }

        loadHelpOrders();
    }, [page]);

    async function fetchHelpOrders(params = {}) {
        setLoading(true);

        const { data } = await api.get('help-orders', {
            params: {
                ...params,
                pageSize: PAGE_SIZE,
            },
        });

        setHelpOrders(data.rows);
        setCount(data.count);
        setLoading(false);
    }

    function handleClick(id) {
        const HO = helpOrders.find(ho => ho.id === id);
        setHelpOrder(HO);
        setShowDialog(true);
    }

    function handleClose() {
        setShowDialog(false);
    }

    async function handleAnswer(answer) {
        try {
            await api.put(`/help-orders/${helpOrder.id}/answer`, { answer });
            toast.success('Aluno respondido com sucesso!');
        } catch (error) {
            toast.error('Falha ao responder aluno!');
        }

        await fetchHelpOrders();
        setShowDialog(false);
    }

    return (
        <Container>
            <ContentHeader title="Pedidos de auxílio" />
            <ContentWrapper>
                {loading ? (
                    <Spinner />
                ) : helpOrders.length > 0 ? (
                    <>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Aluno</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {helpOrders.map(ho => (
                                    <tr key={ho.id}>
                                        <td>{ho.student.name}</td>
                                        <td>
                                            <Table.Action
                                                type={ActionType.answer}
                                                color="#4D85EE"
                                                onClick={() =>
                                                    handleClick(ho.id)
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
                    <EmptyState text="Não existem dúvidas cadastradas" />
                )}
            </ContentWrapper>
            <AnswerDialog
                visible={showDialog}
                data={helpOrder}
                onClose={handleClose}
                onAnswer={handleAnswer}
            />
        </Container>
    );
}
