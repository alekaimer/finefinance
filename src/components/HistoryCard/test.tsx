import { render } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { HistoryCard } from ".";
import theme from "../../global/styles/theme";

function Provider({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe("HistoryCard", () => {
  it("Should be able to render a card", () => {
    const { getByTestId } = render(
      <HistoryCard
        testID="card"
        amount="R$ 100,00"
        color="red"
        title="Title to test"
      />,
      {
        wrapper: Provider,
      }
    );

    const card = getByTestId("card");

    expect(card).toBeTruthy();
  });

  it("Should to render with required title prop", () => {
    const { getByText } = render(
      <HistoryCard amount="R$ 100,00" color="red" title="Title to test" />,
      {
        wrapper: Provider,
      }
    );

    const cardText = getByText("Title to test");

    expect(cardText).toBeTruthy();
  });

  it("Should to render with required amount prop", () => {
    const { getByText } = render(
      <HistoryCard amount="R$ 100,00" color="red" title="Title to test" />,
      {
        wrapper: Provider,
      }
    );

    const cardText = getByText("R$ 100,00");

    expect(cardText).toBeTruthy();
  });

  it("Should to render with required color prop", () => {
    const { getByTestId } = render(
      <HistoryCard
        testID="card"
        amount="R$ 100,00"
        color="red"
        title="Title to test"
      />,
      {
        wrapper: Provider,
      }
    );

    const card = getByTestId("card");

    expect(card.props.style[0].borderLeftColor).toBe("red");
  });
});
