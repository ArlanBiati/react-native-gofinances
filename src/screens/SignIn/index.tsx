import React from 'react';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';

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
              <SignInSocialButton title='Entrar com Google' svg={GoogleSvg} />
              <SignInSocialButton title='Entrar com Apple' svg={AppleSvg} />
            </>
            :
            <SignInSocialButton title='Entrar com Google' svg={GoogleSvg} />
          }

        </FooterWrapper>
      </Footer>
    </Container>
  );
}