import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import { Button } from ".";
import { ThemeProvider } from "styled-components/native";
import theme from "../../../global/styles/theme";

function Provider({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe("Button Component", () => {
  it("Should to render a button with title prop", () => {
    const { getByText } = render(
      <Button testID="button-enter" title="Entrar" />,
      {
        wrapper: Provider,
      }
    );

    const buttonText = getByText("Entrar");

    expect(buttonText).toBeTruthy();
  });

  it("Should to render a button with correctly theme", () => {
    const { getByTestId } = render(
      <Button testID="button-enter" title="Enter" />,
      {
        wrapper: Provider,
      }
    );

    const button = getByTestId("button-enter");
    const buttonText = getByTestId("button-enter-title");

    expect(button.props.style.backgroundColor).toBe(theme.colors.secondary);
    expect(buttonText.props.style[0].color).toBe(theme.colors.shape);
    expect(buttonText.props.style[0].fontFamily).toBe(theme.fonts.medium);
  });
});
