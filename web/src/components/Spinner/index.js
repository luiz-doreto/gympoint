import React from 'react';

import { Container, SpinnerIcon } from './styles';

export default function Spinner() {
    return (
        <Container>
            <SpinnerIcon size={30} color="#999" />
        </Container>
    );
}
