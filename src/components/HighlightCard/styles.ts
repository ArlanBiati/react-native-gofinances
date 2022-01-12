import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ type, theme }) => type === 'total' ? theme.colors.secondary : theme.colors.shape};

  width: ${RFValue(300)}px;

  border-radius: 30px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;

  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)<TypeProps>`
  ${({ type }) => type === 'up' && css`
    color: ${({ theme }) => theme.colors.success};
  `};

  ${({ type }) => type === 'down' && css`
    color: ${({ theme }) => theme.colors.attention};
  `};

  ${({ type }) => type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
  `};

  font-size: ${RFValue(40)}px;
`;

export const Footer = styled.View``;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  margin-top: 38px;
`;

export const LastTransaction = styled.Text`
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;
