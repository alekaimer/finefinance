import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { InputProps } from '.';

export const Container = styled.TextInput<InputProps>`
  width: 100%;
  padding: 16px 18px;
  
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(20)}px;
  
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text_dark};
  border-radius: 5px;
  margin-bottom: 8px;

  ${({ active, theme }) => active && css`
    border-width: ${1.5}px;
    border-color: ${theme.colors.text};
  `}
`;