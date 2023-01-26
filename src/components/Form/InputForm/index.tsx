import React from "react";
import { Input } from "../Input";
import { Container, Error } from "./styles";

import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
}

export function InputForm({ control, name, error, ...props }: Props) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...props} />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}