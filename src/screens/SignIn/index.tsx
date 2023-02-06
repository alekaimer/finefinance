import React from "react";
import {
  Container,
  Title,
  TitleWrapper,
  SignInTitle,
  Header,
  Footer,
  FooterWrapper,
} from "./styles";

import AppleSvg from "../../assets/apple-icon.svg";
import GoogleSvg from "../../assets/google-icon.svg";
import LogoSvg from "../../assets/logo.svg";

import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";

export function SignIn() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>

          <SignInTitle>
            Faça seu login com {"\n"}
            uma das contas abaixo
          </SignInTitle>
        </TitleWrapper>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={() => {}}
          />

          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={() => {}}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
