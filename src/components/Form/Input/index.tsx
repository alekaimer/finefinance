import React from "react";
import { TextInputProps } from "react-native";
import { Container } from "./styles";

export type InputProps = TextInputProps & {
  active?: boolean;
};

export function Input({ active = false, ...props }: InputProps) {
  return <Container active={active} {...props} />;
}
