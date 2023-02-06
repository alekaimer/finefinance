import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton, GestureHandlerRootView } from "react-native-gesture-handler";

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.primary};

  padding-bottom: 18px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Form = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;

  padding: 24px;
`;

export const Fields = styled.View``;

export const TransactionsTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const MonthSelector = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
`;

export const MonthSelectorButton = styled(BorderlessButton)`
  padding: 0 16px;
`;

export const MonthSelectorIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// export const ChartContainer = styled.View`
//   width: 100%;
//   align-items: center;
// `;

// export const Content = styled.ScrollView.attrs({
//   contentContainerStyle: { flex: 1 },
//   showsVerticalScrollIndicator: false,
// })``;
