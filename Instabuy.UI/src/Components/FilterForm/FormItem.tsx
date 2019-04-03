import * as React from 'react';

interface IProps {
  state: any;
  stateKey: string;
}

class FormItem extends React.PureComponent<IProps> {
  public render() {
    return this.props.children;
  }
};

export default FormItem;