import React from "react";
import { ViewProps } from "react-native";
import {
  Container,
  Header,
  Title,
  Amount,
  LastTransaction,
  Footer,
  Icon,
} from "./styles";

export interface HighlightCardProps extends ViewProps {
  type: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction,
  ...props
}: HighlightCardProps) {
  return (
    <Container type={type} {...props}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
