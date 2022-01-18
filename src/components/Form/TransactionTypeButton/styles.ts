import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  type: 'up' | 'down';
  isActive: boolean;
}

export const Container = styled.TouchableOpacity<Props>`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 48%;

  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-width: ${({ isActive }) => isActive ? 0 : 1}px;
  border-radius: 5px;

  padding: 16px;

  ${({ isActive, type }) => isActive && type === 'up' && css`
    background-color: ${({ theme }) => theme.colors.secondary_light};
  `};

  ${({ isActive, type }) => isActive && type === 'down' && css`
    background-color: ${({ theme }) => theme.colors.attention_light};
  `};
`;

export const Icon = styled(Feather)<Props>`
  font-size: ${RFValue(24)}px;

  margin-right: 12px;

  color: ${({ theme, type }) => type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
