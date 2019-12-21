import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
    flex: 1;
    background: #f2f2f2;
`;

export const Content = styled.View`
    padding: 20px;
`;

export const CheckinButton = styled(Button)`
    align-self: stretch;
    margin-bottom: 20px;
`;

export const CheckinList = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})``;

export const CheckinItem = styled.View`
    background: #fff;
    padding: 20px;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const CheckinNumber = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #444;
`;

export const CheckinDate = styled.Text`
    font-size: 14px;
    color: #666;
`;
