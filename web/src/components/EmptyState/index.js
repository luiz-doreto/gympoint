import React from 'react';
import PropTypes from 'prop-types';
import { MdErrorOutline } from 'react-icons/md';

import { Container } from './styles';

export default function EmptyState({ text }) {
    return (
        <Container>
            <MdErrorOutline size={0} />
            <strong>{text}</strong>
        </Container>
    );
}

EmptyState.propTypes = {
    text: PropTypes.string.isRequired,
};
