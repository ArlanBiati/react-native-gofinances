import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Box,
  Icon,
  Title,
  Button,
  ButtonTitle,
  ButtonIcon
} from './styles';

export function AwaitTransaction(){

  const navigation = useNavigation();

  return (
    <Container>
      <Box>
        <Icon name='bar-chart-2' />
        <Title>Você não possui nenhuma transação cadastrada!</Title>
      </Box>
      <Button onPress={() => navigation.navigate('Cadastrar' as never)}>
        <ButtonTitle>Cadastrar nova transação</ButtonTitle>
        <ButtonIcon name='chevron-right' />
      </Button>
    </Container>
  );
}