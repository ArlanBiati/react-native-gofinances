import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserContainer,
  UserInfo,
  Avatar,
  User,
  UserGreeting,
  UserName,
  SignIn,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList
} from './styles';

export function Dashboard(){
  const data = [
    {
      type: 'positive',
      title: 'Desenvolvimento App',
      amount: 'R$ 10.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '12/01/2022'
    },
    {
      type: 'positive',
      title: 'Desenvolvimento App',
      amount: 'R$ 10.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '12/01/2022'
    },
    {
      type: 'negative',
      title: 'Hamburgueria',
      amount: 'R$ 50,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '12/01/2022'
    },
    {
      type: 'negative',
      title: 'Supermercado',
      amount: 'R$ 100,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '12/01/2022'
    }
  ]
  return (
    <Container>

      <Header>
        <UserContainer>
          <UserInfo>
            <Avatar source={{ uri: 'https://avatars.githubusercontent.com/u/43690080?v=4' }} />
            <User>
              <UserGreeting>Olá</UserGreeting>
              <UserName>Arlan Biati</UserName>
            </User>
          </UserInfo>
          <SignIn name="power" />
        </UserContainer>
      </Header>

      <HighlightCards>
        <HighlightCard
          title='Entradas'
          amount='R$ 17.000,00'
          lastTransaction='Última entrada dia 13 de abril.'
          type='up'
        />

        <HighlightCard
          title='Saídas'
          amount='R$ 7.000,00'
          lastTransaction='Última saída dia 13 de abril.'
          type='down'
        />

        <HighlightCard
          title='Total'
          amount='R$ 10.000,00'
          lastTransaction='01 à 16 de abril.'
          type='total'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>

    </Container>
  );
}