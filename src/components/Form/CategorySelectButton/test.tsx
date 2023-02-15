import { render } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { CategorySelectButton } from ".";
import theme from "../../../global/styles/theme";

function Provider({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe("CategorySelectButton", () => {
  it("Should be able to render with a required prop title", () => {
    const { getByText } = render(
      <CategorySelectButton onPress={() => {}} title="Categoria A" />,
      {
        wrapper: Provider,
      }
    );
    const categorySelectButton = getByText("Categoria A");

    expect(categorySelectButton).toBeTruthy();
  });
});
