import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Testing Profile', () => {
  it('should have placeholder correctly in input user name ', () => {
    const { getAllByPlaceholderText } = render(<Profile />);

    const inputName = getAllByPlaceholderText('Nome');

    expect(inputName).toBeTruthy();
  });

  it('should be load user data', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Arlan');
    expect(inputSurname.props.value).toEqual('Biati');
  });

  it('should exist title correctly', () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('Perfil');
  });
});