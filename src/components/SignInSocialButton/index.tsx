import React from "react";

import { RectButtonProps } from "react-native-gesture-handler";

import { SvgProps } from "react-native-svg";

import { Container, ImageContainer, Text } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({ title, svg: Svg, testID, ...props }: Props) {
  return (
    <Container testID={testID} {...props}>
      <ImageContainer>
        <Svg testID={testID+"__icon"} />
      </ImageContainer>

      <Text>{title}</Text>
    </Container>
  );
}
