import { combineReducers } from 'redux';
import filterReducer, { initialFilterState } from './filterReducer';
import commonReducer, { initialCommonState } from './commonReducer';
import { IReduxState } from 'src/App/index';

export const initialState: IReduxState = {
  filterState: initialFilterState,
  common: initialCommonState
}

export default combineReducers<IReduxState>({
  filterState: filterReducer,
  common: commonReducer
});