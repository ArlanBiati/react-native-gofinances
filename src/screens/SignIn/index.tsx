import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignTitle,
  Footer,
  FooterWrapper,
} from './styles';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { signInWithGoogle, signInWithApple } = useAuth();

  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta Google');
    }
    setIsLoading(false);
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta Apple');
    }
    setIsLoading(false);
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(70)} />

          <Title>
            Controle suas{'\n'}
            finanças de forma{'\n'}
            muito simples!
          </Title>
        </TitleWrapper>

        <SignTitle>
          Faça o seu login com{'\n'}
          uma das contas abaixo
        </SignTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          {Platform.OS === 'ios' ? (
            <>
              <SignInSocialButton
                onPress={handleSignInWithGoogle}
                title="Entrar com Google"
                svg={GoogleSvg}
              />
              <SignInSocialButton
                onPress={handleSignInWithApple}
                title="Entrar com Apple"
                svg={AppleSvg}
              />
            </>
          ) : (
            <SignInSocialButton
              onPress={handleSignInWithGoogle}
              title="Entrar com Google"
              svg={GoogleSvg}
            />
          )}
        </FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.primary}
            style={{ marginTop: 18 }}
            size="small"
          />
        )}
      </Footer>
    </Container>
  );
}
