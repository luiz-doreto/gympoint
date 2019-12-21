import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Header from '~/components/Header';
import {
    Container,
    Content,
    CheckinButton,
    CheckinList,
    CheckinItem,
    CheckinNumber,
    CheckinDate,
} from './styles';
import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';

export default function CheckIn() {
    const studentId = useSelector(state => state.auth.studentId);
    const dispatch = useDispatch();

    const [checkins, setCheckins] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadCheckins(id) {
        setLoading(true);
        const response = await api.get(`students/${id}/checkins`);

        const data = response.data.map(ck => ({
            ...ck,
            timeFromNow: formatRelative(parseISO(ck.createdAt), new Date(), {
                locale: pt,
            }),
        }));

        setCheckins(data);
        setLoading(false);
    }

    useEffect(() => {
        loadCheckins(studentId);
    }, [studentId]);

    async function handleCheckin() {
        try {
            await api.post(`students/${studentId}/checkins`);
            loadCheckins();
            Alert.alert('Sucesso', 'Check-in realizado com sucesso!');
        } catch (error) {
            console.tron.log(error);
            Alert.alert(
                'Falha ao realizar check-in',
                'Você já treinou 5 vezes essa semana.'
            );
        }
    }

    function handleLogout() {
        dispatch(signOut());
    }

    return (
        <Container>
            <Header onLogout={handleLogout} />
            <Content>
                <CheckinButton onPress={handleCheckin}>
                    Novo check-in
                </CheckinButton>
                {loading ? (
                    <ActivityIndicator size="large" color="#999" />
                ) : (
                    <CheckinList
                        inverted
                        data={checkins}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => (
                            <CheckinItem>
                                <CheckinNumber>
                                    Check-in #{index + 1}
                                </CheckinNumber>
                                <CheckinDate>{item.timeFromNow}</CheckinDate>
                            </CheckinItem>
                        )}
                    />
                )}
            </Content>
        </Container>
    );
}

CheckIn.navigationOptions = {
    tabBarLabel: 'Check-ins',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="edit-location" size={20} color={tintColor} />
    ),
};
