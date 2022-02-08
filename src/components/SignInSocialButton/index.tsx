import React from 'react';
import { SvgProps } from 'react-native-svg';

import {
  Container,
  ImageContainer,
  Title
} from './styles';

interface SignInSocialButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({ title, svg: Svg, ...rest }: SignInSocialButtonProps){
  return (
    <Container {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Title>{title}</Title>
    </Container>
  );
}