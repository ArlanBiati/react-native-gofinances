import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Category,
  Icon
} from './styles';

interface CategoryProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress, testID }: CategoryProps){
  return (
    <Container onPress={onPress} testID={testID}>
      <Category>{title}</Category>
      <Icon name='chevron-down' />
    </Container>
  );
}