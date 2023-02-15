import React from "react";
import { ViewProps } from "react-native";
import { Container, Title, Amount } from "./styles";

interface HistoryCardProps extends ViewProps {
  title: string;
  amount: string;
  color: string;
}

export function HistoryCard({
  title,
  amount,
  color,
  ...props
}: HistoryCardProps) {
  return (
    <Container color={color} {...props}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
