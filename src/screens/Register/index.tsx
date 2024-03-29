import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/auth';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';

import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles';

interface FormData {
  [name: string]: any;
}

const schema = Yup.object().shape({
  name: Yup.string().required('O Nome é obrigatório.'),
  amount: Yup.number().typeError('O Valor é obrigatório').required('O Valor é obrigatório.').positive('O valor não pode ser negativo.'),
});

export function Register(){
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const { user } = useAuth();

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const navigation = useNavigation();

  function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
  if(!transactionType)
    return Alert.alert('Selecione o tipo da transação.');

  if(category.key === 'category')
    return Alert.alert('Selecione a categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const collectionKey = `@gofinances:transactions_user:${user.id}`

      const data = await AsyncStorage.getItem(collectionKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [
        newTransaction,
        ...currentData
      ]
      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      navigation.navigate('Listagem' as never);

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi enviar sua transação.');
    }
  }

  // useEffect(() => {
  //   // async function loadData() {
  //   //   const data = await AsyncStorage.getItem(collectionKey);
  //   //   console.log(JSON.parse(data!))
  //   // }

  //   // loadData();

  //   async function removeAll() {
  //     await AsyncStorage.removeItem(collectionKey);
  //   }
  //   removeAll();
  // }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='name'
              placeholder='Nome'
              control={control}
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name='amount'
              placeholder='Preço'
              control={control}
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />
            <TransactionsTypes>
              <TransactionTypeButton
                title='Entrada'
                type='up'
                onPress={() => handleTransactionsTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                title='Saida'
                type='down'
                onPress={() => handleTransactionsTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionsTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
              testID='button-category'
            />
          </Fields>
          <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal testID='modal-category' visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}