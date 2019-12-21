import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SignInLayout({ children }) {
    return <Container>{children}</Container>;
}

SignInLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
