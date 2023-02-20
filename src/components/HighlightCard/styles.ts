import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { HighlightCardProps } from ".";

export const Container = styled.View<Pick<HighlightCardProps, "type">>` 
  width: ${RFValue(300)}px;
  justify-content: space-between;
  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.secondary : theme.colors.shape};
  border-radius: 5px;

  padding: 18px;
  padding-bottom: ${RFValue(24)}px;
  margin-right: 16px;

  /* shadow */
  /* shadow-color: ${({ theme }) => theme.colors.text};
  shadow-offset: 0px 3px;
  shadow-opacity: 0.2;
  shadow-radius: 4.65px;
  elevation: 8; */
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<Pick<HighlightCardProps, "type">>`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<Pick<HighlightCardProps, "type">>`
  font-size: ${RFValue(40)}px;

  ${({ type }) =>
    type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}

  ${({ type }) =>
    type === "down" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}  

  ${({ type }) =>
    type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Footer = styled.View`
  /* margin-top: ${RFValue(38)}px; */
`;

export const Amount = styled.Text<Pick<HighlightCardProps, "type">>`
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;

export const LastTransaction = styled.Text<Pick<HighlightCardProps, "type">>`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text};
`;
