import * as React from 'react';
import { LoadingCircle } from '../LoadingSquare/LoadingCircle';

interface IWithLoadingProps {
  loading: boolean;
}

class WithLoading extends React.Component<IWithLoadingProps> {
  public render() {
    return this.props.loading ? <LoadingCircle /> : this.props.children
  }
}

export default WithLoading;