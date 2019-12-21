import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    background: #f2f2f2;
`;

export const HelpOrderCard = styled.View`
    background: #fff;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    padding: 20px;
`;

export const AnswerContainer = styled.View`
    margin-top: 20px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #444;
`;

export const Time = styled.Text`
    color: #666;
`;

export const Content = styled.Text`
    margin-top: 10px;
    line-height: 25;
    color: #666;
`;
