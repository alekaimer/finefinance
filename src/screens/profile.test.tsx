import React from "react";
import { render } from "@testing-library/react-native";
import { Profile } from "./Profile";

describe("Profile Screen", () => {
  // it("Should render Profile screen", () => {
  //   const { debug } = render(<Profile />);
  //   debug();
  // });

  it("Should renders a title Profile", () => {
    const { getByTestId } = render(<Profile />);

    const title = getByTestId("title");

    expect(title.props.children).toContain("Profile");
  });

  it("Should renders 2 inputs", () => {
    const { getAllByTestId } = render(<Profile />);

    const inputs = getAllByTestId(/input/i);

    expect(inputs.length).toBe(2);
  });

  it("Should renders a input text with placeholder Nome", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName).toBeTruthy();
  });

  it("Should renders a input text with placeholder Sobrenome", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Sobrenome");

    expect(inputName).toBeTruthy();
  });

  it("Should find the button via testID", () => {
    const { getByTestId } = render(<Profile />);

    const button = getByTestId("button");

    expect(button).toBeTruthy();
  });

  //TODO: Testar se botão tem acessibilidade
  // it("Should find the button via accessibility", () => {
  //   const { getByAccessibilityState } = render(<Profile />);

  //   const button = getByAccessibilityState({ label: "Salvari" });

  //   console.log(button.props);
  //   // expect(button).toBeTruthy();
  // });
  
  it("Should renders a button with title Salvar", () => {
    const { getByText } = render(<Profile />);

    const button = getByText("Salvar");

    expect(button).toBeTruthy();
  });

  //TODO: Testar se botão tem onClick
  // it("Should renders a button with title Salvar and onPress", () => {
  //   const { getByText } = render(<Profile />);

  //   const button = getByText("Salvar");
  
    // expect(button.props.onPress).toBeTruthy(); //ta dando ruim
  // });
});
