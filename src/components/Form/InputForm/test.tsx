import { render } from "@testing-library/react-native";
import React from "react";
import { InputForm } from ".";

describe("InputForm", () => {
  it("Should render with placeholder (placeholder prop)", () => {
    const { getByPlaceholderText } = render(
      <InputForm control={{}} name="name" placeholder="Nome" />
    );
    const inputForm = getByPlaceholderText("Nome");

    expect(inputForm.props.placeholder).toBe("Nome");
  });
});
