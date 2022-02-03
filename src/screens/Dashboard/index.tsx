import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from 'styled-components';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';


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
  TransactionsList,
  LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string | undefined;
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps
}

export function Dashboard(){
  const [isLoading, setIsLoading] = useState(true);
  const [transaction, setTransaction] = useState<DataListProps[]>();
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();
  const collectionKey = '@gofinances:transactions';

  function getLastTransactionDate(collectionTransations: DataListProps[], type: 'positive' | 'negative') {
    if(collectionTransations.length) {
      const lastTransaction = new Date (
        Math.max.apply(Math, collectionTransations
          .filter(transaction => transaction.type === type)
          .map(transaction => new Date(transaction.date).getTime())
        )
      )

      return Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long'
      }).format(lastTransaction);
    }
  };

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(collectionKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionFormatted: DataListProps[] = transactions.map((transaction: DataListProps) => {

      if(transaction.type === 'positive') {
        entriesTotal += Number(transaction.amount)
      } else {
        expensiveTotal += Number(transaction.amount)
      };

      const amount = Number(transaction.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(transaction.date));

      return {
        id: transaction.id,
        name: transaction.name,
        amount,
        type: transaction.type,
        category: transaction.category,
        date
      }
    });

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');

    const total = entriesTotal - expensiveTotal;
    const highlightAmountFormatted = {
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpensives
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries
      }
    };

    setTransaction(transactionFormatted);
    setHighlightData(highlightAmountFormatted);
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {
      isLoading
        ?
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size='large' />
        </LoadContainer>
        :
        <>
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
              amount={highlightData.entries.amount}
              lastTransaction={
                highlightData.entries.lastTransaction ? 'Última entrada dia ' + highlightData.entries.lastTransaction + '.' : 'Não existe entrada nos últimos 7 dias'
              }
              type='up'
            />

            <HighlightCard
              title='Saídas'
              amount={highlightData.expensive.amount}
              lastTransaction={
                highlightData.expensive.lastTransaction ? 'Última saída dia ' + highlightData.expensive.lastTransaction + '.' : 'Não existe saída nos ultimos 7 dias'
              }
              type='down'
            />

            <HighlightCard
              title='Total'
              amount={highlightData.total.amount}
              lastTransaction={
                highlightData.total.lastTransaction ? '01 à ' + highlightData.expensive.lastTransaction + '.' : ''
              }
              type='total'
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transaction}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      }
    </Container>
  );
}