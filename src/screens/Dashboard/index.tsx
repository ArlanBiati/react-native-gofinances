import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';

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
  HighlightCards
} from './styles';

export function Dashboard(){
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

    </Container>
  );
}