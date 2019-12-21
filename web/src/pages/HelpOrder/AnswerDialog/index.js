import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import { Dialog, Button } from '~/components';
import { Container, Header } from './styles';

export default function AnswerDialog({ visible, data, onClose, onAnswer }) {
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    function handleAnswer() {
        if (!answer) {
            setError('Campo obrigatório');
            return;
        }

        if (onAnswer) {
            onAnswer.call(null, answer);
        }
    }

    function handleClose() {
        setError('');
        setAnswer('');

        if (onClose) {
            onClose.call(null);
        }
    }

    return (
        <Dialog visible={visible}>
            <Container>
                <Header>
                    <h3>PERGUNTA DO ALUNO</h3>
                    <button type="button" onClick={handleClose}>
                        <MdClose size={25} color="#999" />
                    </button>
                </Header>
                <p>{data.question}</p>
                <h3>SUA RESPOSTA</h3>
                <textarea
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                />
                {error && <span>{error}</span>}
                <Button text="Responder aluno" onClick={handleAnswer} />
            </Container>
        </Dialog>
    );
}

AnswerDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    data: PropTypes.shape({
        question: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onAnswer: PropTypes.func.isRequired,
};
