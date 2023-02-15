import React from "react";
import { Container, Category, Icon } from "./styles";

interface Props {
  title: string;
  onPress?: () => void;
  testID?: string;
}

export function CategorySelectButton({ title, testID, ...props }: Props) {
  return (
    <Container testID={testID} {...props}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
