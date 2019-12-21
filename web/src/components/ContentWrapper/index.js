import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ContentWrapper({ children }) {
    return <Container>{children}</Container>;
}

ContentWrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

ContentWrapper.defaultProps = {
    children: null,
};
