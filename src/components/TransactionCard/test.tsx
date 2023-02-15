import { render } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { TransactionCard } from ".";
import theme from "../../global/styles/theme";

function Provider({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe("TransactionCard", () => {
  it("Should render with negative values (type prop)", () => {
    const { getByTestId } = render(
      <TransactionCard
        testID="transaction-card"
        data={{
          type: "outcome",
          name: "Salário",
          amount: "R$ 20.000,00",
          category: "salary",
          date: "13/04/2020",
        }}
      />,
      { wrapper: Provider }
    );
    const transactionCard = getByTestId("transaction-card");

    expect(transactionCard.children[1].props.type).toBe("outcome");
  });
});
