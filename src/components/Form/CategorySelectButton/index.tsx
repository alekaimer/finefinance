import React from "react";
import { Container, Category, Icon } from "./styles";

interface Props {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, ...props }: Props) {
  return (
    <Container {...props}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
