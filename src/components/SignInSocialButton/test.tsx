import { render } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { SignInSocialButton } from ".";
import theme from "../../global/styles/theme";

function Provider({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe("SignInSocialButton", () => {
  it("Should be to render a button to social sign-in", () => {
    const { getByTestId } = render(
      <SignInSocialButton
        testID="sign-in-social-button"
        title="Entrar com login social"
        svg={() => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
        )}
      />,
      { wrapper: Provider }
    );

    const button = getByTestId("sign-in-social-button");

    expect(button).toBeTruthy();
  });

  it("Should render with required title property", () => {
    const { getByText } = render(
      <SignInSocialButton
        title="Entrar com login social"
        svg={() => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
        )}
      />,
      { wrapper: Provider }
    );

    const buttonText = getByText("Entrar com login social");

    expect(buttonText).toBeTruthy();
  });

  it("Should render with required svg property", () => {
    const { getByTestId, debug, getByRole } = render(
      <SignInSocialButton
        testID="sign-in-social-button"
        title="Entrar com login social"
        svg={() => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
        )}
      />,
      { wrapper: Provider }
    );

    const element = getByTestId("sign-in-social-button");
    
    expect(element.children[1].children[0].props.children.type().type).toBe("svg");
  });
});
