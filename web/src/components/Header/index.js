import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo-header.svg';
import { signOut } from '~/store/modules/auth/actions';
import { Container } from './styles';

export default function Header() {
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(signOut());
    }

    return (
        <Container>
            <nav>
                <img src={logo} alt="GymPoint" />

                <Link to="/student/list">Alunos</Link>
                <Link to="/plan/list">Planos</Link>
                <Link to="/register/list">Matrículas</Link>
                <Link to="/help-order/list">Pedidos de auxílio</Link>
            </nav>

            <aside>
                <strong>Administrador do sistema</strong>
                <button type="button" onClick={handleLogout}>
                    logout
                </button>
            </aside>
        </Container>
    );
}
