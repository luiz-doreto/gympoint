import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
    enabled: Platform.OS === 'ios',
    behavior: 'padding',
})`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
`;

export const TextInput = styled(Input)`
    margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
    margin-top: 20px;
    align-self: stretch;
`;
