import React from 'react';
import { render } from '@testing-library/react-native';
// eslint-disable-next-line import/no-namespace
import * as reactRedux from 'react-redux';
import TokenDetailsList from './';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const mockTokenDetails = {
  contractAddress: '0x935e73edb9ff52e23bac7f7e043a1ecd06d05477',
  tokenDecimal: 18,
  tokenList: 'Metamask, Coinmarketcap',
};

describe('TokenDetails', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
    useDispatchSpy.mockImplementation(() => jest.fn());
    const { toJSON, getByText } = render(
      <TokenDetailsList tokenDetails={mockTokenDetails} />,
    );

    expect(getByText('Token details')).toBeDefined();
    expect(getByText('Contract address')).toBeDefined();
    expect(getByText('0x935E7...05477')).toBeDefined();
    expect(getByText('Token decimal')).toBeDefined();
    expect(getByText('18')).toBeDefined();
    expect(getByText('Token list')).toBeDefined();
    expect(getByText('Metamask, Coinmarketcap')).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });
});
