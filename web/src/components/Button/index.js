import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdDone, MdChevronLeft } from 'react-icons/md';

import { Container } from './styles';
import ButtonTypes from './constants';

function Button({ form, type, onClick, text, buttonType }) {
    function renderIcon() {
        switch (buttonType) {
            case ButtonTypes.Register:
                return <MdAdd size={20} color="#fff" />;
            case ButtonTypes.Save:
                return <MdDone size={20} color="#fff" />;
            case ButtonTypes.Back:
                return <MdChevronLeft size={20} color="#fff" />;
            default:
                return null;
        }
    }

    return (
        <Container
            form={form}
            type={type}
            onClick={onClick}
            buttonType={buttonType}
        >
            <div>
                {buttonType && <div>{renderIcon()}</div>}
                <strong>{text}</strong>
            </div>
        </Container>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    buttonType: PropTypes.string,
    form: PropTypes.string,
};

Button.defaultProps = {
    onClick: undefined,
    type: 'button',
    buttonType: null,
    form: null,
};

Button.TYPES = ButtonTypes;

export default Button;
