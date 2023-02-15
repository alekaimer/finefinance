import { render } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import TransactionTypeButton from ".";
import theme from "../../../global/styles/theme";

function Provider({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe("TransactionTypeButton", () => {
  it("Should be able to render an active button", () => {
    const { getByTestId } = render(
      <TransactionTypeButton
        testID="button"
        title="Income"
        type="income"
        isActive
      />,
      {
        wrapper: Provider,
      }
    );

    const button = getByTestId("button");

    expect(button.props.style.borderWidth).toBe(0);
  });

  it("Should be able to render an inactive button", () => {
    const { getByTestId } = render(
      <TransactionTypeButton
        testID="button"
        title="Income"
        type="income"
        isActive={false}
      />,
      {
        wrapper: Provider,
      }
    );

    const button = getByTestId("button");

    expect(button.props.style.borderWidth).not.toBe(0);
  });

  it("Should to render with a title prop", () => {
    const { getByText } = render(
      <TransactionTypeButton title="Income" type="income" isActive />,
      {
        wrapper: Provider,
      }
    );

    const buttonText = getByText("Income");
    
    expect(buttonText).toBeTruthy();
  });
});
