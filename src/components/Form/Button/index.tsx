import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
}

export function Button({testID, title, ...props}: Props) {
  return (
    <Container testID={testID} {...props}>
      <Title testID={testID+'-title'}>{title}</Title>
    </Container>
  );
}