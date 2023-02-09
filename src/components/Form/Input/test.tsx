import React from "react";
import { render } from "@testing-library/react-native";

import { Input } from "./";
import { ThemeProvider } from "styled-components/native";
import theme from "../../../global/styles/theme";

function Provider({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe("Input Component", () => {
  it("Should have specific style when active", () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        placeholder="E-mail"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        active={true}
      />,
      {
        wrapper: Provider,
      }
    );

    const inputEmail = getByTestId("input-email");

    expect(inputEmail.props.style[0].borderColor).toBe(theme.colors.text);
    expect(inputEmail.props.style[0].borderWidth).toBe(1.5);
  });
});
