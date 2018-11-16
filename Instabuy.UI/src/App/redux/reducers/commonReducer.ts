import { ICommonState } from '../../index';
import { AnyAction } from 'redux';

export const initialCommonState: ICommonState = {
  ebayItemConditions: [
    {
      id: 1000,
      name: 'New'
    },
    {
      id: 2000,
      name: 'Manufacturer Refurbished'
    },
    {
      id: 2500,
      name: 'Seller Refurbished'
    },
    {
      id: 3000,
      name: 'Used'
    },
    {
      id: 4000,
      name: 'Very Good'
    },
    {
      id: 5000,
      name: 'Good'
    },
    {
      id: 6000,
      name: 'Acceptable'
    },
    {
      id: 7000,
      name: 'For parts or not working'
    }
  ]
}

const reducer = (state: ICommonState = initialCommonState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;