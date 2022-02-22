import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';

import { ActivityIndicator } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from 'styled-components';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { AwaitTransaction } from '../../components/AwaitTransaction';


import {
  Container,
  Header,
  UserContainer,
  UserInfo,
  Avatar,
  User,
  UserGreeting,
  UserName,
  ButtonSignIn,
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
  lastTransaction: string | number;
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
  const [greetings, setGreetings] = useState('');

  const { signOut, user } = useAuth();
  const theme = useTheme();

  const collectionKey = `@gofinances:transactions_user:${user.id}`;


  function getHours() {
    const hours = new Date().getHours();

    let greeting = ''

    if(hours >= 12 && hours < 18) {
      greeting = 'Boa tarde,';
    } else if(hours >= 18 && hours < 24) {
      greeting = 'Boa noite,';
    } else {
      greeting = 'Bom dia,';
    }

    setGreetings(greeting)
  };

  function getLastTransactionDate(collectionTransations: DataListProps[], type: 'positive' | 'negative') {
    const collectionTransationsFiltered = collectionTransations.filter(transaction => transaction.type === type)

    if(collectionTransationsFiltered.length === 0) return 0

    const lastTransaction = new Date
    (Math.max.apply(Math, collectionTransationsFiltered
      .map(transaction => new Date(transaction.date).getTime())
    ))

    return Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long'
    }).format(lastTransaction);

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
  };

  useEffect(() => {
    loadTransactions();
    getHours();
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
                <Avatar source={{ uri: user.photo }} />
                <User>
                  <UserGreeting>{greetings}</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <ButtonSignIn onPress={signOut}>
                <SignIn name="power" />
              </ButtonSignIn>
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
                highlightData.total.lastTransaction ? '01 à ' + highlightData.expensive.lastTransaction + '.' : 'Não existe transações cadastradas'
              }
              type='total'
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            { transaction?.length
              ?
              <TransactionsList
              data={transaction}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
              />
              :
              <AwaitTransaction />
            }

          </Transactions>
        </>
      }
    </Container>
  );
}