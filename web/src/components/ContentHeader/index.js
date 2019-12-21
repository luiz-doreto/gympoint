import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ContentHeader({ title, children }) {
    return (
        <Container>
            <strong>{title}</strong>
            <div>{children}</div>
        </Container>
    );
}

ContentHeader.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

ContentHeader.defaultProps = {
    children: null,
};
