import React, { useContext } from 'react';
import { Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignTitle,
  Footer,
  FooterWrapper
} from './styles';

export function SignIn(){
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta Google');
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta Apple');
    }
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
          {
            Platform.OS === 'ios'
            ?
            <>
              <SignInSocialButton onPress={handleSignInWithGoogle} title='Entrar com Google' svg={GoogleSvg} />
              <SignInSocialButton onPress={handleSignInWithApple} title='Entrar com Apple' svg={AppleSvg} />
            </>
            :
            <SignInSocialButton onPress={handleSignInWithGoogle} title='Entrar com Google' svg={GoogleSvg} />
          }
        </FooterWrapper>
      </Footer>
    </Container>
  );
}