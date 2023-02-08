import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;

  align-items: center;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;
  line-height: ${RFValue(40)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.shape};

  margin-top: 45px;
`;

export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};
  line-height: ${RFValue(25)}px;
  text-align: center;

  margin-top: 80px;
  margin-bottom: 67px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;
  background-color: ${({ theme }) => theme.colors.secondary};

  padding: 0 32px;
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFValue(-20)}px;
`;
