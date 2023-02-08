import React, { useContext, useState } from "react";
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
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator, Alert } from "react-native";
import { useTheme } from "styled-components/native";

export function SignIn() {
  const theme = useTheme();
  const { signInWithGoogle, signInWithApple } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      Alert.alert(
        "Não fo ipossivel fazer login com a conta Google.",
        "Tente novamente em alguns instantes."
      );
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      await signInWithApple();
    } catch (error: any) {
      Alert.alert(
        "Não foi possivel fazer login com a conta Apple.",
        "Tente novamente em alguns instantes."
      );
      setIsLoading(false);
    }
  }

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
            onPress={handleSignInWithGoogle}
          />

          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          />
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{
              marginTop: 20,
            }}
            size="large"
          />
        )}
      </Footer>
    </Container>
  );
}
