import React from 'react';
import { render } from '@testing-library/react-native';

import { Register } from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/themes/theme';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('expo-apple-authentication', () => {});

const Providers: React.FC = ({ children }) => (
  <NavigationContainer>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </NavigationContainer>
);

describe('Register screen', () => {

  it('should be open category modal when user click on button', () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers
      }
    );

    const categoryModal = getByTestId('modal-category');
    expect(categoryModal.props.visible).toBeFalsy();

  });
});