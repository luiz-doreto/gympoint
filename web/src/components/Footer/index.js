import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { PAGE_SIZE } from '~/util/constants';

import { Container } from './styles';

export default function Footer({ page, count, onNext, onPrev }) {
    return (
        <Container>
            <button type="button" disabled={page === 1} onClick={onPrev}>
                <MdKeyboardArrowLeft size={40} color="#fff" />
            </button>
            <strong>{page}</strong>
            <button
                type="button"
                disabled={page * PAGE_SIZE >= count}
                onClick={onNext}
            >
                <MdKeyboardArrowRight size={40} color="#fff" />
            </button>
        </Container>
    );
}

Footer.propTypes = {
    page: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
};
