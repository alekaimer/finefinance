import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "../../global/styles/theme";

import { Register } from ".";

import { NavigationContainer } from "@react-navigation/native";

function Provider({ children }: any) {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </NavigationContainer>
  );
}

describe("Register Screen", () => {
  it("Should be able to render", () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Provider,
    });

    const registerScreen = getByTestId("register-screen");

    expect(registerScreen).toBeTruthy();
  });

  it("Should be open category modal when user click on button", () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Provider,
    });

    const categoryModal = getByTestId("modal-category");
    const categorySelectButton = getByTestId("button-category");

    fireEvent.press(categorySelectButton);

    expect(categoryModal.props.visible).toBeTruthy();
  });
});
