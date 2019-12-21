import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-bottom-width: 1px;
    border-bottom-color: #e3e3e3;
`;

export const LeftContainer = styled.View`
    width: 60px;
`;

export const LogoContainer = styled.View`
    flex: 1;
    align-items: center;
`;

export const Logo = styled.Image`
    margin: 13px 0;
`;

export const RightContainer = styled.TouchableOpacity`
    margin: 13px 0;
    width: 60px;
    margin-right: 0;
`;

export const Logout = styled.Text`
    font-size: 16px;
    color: #ee4e62;
`;
