import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.View`
  align-items: center;

  margin-bottom: 50px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};

  font-size: ${RFValue(80)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.secondary};

  padding: ${RFValue(20)}px;
  width: 100%;

  border-radius: 20px;
`

export const ButtonTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)}px;
`;

export const ButtonIcon = styled(Feather)`
  font-size: ${RFValue(20)}px;

`;

