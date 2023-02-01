import styled, { css } from "styled-components/native";

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface IconsProps {
  type: "income" | "outcome";
}

interface ContainerProps {
  isActive: boolean;
  type: "income" | "outcome";
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1.5px solid ${({ theme }) => theme.colors.text};

  border-radius: 5px;
  padding: 16px 12px;

  ${({ isActive, type, theme }) =>
    isActive &&
    type === "income" &&
    css`
      background-color: ${theme.colors.success_light};
      border: none;
    `}
  ${({ isActive, type, theme }) =>
    isActive &&
    type === "outcome" &&
    css`
      background-color: ${theme.colors.attention_light};
      border: none;
    `}
`;

export const Icon = styled(Feather)<IconsProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === "income" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;
`;
