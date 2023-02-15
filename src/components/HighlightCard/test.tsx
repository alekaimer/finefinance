import { render } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { HighlightCard } from ".";
import theme from "../../global/styles/theme";

function Provider({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe("HighlightCard", () => {
  it("Should be able to render", () => {
    const { getByTestId } = render(
      <HighlightCard
        testID={"highlight-up"}
        type={"up"}
        title={"Income"}
        amount={"R$ 100,00"}
        lastTransaction={"April 13, 23"}
      />,
      {
        wrapper: Provider,
      }
    );

    const highlightCard = getByTestId("highlight-up");

    expect(highlightCard).toBeTruthy();
  });

  it("Should to render correctly with type prop", () => {
    const { getByTestId } = render(
      <HighlightCard
        testID={"highlight-up"}
        type={"up"}
        title={"Income"}
        amount={"R$ 100,00"}
        lastTransaction={"April 13, 23"}
      />,
      {
        wrapper: Provider,
      }
    );

    const highlightCard = getByTestId("highlight-up");

    expect(highlightCard.props.type).toBe("up");
  });

  it("Should to render correctly with title prop", () => {
    const { getByText } = render(
      <HighlightCard
        testID={"highlight-up"}
        type={"up"}
        title={"Income"}
        amount={"R$ 100,00"}
        lastTransaction={"April 13, 23"}
      />,
      {
        wrapper: Provider,
      }
    );

    const highlightCard = getByText("Income");

    expect(highlightCard).toBeTruthy();
  });

  it("Should to render correctly with amount prop", () => {
    const { getByText } = render(
      <HighlightCard
        testID={"highlight-up"}
        type={"up"}
        title={"Income"}
        amount={"R$ 100,00"}
        lastTransaction={"April 13, 23"}
      />,
      {
        wrapper: Provider,
      }
    );

    const highlightCard = getByText("R$ 100,00");

    expect(highlightCard).toBeTruthy();
  });

  it("Should to render correctly with lastTransaction prop", () => {
    const { getByText } = render(
      <HighlightCard
        testID={"highlight-up"}
        type={"up"}
        title={"Income"}
        amount={"R$ 100,00"}
        lastTransaction={"April 13, 23"}
      />,
      {
        wrapper: Provider,
      }
    );

    const highlightCard = getByText("April 13, 23");

    expect(highlightCard).toBeTruthy();
  });

  //TODO: Testar tema do componente (background, texts and icon color) de acordo com a propriedade type
});
