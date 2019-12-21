import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TextArea, SubmitButton } from './styles';
import api from '~/services/api';

export default function HelpOrderNew({ navigation }) {
    const studentId = useSelector(state => state.auth.studentId);
    const [question, setQuestion] = useState('');

    async function handleSubmit() {
        if (!question) {
            Alert.alert('Falha ao enviar', 'Pergunta obrigatória');
            return;
        }

        try {
            await api.post(`students/${studentId}/help-orders`, { question });
            navigation.navigate('HelpOrderList');
        } catch (error) {
            Alert.alert(
                'Falha ao enviar',
                'Erro ao enviar pergunta. Por favor, tente novamente mais tarde.'
            );
        }
    }

    return (
        <Container>
            <TextArea
                multiline
                numberOfLines={10}
                placeholder="Inclua seu pedido de auxílio"
                value={question}
                onChangeText={setQuestion}
            />
            <SubmitButton onPress={handleSubmit}>Enviar pedido</SubmitButton>
        </Container>
    );
}

HelpOrderNew.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};

HelpOrderNew.navigationOptions = ({ navigation }) => ({
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={30} color="#ee4e62" />
        </TouchableOpacity>
    ),
});
