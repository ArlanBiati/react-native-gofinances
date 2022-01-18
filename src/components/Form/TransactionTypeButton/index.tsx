import React from 'react';

import {
  Container,
  Icon,
  Title
} from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

interface TransactionTypeButtonProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
  onPress: () => void;
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps){
  return (
    <Container
      {...rest}
      isActive={isActive}
      type={type}
    >
      <Icon
        type={type}
        name={icons[type]}
      />
      <Title>{title}</Title>
    </Container>
  );
}