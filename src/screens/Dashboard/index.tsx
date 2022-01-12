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
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighlightCards>

    </Container>
  );
}