import React from 'react';
import PropTypes from 'prop-types';

import Action from './Action';
import { Container } from './styles';

function Table({ children }) {
    return <Container>{children}</Container>;
}

Table.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
        .isRequired,
};

Table.Action = Action;

export default Table;
