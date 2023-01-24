import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
}

export function Button({title, ...props}: Props) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}