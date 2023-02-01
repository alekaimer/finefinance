import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Icon, Title } from "./styles";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

interface Props extends TouchableOpacityProps {
  type: "income" | "outcome";
  title: string;
  isActive: boolean;
}

export function TransactionTypeButton({ type, title, ...props }: Props) {
  return (
    <Container type={type} {...props}>
      <Icon name={icons[type === "income" ? "up" : "down"]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}

export default TransactionTypeButton;
