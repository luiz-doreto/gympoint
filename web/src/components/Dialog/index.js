import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        maxWidth: 500,
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export default function Dialog({ visible, children }) {
    return (
        <Modal isOpen={visible} style={customStyles}>
            {children}
        </Modal>
    );
}
